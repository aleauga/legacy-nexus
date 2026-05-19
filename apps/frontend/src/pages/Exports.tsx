import { useState } from 'react';
import { exportsApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Download, FileSpreadsheet } from 'lucide-react';

interface PivotRow {
  dim_a: string | number;
  dim_b: string | number;
  n_sales: number;
  gross: number;
  effective: number;
  after_volume: number;
}

interface PivotResult {
  data: PivotRow[];
  summary: {
    total_gross: number;
    filas: number;
  };
}

interface TotalsResult {
  year: number;
  customer_type: string;
  total_sales: number;
  total_amount: number;
}

export default function Exports() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Pivot state
  const [pivotYear, setPivotYear] = useState(2025);
  const [pivotDimA, setPivotDimA] = useState('customer_type');
  const [pivotDimB, setPivotDimB] = useState('category');
  const [pivotData, setPivotData] = useState<PivotRow[]>([]);
  const [pivotSummary, setPivotSummary] = useState<{ total_gross: number; filas: number } | null>(null);

  // Totals state
  const [totalsYear, setTotalsYear] = useState(2025);
  const [totalsCustomerType, setTotalsCustomerType] = useState('');
  const [totalsData, setTotalsData] = useState<TotalsResult | null>(null);

  // CSV download state
  const [csvFilter, setCsvFilter] = useState('');
  const [csvOutput, setCsvOutput] = useState('');

  const loadPivot = async () => {
    try {
      setIsLoading(true);
      console.log('Loading pivot with params:', { pivotYear, pivotDimA, pivotDimB });
      const result: PivotResult = await exportsApi.getPivot(pivotYear, pivotDimA, pivotDimB);
      console.log('Pivot result:', result);
      setPivotData(result.data);
      setPivotSummary(result.summary);
    } catch (error) {
      console.error('Error loading pivot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotals = async () => {
    try {
      setIsLoading(true);
      const result: TotalsResult = await exportsApi.getTotals(totalsYear, totalsCustomerType || undefined);
      setTotalsData(result);
    } catch (error) {
      console.error('Error calculating totals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCsv = async () => {
    try {
      setIsLoading(true);
      const csv = await exportsApi.downloadCsv(csvFilter || undefined);
      setCsvOutput(csv);
      downloadCSV(csv, 'sales.csv');
    } catch (error) {
      console.error('Error downloading CSV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (!user?.is_admin) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 text-center">
        <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
        <p className="mt-4 text-slate-600">Acceso denegado. Solo administradores pueden exportar datos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Exportes</h1>
        <p className="mt-2 text-slate-600">Exporta datos del sistema en formato CSV</p>
      </div>

      {/* Pivot Table Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Exportes — Pivot</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="eYear" className="text-sm text-slate-600 mb-1">Año</label>
            <input
              id="eYear"
              type="number"
              value={pivotYear}
              onChange={(e) => setPivotYear(Number(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="eDimA" className="text-sm text-slate-600 mb-1">Dimensión A</label>
            <select
              id="eDimA"
              value={pivotDimA}
              onChange={(e) => setPivotDimA(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="customer_type">customer_type</option>
              <option value="status">status</option>
              <option value="user_id">user_id</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="eDimB" className="text-sm text-slate-600 mb-1">Dimensión B</label>
            <select
              id="eDimB"
              value={pivotDimB}
              onChange={(e) => setPivotDimB(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="category">category</option>
              <option value="supplier_id">supplier_id</option>
              <option value="warehouse_id">warehouse_id</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadPivot}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors disabled:opacity-50"
              aria-busy={isLoading}
            >
              {isLoading ? 'Generando...' : 'Generar pivot'}
            </button>
          </div>
        </div>

        {/* Debug info */}
        <div className="text-xs text-slate-500 mb-2">
          Debug: pivotData length = {pivotData?.length || 'undefined'}, isLoading = {isLoading.toString()}
        </div>

        {pivotData && pivotData.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="border border-slate-300 px-4 py-2 text-left">dim_a</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">dim_b</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">ventas</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">gross</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">effective</th>
                    <th className="border border-slate-300 px-4 py-2 text-left">after_volume</th>
                  </tr>
                </thead>
                <tbody>
                  {pivotData.map((row, index) => (
                    <tr key={index}>
                      <td className="border border-slate-300 px-4 py-2">{row.dim_a}</td>
                      <td className="border border-slate-300 px-4 py-2">{row.dim_b}</td>
                      <td className="border border-slate-300 px-4 py-2">{row.n_sales}</td>
                      <td className="border border-slate-300 px-4 py-2">{row.gross.toFixed(4)}</td>
                      <td className="border border-slate-300 px-4 py-2">{row.effective.toFixed(4)}</td>
                      <td className="border border-slate-300 px-4 py-2">{row.after_volume.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pivotSummary && (
              <div className="mt-4 text-sm text-slate-600">
                <p><strong>Total gross:</strong> {pivotSummary.total_gross.toFixed(4)} | <strong>filas:</strong> {pivotSummary.filas}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Totals Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Totales</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="tYear" className="text-sm text-slate-600 mb-1">Año</label>
            <input
              id="tYear"
              type="number"
              value={totalsYear}
              onChange={(e) => setTotalsYear(Number(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="tCt" className="text-sm text-slate-600 mb-1">customer_type (opcional)</label>
            <input
              id="tCt"
              type="text"
              placeholder="customer_type (opcional)"
              value={totalsCustomerType}
              onChange={(e) => setTotalsCustomerType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={calculateTotals}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-colors disabled:opacity-50"
              aria-busy={isLoading}
            >
              {isLoading ? 'Calculando...' : 'Calcular'}
            </button>
          </div>
        </div>

        {totalsData && (
          <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(totalsData, null, 2)}
          </pre>
        )}
      </div>

      {/* CSV Download Section (Admin Only) */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Descargar CSV (admin)</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="eFilter" className="text-sm text-slate-600 mb-1">Filtro SQL (ej: id &gt; 0)</label>
            <input
              id="eFilter"
              type="text"
              placeholder="Filtro SQL (ej: id &gt; 0)"
              value={csvFilter}
              onChange={(e) => setCsvFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={downloadCsv}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-colors disabled:opacity-50 flex items-center gap-2"
              aria-busy={isLoading}
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              {isLoading ? 'Descargando...' : 'Descargar'}
            </button>
          </div>
        </div>

        {csvOutput && (
          <pre className="bg-slate-100 p-4 rounded-lg overflow-x-auto text-sm max-h-64">
            {csvOutput.substring(0, 1000)}
            {csvOutput.length > 1000 && '...'}
          </pre>
        )}
      </div>
    </div>
  );
}
