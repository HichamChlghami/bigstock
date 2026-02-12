import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
console.log('URI:', uri.replace(/:([^:@]+)@/, ':****@')); // Log URI masking password

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    tls: true,
    tlsAllowInvalidCertificates: true,
});

async function run() {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.dir(err);
    } finally {
        await client.close();
    }
}

run();
