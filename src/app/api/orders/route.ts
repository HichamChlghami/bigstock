import { NextResponse } from 'next/server';
import { getCollection } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const collection = await getCollection('orders');
        const orders = await collection.find({}).sort({ date: -1 }).toArray();

        const mappedOrders = orders.map(o => ({
            ...o,
            id: o._id.toString(),
            _id: undefined
        }));

        return NextResponse.json(mappedOrders);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const collection = await getCollection('orders');

        const newOrder = {
            ...body,
            date: body.date || new Date().toISOString()
        };

        const result = await collection.insertOne(newOrder);

        return NextResponse.json({
            ...newOrder,
            id: result.insertedId.toString()
        }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const body = await request.json();
        const collection = await getCollection('orders');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _, _id, ...updateData } = body;

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order updated successfully' });
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
        const collection = await getCollection('orders');

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
