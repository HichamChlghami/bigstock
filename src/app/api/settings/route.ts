import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');

        const collection = await getCollection('app_settings');

        if (key) {
            const setting = await collection.findOne({ key });
            return NextResponse.json(setting);
        }

        const settings = await collection.find({}).toArray();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const collection = await getCollection('app_settings');

        const { key, value } = body;

        await collection.updateOne(
            { key },
            { $set: { key, value } },
            { upsert: true }
        );

        return NextResponse.json({ message: 'Setting updated successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
