import React from 'react';
import { useData } from '../../context/DataContext';
import { ShoppingBag, DollarSign, Package } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { orders, products } = useData();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const stats = [
    { label: 'Revenu Total', value: `${totalRevenue.toFixed(2)} MAD`, icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Total Commandes', value: totalOrders, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Produits', value: totalProducts, icon: Package, color: 'bg-purple-100 text-purple-600' },
    // Clients stat removed
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Vue d'ensemble</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-primary mb-4">Commandes Récentes</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune commande pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-primary">{order.customer.name}</p>
                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{order.total.toFixed(2)} MAD</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-primary mb-4">Alerte Stock Faible</h2>
          {products.filter(p => p.stockQuantity < 10).length === 0 ? (
            <p className="text-gray-500 text-sm">Tous les produits sont bien stockés.</p>
          ) : (
            <div className="space-y-4">
              {products.filter(p => p.stockQuantity < 10).slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center gap-4">
                  <img src={product.image} alt="" className="w-10 h-10 rounded object-contain bg-gray-100 border border-gray-200" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-primary truncate">{product.name}</p>
                    <p className="text-xs text-red-500 font-medium">Plus que {product.stockQuantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
