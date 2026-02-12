import { MongoClient } from 'mongodb';
import axios from 'axios';
import { writeFile, mkdir, readdir } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const mongodbUri = process.env.MONGODB_URI;
const BASE_PATH = 'c:\\Users\\chlgh\\OneDrive\\Desktop\\bigstock';
const UPLOAD_DIR = join(BASE_PATH, 'public', 'uploads', 'products');

// CORRECT URL from .env
const SUPABASE_STORAGE_BASE = 'https://lwwnfgesoapibbwanpcw.supabase.co/storage/v1/object/public/products/';

if (!mongodbUri) {
    console.error('Missing MONGODB_URI!');
    process.exit(1);
}

const mongoClient = new MongoClient(mongodbUri);

async function downloadAndSave(originalFileName: string, targetPath: string): Promise<string | null> {
    try {
        const pureFileName = basename(originalFileName);
        // Skip if it's already a local path and we just want to re-download to be sure
        // But the user says the folder is empty, so we must download everything.

        const sourceUrl = `${SUPABASE_STORAGE_BASE}${pureFileName}`;

        console.log(`Downloading: ${sourceUrl}`);
        const response = await axios({
            method: 'GET',
            url: sourceUrl,
            responseType: 'arraybuffer',
            timeout: 20000
        });

        const uniqueName = `${Date.now()}-${pureFileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const finalPath = join(targetPath, uniqueName);

        await writeFile(finalPath, response.data);

        if (existsSync(finalPath)) {
            console.log(`[PASS] Saved: ${uniqueName}`);
            return `/uploads/products/${uniqueName}`;
        }
        return null;
    } catch (error: any) {
        console.warn(`[FAIL] ${originalFileName}: ${error.message}`);
        return null;
    }
}

async function run() {
    try {
        if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true });

        await mongoClient.connect();
        const db = mongoClient.db();
        const products = await db.collection('products').find({}).toArray();
        console.log(`Processing ${products.length} products...`);

        for (const product of products) {
            let updated = false;
            let newMainImage = product.image;
            let newImages = product.images || [];

            if (product.image) {
                const local = await downloadAndSave(product.image, UPLOAD_DIR);
                if (local) {
                    newMainImage = local;
                    updated = true;
                }
            }

            if (Array.isArray(product.images)) {
                const updatedGallery = [];
                for (const img of product.images) {
                    if (img) {
                        const local = await downloadAndSave(img, UPLOAD_DIR);
                        updatedGallery.push(local || img);
                        if (local) updated = true;
                    } else {
                        updatedGallery.push(img);
                    }
                }
                newImages = updatedGallery;
            }

            if (updated) {
                await db.collection('products').updateOne(
                    { _id: product._id },
                    { $set: { image: newMainImage, images: newImages } }
                );
                console.log(`Updated DB for: ${product.name}`);
            }
        }

        const files = await readdir(UPLOAD_DIR);
        console.log(`Success! Total files in ${UPLOAD_DIR}: ${files.length}`);

    } catch (err) {
        console.error('Fatal:', err);
    } finally {
        await mongoClient.close();
    }
}

run();
