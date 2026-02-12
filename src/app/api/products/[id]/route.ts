import { NextResponse } from 'next/server';
import { getCollection } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

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
        const result = await collection.deleteOne(filter);

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
