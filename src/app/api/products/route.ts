import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';

export async function GET() {
    try {
        const collection = await getCollection('products');
        const products = await collection.find({}).sort({ created_at: -1 }).toArray();

        // Map _id to id for frontend compatibility
        const mappedProducts = products.map(p => ({
            ...p,
            id: p._id.toString(),
            _id: undefined
        }));

        return NextResponse.json(mappedProducts);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const collection = await getCollection('products');

        const newProduct = {
            ...body,
            created_at: new Date().toISOString()
        };

        const result = await collection.insertOne(newProduct);

        return NextResponse.json({
            ...newProduct,
            id: result.insertedId.toString()
        }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
