import { NextResponse } from 'next/server';
import { getCollection } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { join } from 'path';
import { existsSync } from 'fs';
import { unlink } from 'fs/promises';

// Build a query filter that works with both ObjectId and string-based IDs
function buildIdFilter(id: string) {
    if (ObjectId.isValid(id) && new ObjectId(id).toString() === id) {
        // Valid 24-char hex ObjectId — try both _id and legacy string id field
        return { $or: [{ _id: new ObjectId(id) }, { id: id }] };
    }
    // Non-ObjectId string (e.g. Supabase UUID) — match on the string id field
    return { id: id };
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const body = await request.json();
        const collection = await getCollection('products');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, _id, ...updateData } = body;

        const filter = buildIdFilter(id);
        const result = await collection.updateOne(filter, { $set: updateData });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const collection = await getCollection('products');
        const filter = buildIdFilter(id);

        // 1. Fetch product to get image paths before deletion
        const product = await collection.findOne(filter);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // 2. Delete image files from disk
        const deleteImage = async (imagePath: string) => {
            if (!imagePath || imagePath.startsWith('http')) return;

            try {
                // Ensure it's a relative path to public folder
                const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const absolutePath = join(process.cwd(), 'public', relativePath);

                if (existsSync(absolutePath)) {
                    await unlink(absolutePath);
                    console.log(`Deleted image file: ${absolutePath}`);
                }
            } catch (err) {
                console.error(`Error deleting image ${imagePath}:`, err);
            }
        };

        // Delete main image
        if (product.image) await deleteImage(product.image);

        // Delete gallery images
        if (Array.isArray(product.images)) {
            for (const img of product.images) {
                if (img) await deleteImage(img);
            }
        }

        // 3. Delete from database
        const result = await collection.deleteOne(filter);

        if (result.deletedCount === 0) {
            // This case should ideally not be reached if product was found earlier,
            // but good for robustness.
            return NextResponse.json({ error: 'Product not found after image deletion attempt' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product and associated images deleted successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
