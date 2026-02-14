import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'products');

        try {
            if (!existsSync(uploadDir)) {
                await mkdir(uploadDir, { recursive: true });
                console.log('Created upload directory:', uploadDir);
            }
        } catch (dirError) {
            console.error('Directory Creation Error:', dirError);
            return NextResponse.json({ error: 'Failed to create storage directory' }, { status: 500 });
        }

        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${uniqueSuffix}-${safeName}`;
        const path = join(uploadDir, filename);

        try {
            await writeFile(path, buffer);
            console.log('File written successfully to:', path);
        } catch (writeError) {
            console.error('File Write Error:', writeError);
            return NextResponse.json({ error: 'Failed to write file to disk' }, { status: 500 });
        }

        // Return the public URL
        const publicUrl = `/uploads/products/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            name: filename
        });
    } catch (error) {
        console.error('Global Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
