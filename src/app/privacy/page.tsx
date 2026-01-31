import { About, Contact, Shipping } from "../../views/StaticPages";

export default function Page({ params }: { params: { slug: string } }) {
    // This is a simple implementation, you might want to adjust based on specific routes
    return <About />;
}
// For simpler static routes:
