import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../index.css";
import { CartProvider } from "../context/CartContext";
import { DataProvider } from "../context/DataContext";
import { AuthProvider } from "../context/AuthContext";
import { AnalyticsInit } from "../components/AnalyticsInit";
import { LayoutWrapper } from "../components/layout/LayoutWrapper";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BigStock | Premium Fashion & Lifestyle",
    description: "Arrivage Récent - Nouvelle Collection 2026. Découvrez le futur de la mode.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
                <DataProvider>
                    <AnalyticsInit />
                    <CartProvider>
                        <AuthProvider>
                            <LayoutWrapper>
                                {children}
                            </LayoutWrapper>
                        </AuthProvider>
                    </CartProvider>
                </DataProvider>
            </body>
        </html>
    );
}
