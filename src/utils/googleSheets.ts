/**
 * Utility to submit data to Google Sheets via Google Apps Script Web Apps
 * Since the user's script uses e.parameter, we'll send data as URL-encoded form data.
 */
export const submitToGoogleSheets = async (type: 'contact' | 'order', payload: any) => {
    const contactUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_CONTACT_URL;
    const orderUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_ORDER_URL;

    const url = type === 'contact' ? contactUrl : orderUrl;

    if (!url) {
        console.warn(`Google Script URL for ${type} not found. Data not sent.`);
        return { status: 'skipped' };
    }

    try {
        // Create query string for parameters as the user's script uses e.parameter
        const params = new URLSearchParams();
        Object.keys(payload).forEach(key => {
            params.append(key, payload[key]);
        });

        // We use a GET-like approach via POST body with proper content type
        // or we can just append to the URL if the script is simple.
        // However, POST with URLSearchParams body works well for e.parameter in GAS.
        const response = await fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        return { status: 'success' };
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        return { status: 'error', error };
    }
};
