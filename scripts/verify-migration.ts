import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI');
    process.exit(1);
}

const client = new MongoClient(MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
});

async function verify() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('products');

        const count = await collection.countDocuments();
        console.log(`Total products in MongoDB: ${count}`);

        const products = await collection.find({}).limit(5).toArray();

        for (const product of products) {
            console.log(`\nChecking product: ${product.name}`);
            console.log(`ID: ${product.id}`);

            if (product.image) {
                console.log(`Main Image Path: ${product.image}`);
                const localPath = path.join(process.cwd(), 'public', product.image);
                if (fs.existsSync(localPath)) {
                    console.log('✅ Main image exists locally');
                } else {
                    console.error(`❌ Main image missing: ${localPath}`);
                }
            } else {
                console.warn('⚠️ No main image found');
            }

            if (product.images && Array.isArray(product.images)) {
                console.log(`Gallery Images: ${product.images.length}`);
                for (const imgPath of product.images) {
                    const localPath = path.join(process.cwd(), 'public', imgPath);
                    if (fs.existsSync(localPath)) {
                        console.log(`✅ Gallery image exists: ${imgPath}`);
                    } else {
                        console.error(`❌ Gallery image missing: ${localPath}`);
                    }
                }
            }
        }

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await client.close();
    }
}

verify();
