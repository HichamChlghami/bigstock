'use client';

import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AdminLayout as BaseAdminLayout } from "../../components/admin/AdminLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        // Only redirect to login if we are NOT on the login page already
        if (!isLoading && !isAuthenticated && !isLoginPage) {
            router.push("/admin/login");
        }
    }, [isAuthenticated, isLoading, router, isLoginPage]);

    // If on login page, just render it without layout protection
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return <BaseAdminLayout>{children}</BaseAdminLayout>;
}
