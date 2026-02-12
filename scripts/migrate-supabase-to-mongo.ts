import { MongoClient } from 'mongodb';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = process.env.MONGODB_URI;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!MONGODB_URI || !SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing environment variables. Please check .env file.');
    process.exit(1);
}

const client = new MongoClient(MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
});
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'products');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

async function downloadImage(url: string, filename: string): Promise<string | null> {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });

        const filePath = path.join(UPLOADS_DIR, filename);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(`/uploads/products/${filename}`));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Failed to download image: ${url}`, error);
        return null;
    }
}

async function migrate() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('products');

        // Fetch products from Supabase
        console.log('Fetching products from Supabase...');
        const { data: products } = await axios.get(`${SUPABASE_URL}/rest/v1/products?select=*`, {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
            },
        });

        console.log(`Found ${products.length} products. Starting migration...`);

        for (const product of products) {
            console.log(`Processing product: ${product.name}`);

            // Handle main image
            if (product.image) {
                const filename = `${product.id}-main.jpg`; // Assuming jpg or logic to detect extension
                const localPath = await downloadImage(product.image, filename);
                if (localPath) {
                    product.image = localPath;
                }
            }

            // Handle gallery images
            if (product.images && Array.isArray(product.images)) {
                const newImages = [];
                for (let i = 0; i < product.images.length; i++) {
                    const imgUrl = product.images[i];
                    const filename = `${product.id}-gallery-${i}.jpg`;
                    const localPath = await downloadImage(imgUrl, filename);
                    if (localPath) {
                        newImages.push(localPath);
                    }
                }
                product.images = newImages;
            }

            // Transform to camelCase for application compatibility
            const transformedProduct = {
                id: product.id,
                name: product.name,
                slug: product.slug,
                description: product.description, // Might be null
                shortDescription: product.short_description,
                price: product.price,
                originalPrice: product.original_price || null,
                rating: product.rating,
                reviews: product.reviews,
                inStock: product.in_stock,
                stockQuantity: product.stock_quantity,
                isFeatured: product.is_featured,
                isBestSeller: product.is_best_seller,
                categories: product.categories,
                colors: product.colors,
                sizes: product.sizes,
                image: product.image,
                images: product.images,
                createdAt: product.created_at,
                updatedAt: product.updated_at,
            };

            // Insert/Update into MongoDB
            await collection.updateOne(
                { id: product.id },
                { $set: transformedProduct },
                { upsert: true }
            );
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await client.close();
    }
}

migrate();
