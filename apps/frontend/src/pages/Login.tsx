import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError('Login fallido. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Legacy Nexus</h1>
          <p className="text-slate-600 mt-2">Sistema de Gestión Retail</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de inicio de sesión">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ingresa tu usuario"
              aria-describedby="username-hint"
            />
            <p id="username-hint" className="sr-only">
              Ingresa tu nombre de usuario para acceder al sistema
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ingresa tu contraseña"
              aria-describedby="password-hint"
            />
            <p id="password-hint" className="sr-only">
              Ingresa tu contraseña para acceder al sistema
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            aria-busy={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>Credenciales de prueba:</p>
          <p className="mt-1">admin / 1234</p>
          <p>user / 1234</p>
        </div>
      </div>
    </div>
  );
}
