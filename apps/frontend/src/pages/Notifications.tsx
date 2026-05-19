import { useState, useEffect } from 'react';
import { notificationsApi, Notification } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Bell, RefreshCw, Trash2, Check } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Broadcast form state
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastKind, setBroadcastKind] = useState('info');
  const [broadcastOutput, setBroadcastOutput] = useState('');
  
  // Create notification form state
  const [createMsg, setCreateMsg] = useState('');
  const [createKind, setCreateKind] = useState('info');
  const [createOutput, setCreateOutput] = useState('');

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    if (!user || !user.user_id) return;
    try {
      setIsLoading(true);
      const data = await notificationsApi.getByUser(user.user_id);
      setNotifications(data);
      setUnreadCount(data.filter(n => n.status.toLowerCase() === 'unread').length);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await notificationsApi.markAsRead(id);
      await loadNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await notificationsApi.delete(id);
      await loadNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleBroadcast = async () => {
    if (!broadcastMsg.trim()) return;
    try {
      await notificationsApi.broadcast('Notificación', broadcastMsg);
      setBroadcastOutput('✓ Notificación difundida exitosamente');
      setBroadcastMsg('');
      setTimeout(() => setBroadcastOutput(''), 3000);
    } catch (error) {
      console.error('Error broadcasting:', error);
      setBroadcastOutput('✗ Error al difundir notificación');
    }
  };

  const handleCreate = async () => {
    if (!user || !createMsg.trim()) return;
    try {
      await notificationsApi.send(user.user_id, 'Notificación', createMsg, createKind);
      setCreateOutput('✓ Notificación creada exitosamente');
      setCreateMsg('');
      await loadNotifications();
      setTimeout(() => setCreateOutput(''), 3000);
    } catch (error) {
      console.error('Error creating notification:', error);
      setCreateOutput('✗ Error al crear notificación');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'unread') {
      return <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">No leída</span>;
    }
    return <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">Leída</span>;
  };

  const getKindBadge = (kind: string) => {
    const colors: Record<string, string> = {
      info: 'bg-blue-100 text-blue-800',
      warn: 'bg-yellow-100 text-yellow-800',
      alert: 'bg-red-100 text-red-800',
      system: 'bg-purple-100 text-purple-800',
      marketing: 'bg-pink-100 text-pink-800',
    };
    const defaultColor = 'bg-gray-100 text-gray-800';
    return <span className={`px-2 py-1 text-xs font-semibold ${colors[kind] || defaultColor} rounded`}>{kind}</span>;
  };

  const formatDate = (dateStr: string) => {
    // Check if it's a timestamp (numeric string)
    if (/^\d+$/.test(dateStr)) {
      const timestamp = parseInt(dateStr, 10);
      const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
      return date.toLocaleDateString('es-ES');
    }
    // Try to parse as ISO date or regular date string
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return dateStr; // Return as-is if parsing fails
    }
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Notificaciones</h1>
          <p className="mt-2 text-slate-600">No leídas: <span className="font-bold text-blue-600">{unreadCount}</span></p>
        </div>
        <button
          onClick={loadNotifications}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Recargar
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
          <Bell className="w-12 h-12 text-slate-400 mx-auto animate-pulse" aria-hidden="true" />
          <p className="mt-4 text-slate-600">Cargando notificaciones...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Mensaje</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {notifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No hay notificaciones
                    </td>
                  </tr>
                ) : (
                  notifications.map((notification) => (
                    <tr key={notification.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-800">{notification.id}</td>
                      <td className="px-6 py-4">{getKindBadge(notification.kind)}</td>
                      <td className="px-6 py-4 text-sm text-slate-800">{notification.message}</td>
                      <td className="px-6 py-4">{getStatusBadge(notification.status)}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(notification.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {notification.status.toLowerCase() === 'unread' && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              title="Marcar como leída"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {user?.is_admin && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Difusión masiva (admin)</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  placeholder="Mensaje"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={broadcastKind}
                  onChange={(e) => setBroadcastKind(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="info">info</option>
                  <option value="warn">warn</option>
                  <option value="alert">alert</option>
                  <option value="system">system</option>
                  <option value="marketing">marketing</option>
                </select>
                <button
                  onClick={handleBroadcast}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Difundir
                </button>
              </div>
              {broadcastOutput && (
                <p className="mt-2 text-sm text-slate-600">{broadcastOutput}</p>
              )}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Crear notificación (a mí)</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={createMsg}
                onChange={(e) => setCreateMsg(e.target.value)}
                placeholder="Mensaje"
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={createKind}
                onChange={(e) => setCreateKind(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="info">info</option>
                <option value="warn">warn</option>
                <option value="alert">alert</option>
              </select>
              <button
                onClick={handleCreate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crear
              </button>
            </div>
            {createOutput && (
              <p className="mt-2 text-sm text-slate-600">{createOutput}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
