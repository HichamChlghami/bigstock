import React from 'react';
import { useData } from '../../context/DataContext';

export const Customers: React.FC = () => {
  const { orders } = useData();

  const customersMap = new Map();

  orders.forEach(order => {
    // Ensure we have a customer object (mapped in DataContext)
    if (!order.customer) return;

    // Use phone as key, or fallback to name + random string if phone missing (unlikely but safe)
    const phone = order.customer.phone || `no-phone-${order.customer.name}-${order.id}`;
    
    if (!customersMap.has(phone)) {
      customersMap.set(phone, {
        name: order.customer.name || 'Client Inconnu',
        phone: order.customer.phone || 'Non fourni',
        city: order.customer.city || '-',
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: order.date
      });
    }
    
    const customer = customersMap.get(phone);
    customer.totalOrders += 1;
    customer.totalSpent += order.total;
    
    // Keep latest date
    if (new Date(order.date) > new Date(customer.lastOrder)) {
      customer.lastOrder = order.date;
    }
    
    // Update info if newer order has better info
    if (order.customer.city && customer.city === '-') {
        customer.city = order.customer.city;
    }
  });

  const customers = Array.from(customersMap.values());

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-8">Clients</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Ville</th>
                <th className="px-6 py-4">Commandes</th>
                <th className="px-6 py-4">Total Dépensé</th>
                <th className="px-6 py-4">Dernière Activité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-primary">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.totalOrders}</td>
                  <td className="px-6 py-4 font-bold text-sm text-accent">{customer.totalSpent.toFixed(2)} MAD</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(customer.lastOrder).toLocaleDateString()}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Aucun client trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
