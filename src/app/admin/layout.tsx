'use client';

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminLayout as BaseAdminLayout } from "../../components/admin/AdminLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading = false } = useAuth() as any;
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/admin/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    return <BaseAdminLayout>{children}</BaseAdminLayout>;
}
