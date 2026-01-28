import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { OrderStatus } from '../../types';
import { Eye, Trash2, ChevronDown, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Orders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, refreshData, isLoading } = useData();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const statusColors: Record<OrderStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Confirmed: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-indigo-100 text-indigo-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Gestion des Commandes</h1>
        <Button 
          variant="outline" 
          onClick={() => refreshData()} 
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
          Rafraîchir
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">ID Commande</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">#{order.id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-sm text-primary">{order.customer?.name || 'Client Inconnu'}</p>
                      <p className="text-xs text-gray-500">{order.customer?.phone || '-'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-accent">{order.total.toFixed(2)} MAD</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer font-medium outline-none ${statusColors[order.status]}`}
                      >
                        {Object.keys(statusColors).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded"
                        >
                          {expandedOrder === order.id ? <ChevronDown size={16} /> : <Eye size={16} />}
                        </button>
                        <button 
                          onClick={() => { if(window.confirm('Supprimer la commande ?')) deleteOrder(order.id) }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedOrder === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-bold text-sm text-primary mb-3">Détails de Livraison</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><span className="font-medium">Adresse:</span> {order.customer?.address || 'Non fournie'}</p>
                              <p><span className="font-medium">Ville:</span> {order.customer?.city || ''}</p>
                              <p><span className="font-medium">Tél:</span> {order.customer?.phone || ''}</p>
                              {order.customer?.notes && <p className="mt-2 italic">Note: "{order.customer.notes}"</p>}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-primary mb-3">Articles</h4>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm border-b border-gray-200 pb-2 last:border-0">
                                  <div>
                                    <span className="font-medium">{item.quantity}x {item.name}</span>
                                    <div className="text-gray-400 text-xs">
                                      {item.selectedSize && `Taille: ${item.selectedSize}`} 
                                      {item.selectedColor && `, Couleur: ${item.selectedColor}`}
                                    </div>
                                  </div>
                                  <span className="font-medium">{(item.price * item.quantity).toFixed(2)} MAD</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-lg font-medium mb-2">Aucune commande trouvée</p>
                      <p className="text-sm">Les nouvelles commandes apparaîtront ici.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
