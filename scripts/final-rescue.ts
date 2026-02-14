import { MongoClient } from 'mongodb';
import axios from 'axios';
import { writeFile, mkdir, readdir } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync, writeFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI;
// Use the exact path provided in user_information
// Use dynamic path instead of hardcoded local path for portability
const BASE_PATH = process.cwd();
const UPLOAD_DIR = join(BASE_PATH, 'public', 'uploads', 'products');

if (!mongodbUri) {
    console.error('Missing MONGODB_URI environment variable!');
    process.exit(1);
}

const mongoClient = new MongoClient(mongodbUri);

async function downloadImage(url: string, targetPath: string): Promise<string | null> {
    try {
        if (!url || typeof url !== 'string' || !url.startsWith('http')) return url;

        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer',
            timeout: 20000
        });

        const urlObj = new URL(url);
        const fileName = basename(urlObj.pathname);
        const uniqueName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const finalPath = join(targetPath, uniqueName);

        await writeFile(finalPath, response.data);

        // Verify immediately
        if (existsSync(finalPath)) {
            console.log(`[PASS] Downloaded & Verified: ${uniqueName}`);
            return `/uploads/products/${uniqueName}`;
        } else {
            console.error(`[FAIL] File missing after write: ${finalPath}`);
            return url;
        }
    } catch (error: any) {
        console.warn(`[ERROR] Failed: ${url} -> ${error.message}`);
        return url;
    }
}

async function run() {
    try {
        console.log(`Starting rescue in: ${UPLOAD_DIR}`);
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
            console.log(`Created directory: ${UPLOAD_DIR}`);
        }

        // Test write
        const testFile = join(UPLOAD_DIR, 'test_write.txt');
        await writeFile(testFile, 'Disk check ' + new Date().toISOString());
        console.log(`Test write status: ${existsSync(testFile) ? 'SUCCESS' : 'FAILURE'}`);

        await mongoClient.connect();
        const db = mongoClient.db();
        const products = await db.collection('products').find({}).toArray();
        console.log(`Found ${products.length} products to check.`);

        for (const product of products) {
            let updated = false;
            let newMainImage = product.image;
            let newImages = product.images || [];

            if (product.image && product.image.startsWith('http')) {
                const local = await downloadImage(product.image, UPLOAD_DIR);
                if (local !== product.image) {
                    newMainImage = local;
                    updated = true;
                }
            }

            if (Array.isArray(product.images)) {
                newImages = await Promise.all(product.images.map(img =>
                    (img && img.startsWith('http')) ? downloadImage(img, UPLOAD_DIR) : img
                ));
                if (JSON.stringify(newImages) !== JSON.stringify(product.images)) updated = true;
            }

            if (updated) {
                await db.collection('products').updateOne(
                    { _id: product._id },
                    { $set: { image: newMainImage, images: newImages } }
                );
            }
        }

        const finalFiles = await readdir(UPLOAD_DIR);
        console.log(`Final count in ${UPLOAD_DIR}: ${finalFiles.length} files.`);

    } catch (err) {
        console.error('Fatal error:', err);
    } finally {
        await mongoClient.close();
    }
}

run();
