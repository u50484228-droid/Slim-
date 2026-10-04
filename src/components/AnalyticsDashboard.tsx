import React, { useState, useEffect, useMemo } from 'react';
import {
  ClickRecord,
  getClickRecords,
  clearClickRecords,
  recordClick,
} from '../utils/analytics';
import {
  BarChart3,
  Globe,
  MapPin,
  MousePointerClick,
  Trash2,
  Download,
  X,
  RefreshCw,
  Search,
  ShieldAlert,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [records, setRecords] = useState<ClickRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'locations' | 'logs'>('overview');

  const reloadData = () => {
    setRecords(getClickRecords());
  };

  useEffect(() => {
    if (isOpen) {
      reloadData();
    }

    const handleNewClick = () => {
      reloadData();
    };

    window.addEventListener('sodaslim_new_click', handleNewClick);
    window.addEventListener('sodaslim_clicks_cleared', handleNewClick);

    return () => {
      window.removeEventListener('sodaslim_new_click', handleNewClick);
      window.removeEventListener('sodaslim_clicks_cleared', handleNewClick);
    };
  }, [isOpen]);

  // Aggregate by target
  const targetStats = useMemo(() => {
    const counts: Record<string, number> = {};
    records.forEach((r) => {
      counts[r.target] = (counts[r.target] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [records]);

  // Aggregate by Country
  const countryStats = useMemo(() => {
    const counts: Record<string, { count: number; code: string }> = {};
    records.forEach((r) => {
      const country = r.country || 'Outro';
      if (!counts[country]) {
        counts[country] = { count: 0, code: r.countryCode || 'BR' };
      }
      counts[country].count += 1;
    });
    return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
  }, [records]);

  // Aggregate by City
  const cityStats = useMemo(() => {
    const counts: Record<string, { count: number; country: string; region: string }> = {};
    records.forEach((r) => {
      const cityKey = `${r.city || 'Desconhecida'} (${r.region ? r.region + ', ' : ''}${r.country || ''})`;
      if (!counts[cityKey]) {
        counts[cityKey] = {
          count: 0,
          country: r.country || 'Brasil',
          region: r.region || '',
        };
      }
      counts[cityKey].count += 1;
    });
    return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
  }, [records]);

  // Filtered records for logs tab
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.ip.includes(searchTerm);

      const matchesCat =
        filterCategory === 'all' || r.category === filterCategory;

      return matchesSearch && matchesCat;
    });
  }, [records, searchTerm, filterCategory]);

  const handleExportCSV = () => {
    if (records.length === 0) return;
    const headers = ['ID', 'Data/Hora', 'Elemento Clicado', 'Categoria', 'Cidade', 'Estado', 'País', 'IP'];
    const rows = records.map((r) => [
      r.id,
      `"${r.formattedDate}"`,
      `"${r.target}"`,
      `"${r.category}"`,
      `"${r.city}"`,
      `"${r.region}"`,
      `"${r.country}"`,
      `"${r.ip}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sodaslim_cliques_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico de cliques?')) {
      clearClickRecords();
      setRecords([]);
    }
  };

  const handleSimulateClick = async () => {
    await recordClick('Teste Manual (Admin)', 'cta');
    reloadData();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-[#0f172a] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#1e293b]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Dashboard de Cliques & Geoverificação
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Ao Vivo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Métricas de cliques, botões clicados, países e cidades dos visitantes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={records.length === 0}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg border border-slate-700 transition"
              title="Exportar dados para Excel/CSV"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar CSV
            </button>
            <button
              onClick={handleClear}
              disabled={records.length === 0}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-red-950/40 hover:bg-red-900/60 disabled:opacity-40 text-red-300 rounded-lg border border-red-800/50 transition"
              title="Limpar registros salvos"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Fechar (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 border-b border-slate-800 bg-[#0f172a]">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'overview'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'locations'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Países & Cidades ({countryStats.length})
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'logs'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Logs Detalhados ({records.length})
            </button>
          </div>

          <button
            onClick={handleSimulateClick}
            className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 cursor-pointer hidden md:block"
          >
            + Simular Clique de Teste
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Metrics KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                <span>Total de Cliques</span>
                <MousePointerClick className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {records.length}
              </div>
              <div className="text-[11px] text-emerald-400/90 mt-1 font-medium">
                Registrados no navegador
              </div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                <span>Botão Allow (Cookies)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {records.filter((r) => r.target.includes('Allow')).length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {records.length > 0
                  ? `${Math.round(
                      (records.filter((r) => r.target.includes('Allow')).length / records.length) *
                        100
                    )}% do total`
                  : '0%'}
              </div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                <span>Botão Close (Cookies)</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {records.filter((r) => r.target.includes('Close')).length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {records.length > 0
                  ? `${Math.round(
                      (records.filter((r) => r.target.includes('Close')).length / records.length) *
                        100
                    )}% do total`
                  : '0%'}
              </div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
                <span>Cliques nos Pacotes</span>
                <span className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {records.filter((r) => r.category === 'package' || r.target.includes('Frascos')).length}
              </div>
              <div className="text-[11px] text-blue-400/90 mt-1 font-medium">
                Kits selecionados
              </div>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Onde foram os cliques */}
              <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-emerald-400" />
                    Onde foram os Cliques (Por Botão / Elemento)
                  </h3>
                  <span className="text-xs text-slate-400">{targetStats.length} elementos</span>
                </div>

                {targetStats.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    Nenhum clique registrado ainda. Os cliques de visitantes aparecerão aqui instantaneamente.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {targetStats.map(([target, count]) => {
                      const percentage = Math.round((count / records.length) * 100) || 0;
                      return (
                        <div key={target} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-200">{target}</span>
                            <span className="text-slate-400">
                              <b className="text-white">{count}</b> ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Top Cidades & Países */}
              <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Top Cidades & Localizações
                  </h3>
                  <span className="text-xs text-slate-400">{cityStats.length} cidades</span>
                </div>

                {cityStats.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    Nenhuma localização registrada ainda.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {cityStats.slice(0, 7).map(([cityLabel, info]) => {
                      const percentage = Math.round((info.count / records.length) * 100) || 0;
                      return (
                        <div
                          key={cityLabel}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">📍</span>
                            <div>
                              <div className="font-bold text-slate-200">{cityLabel}</div>
                              <div className="text-[10px] text-slate-500">{info.country}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-emerald-400 text-sm">{info.count}</div>
                            <div className="text-[10px] text-slate-400">{percentage}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LOCATIONS (COUNTRIES & CITIES) */}
          {activeTab === 'locations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Países */}
                <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    Cliques por País
                  </h3>
                  <div className="space-y-2">
                    {countryStats.length === 0 ? (
                      <div className="text-slate-500 text-xs py-6 text-center">Sem dados</div>
                    ) : (
                      countryStats.map(([country, info]) => (
                        <div
                          key={country}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800"
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                            <span className="w-6 text-center text-sm">🌐</span>
                            <span>{country}</span>
                            <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-800">
                              {info.code}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-emerald-400">{info.count} cliques</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Cidades */}
                <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Cliques por Cidade
                  </h3>
                  <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                    {cityStats.length === 0 ? (
                      <div className="text-slate-500 text-xs py-6 text-center">Sem dados</div>
                    ) : (
                      cityStats.map(([cityLabel, info]) => (
                        <div
                          key={cityLabel}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800"
                        >
                          <div className="text-xs">
                            <div className="font-semibold text-slate-200">{cityLabel}</div>
                            <div className="text-[10px] text-slate-500">{info.country}</div>
                          </div>
                          <span className="text-sm font-bold text-emerald-400">{info.count} cliques</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DETAILED LOGS */}
          {activeTab === 'logs' && (
            <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl p-5 space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filtrar por elemento, cidade, país ou IP..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="text-xs bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-300 focus:outline-hidden"
                  >
                    <option value="all">Todas as Categorias</option>
                    <option value="cookie">Cookies (Allow / Close)</option>
                    <option value="package">Pacotes de Frascos</option>
                    <option value="checkout">Checkout</option>
                    <option value="other">Outros</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-3">Data / Hora</th>
                      <th className="py-3 px-3">Elemento Clicado</th>
                      <th className="py-3 px-3">Cidade</th>
                      <th className="py-3 px-3">País</th>
                      <th className="py-3 px-3">IP / ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500">
                          Nenhum registro encontrado.
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                            {r.formattedDate}
                          </td>
                          <td className="py-2.5 px-3 font-sans font-semibold text-white">
                            <span className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-emerald-300">
                              {r.target}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-sans text-slate-300">
                            {r.city} {r.region ? `(${r.region})` : ''}
                          </td>
                          <td className="py-2.5 px-3 font-sans text-slate-300">
                            {r.country}
                          </td>
                          <td className="py-2.5 px-3 text-[11px] text-slate-500">
                            {r.ip}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0f172a] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Dados gravados localmente no navegador (localStorage).</span>
          </div>
          <div>
            Dica: Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">ESC</kbd> para fechar.
          </div>
        </div>

      </div>
    </div>
  );
};
