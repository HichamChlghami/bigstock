import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const collection = await getCollection('categories');
        const categories = await collection.find({}).toArray();

        const mappedCategories = categories.map(c => ({
            ...c,
            id: c._id.toString(),
            _id: undefined
        }));

        return NextResponse.json(mappedCategories);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const collection = await getCollection('categories');

        const result = await collection.insertOne(body);

        return NextResponse.json({
            ...body,
            id: result.insertedId.toString()
        }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
