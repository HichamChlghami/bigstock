'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '../utils/analytics';

export function AnalyticsInit() {
    const pathname = usePathname();

    useEffect(() => {
        analytics.initialize();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        analytics.trackPageView(pathname);
    }, [pathname]);

    return null;
}
