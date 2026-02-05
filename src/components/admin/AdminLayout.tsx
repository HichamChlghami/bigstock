'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Tag, Settings, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin' },
    { icon: Package, label: 'Produits', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
    // Clients section removed
    { icon: Tag, label: 'Catégories', path: '/admin/categories' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="BigStock"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xs font-sans font-normal text-gray-400">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                pathname === item.path
                  ? "bg-accent text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors text-sm font-medium"
          >
            <Home size={20} />
            Aller au Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-20">
          <Link href="/">
            <img
              src="/logo.png"
              alt="BigStock"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="flex gap-4">
            <Link href="/"><Home size={20} /></Link>
            <button onClick={handleLogout}><LogOut size={20} /></button>
          </div>
        </div>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
