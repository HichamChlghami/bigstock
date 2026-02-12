import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkSchema() {
    try {
        const { data: products } = await axios.get(`${SUPABASE_URL}/rest/v1/products?select=*&limit=1`, {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
            },
        });

        if (products.length > 0) {
            console.log('Available keys:', Object.keys(products[0]));
            console.log('Sample Product:', JSON.stringify(products[0], null, 2));
        } else {
            console.log('No products found.');
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

checkSchema();
