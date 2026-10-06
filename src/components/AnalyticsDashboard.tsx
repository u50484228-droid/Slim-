import React, { useState, useEffect, useMemo } from 'react';
import {
  VisitorSession,
  ClickRecord,
  getVisitorSessions,
  getClickRecords,
  clearAllAnalytics,
  getExcludedIps,
  addExcludedIp,
  removeExcludedIp,
  purgeRecordsByIp,
  isAdminModeActive,
  setAdminModeActive,
  initGeoTracker,
} from '../utils/analytics';
import {
  BarChart3,
  Globe,
  MapPin,
  MousePointerClick,
  Trash2,
  Download,
  X,
  Search,
  Clock,
  Video,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Activity,
  Layers,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  isOpen,
  onClose,
}) => {
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [clicks, setClicks] = useState<ClickRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'buttons' | 'locations' | 'adminIp'>('sessions');
  const [currentMyIp, setCurrentMyIp] = useState<string>('Detectando...');
  const [excludedIps, setExcludedIps] = useState<string[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(true);
  const [manualIpInput, setManualIpInput] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<VisitorSession | null>(null);

  const reloadAllData = () => {
    setSessions(getVisitorSessions());
    setClicks(getClickRecords());
    setExcludedIps(getExcludedIps());
    setIsAdminMode(isAdminModeActive());
  };

  useEffect(() => {
    if (isOpen) {
      reloadAllData();

      // Fetch admin IP
      initGeoTracker().then((geo) => {
        if (geo?.ip) {
          setCurrentMyIp(geo.ip);
          // Auto exclude admin IP if not already
          if (!getExcludedIps().includes(geo.ip)) {
            addExcludedIp(geo.ip);
            setExcludedIps(getExcludedIps());
          }
        }
      });
    }

    const handleUpdate = () => {
      reloadAllData();
    };

    window.addEventListener('sodaslim_sessions_updated', handleUpdate);
    window.addEventListener('sodaslim_new_click', handleUpdate);
    window.addEventListener('sodaslim_admin_status_changed', handleUpdate);

    // Auto refresh while dashboard is open
    const interval = setInterval(() => {
      if (isOpen) {
        reloadAllData();
      }
    }, 3000);

    return () => {
      window.removeEventListener('sodaslim_sessions_updated', handleUpdate);
      window.removeEventListener('sodaslim_new_click', handleUpdate);
      window.removeEventListener('sodaslim_admin_status_changed', handleUpdate);
      clearInterval(interval);
    };
  }, [isOpen]);

  // Format seconds to human readable string (e.g. 2m 45s or 32s)
  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m === 0) return `${s}s`;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // Metrics calculation
  const totalVisitors = sessions.length;
  
  const avgTimeOnPage = useMemo(() => {
    if (sessions.length === 0) return 0;
    const total = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
    return Math.round(total / sessions.length);
  }, [sessions]);

  const videoStats = useMemo(() => {
    const watchedSessions = sessions.filter((s) => (s.videoWatchTimeSeconds || 0) > 0 || s.videoPlayed);
    const totalSeconds = sessions.reduce((acc, s) => acc + (s.videoWatchTimeSeconds || 0), 0);
    const avgWatchTime = watchedSessions.length > 0 ? Math.round(totalSeconds / watchedSessions.length) : 0;
    const playRate = sessions.length > 0 ? Math.round((watchedSessions.length / sessions.length) * 100) : 0;
    return {
      totalSeconds,
      avgWatchTime,
      playedCount: watchedSessions.length,
      playRate,
    };
  }, [sessions]);

  // Aggregate buttons clicked
  const buttonStats = useMemo(() => {
    const counts: Record<string, { count: number; category: string }> = {};
    clicks.forEach((c) => {
      if (!counts[c.target]) {
        counts[c.target] = { count: 0, category: c.category };
      }
      counts[c.target].count += 1;
    });
    return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
  }, [clicks]);

  // Aggregate by Country
  const countryStats = useMemo(() => {
    const counts: Record<string, { count: number; code: string }> = {};
    sessions.forEach((s) => {
      const country = s.country || 'Outro';
      if (!counts[country]) {
        counts[country] = { count: 0, code: s.countryCode || 'US' };
      }
      counts[country].count += 1;
    });
    return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
  }, [sessions]);

  // Aggregate by City
  const cityStats = useMemo(() => {
    const counts: Record<string, { count: number; country: string; region: string }> = {};
    sessions.forEach((s) => {
      const key = `${s.city || 'Desconhecido'} (${s.region ? s.region + ', ' : ''}${s.country || ''})`;
      if (!counts[key]) {
        counts[key] = {
          count: 0,
          country: s.country || 'United States',
          region: s.region || '',
        };
      }
      counts[key].count += 1;
    });
    return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
  }, [sessions]);

  // Filtered sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchSearch =
        s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.formattedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.buttonsClicked.some((b) => b.target.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchSearch;
    });
  }, [sessions, searchTerm]);

  // Handle Export CSV
  const handleExportCSV = () => {
    if (sessions.length === 0) return;
    const headers = [
      'ID Sessao',
      'IP',
      'Data e Hora',
      'Pais',
      'Cidade',
      'Dispositivo',
      'Tempo na Pagina (segundos)',
      'Tempo no Video (segundos)',
      'Botoes Clicados',
    ];

    const rows = sessions.map((s) => [
      s.id,
      s.ip,
      `"${s.formattedDate}"`,
      `"${s.country}"`,
      `"${s.city}"`,
      s.device,
      s.durationSeconds,
      s.videoWatchTimeSeconds || 0,
      `"${s.buttonsClicked.map((b) => b.target).join(' | ')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sodaslim_visitas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isCurrentIpExcluded = excludedIps.includes(currentMyIp);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl max-h-[95vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                  Dashboard de Rastreamento de Visitantes
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  TEMPO REAL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Acessos, tempo na página, cliques de botões, tempo no vídeo, país e cidade.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reloadAllData}
              title="Atualizar dados agora"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Atualizar</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              title="Baixar relatório CSV"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-white transition"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* IP Protection Status Bar (Critical requirement) */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isCurrentIpExcluded ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              Seu IP atual:{' '}
              <strong className="text-amber-300 font-mono">{currentMyIp}</strong>
            </span>
            {isCurrentIpExcluded ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                EXCLUÍDO DO RASTREAMENTO (Dados protegidos)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
                <ShieldAlert className="w-3.5 h-3.5" />
                IP NÃO EXCLUÍDO
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isCurrentIpExcluded ? (
              <button
                type="button"
                onClick={() => addExcludedIp(currentMyIp)}
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] transition shadow"
              >
                Excluir Meu IP Agora
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  purgeRecordsByIp(currentMyIp);
                  reloadAllData();
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition"
                title="Remove qualquer visita gravada deste IP"
              >
                Limpar Testes do Meu IP
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('adminIp')}
              className="text-amber-400 hover:underline text-[11px]"
            >
              Configurar IPs ({excludedIps.length})
            </button>
          </div>
        </div>

        {/* Quick Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/60 border-b border-slate-800 text-xs">
          
          {/* Card 1: Total Visitors */}
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>Total de Visitantes</span>
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">
              {totalVisitors}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{sessions.filter((s) => s.isOnline).length} online agora</span>
            </div>
          </div>

          {/* Card 2: Avg Time on Page */}
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>Tempo Médio na Página</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">
              {formatDuration(avgTimeOnPage)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Permanência média geral
            </div>
          </div>

          {/* Card 3: Video Watch Time */}
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>Tempo no Vídeo</span>
              <Video className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400">
              {formatDuration(videoStats.avgWatchTime)}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {videoStats.playedCount} deram play ({videoStats.playRate}%)
            </div>
          </div>

          {/* Card 4: Total Button Clicks */}
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span>Cliques em Botões</span>
              <MousePointerClick className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-400">
              {clicks.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Ações gravadas
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex space-x-1 sm:space-x-3 text-xs font-semibold overflow-x-auto py-2">
            <button
              type="button"
              onClick={() => setActiveTab('sessions')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sessions'
                  ? 'bg-amber-400 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sessões &amp; Visitantes ({sessions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('buttons')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'buttons'
                  ? 'bg-amber-400 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>Botões Clicados ({buttonStats.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('locations')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'locations'
                  ? 'bg-amber-400 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Países &amp; Cidades</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('adminIp')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'adminIp'
                  ? 'bg-amber-400 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Exclusão de IP (Meu IP)</span>
            </button>
          </div>

          {/* Search box for sessions */}
          {activeTab === 'sessions' && (
            <div className="relative my-1 hidden sm:block">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Buscar por cidade, país, IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs rounded-lg pl-8 pr-3 py-1.5 text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 w-56"
              />
            </div>
          )}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* TAB 1: SESSIONS & VISITORS */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              
              {filteredSessions.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                    <Eye className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-white">Nenhum visitante registrado ainda.</p>
                  <p className="text-xs max-w-md mx-auto text-slate-400">
                    Assim que uma nova pessoa acessar o site (ou se você abrir em uma janela anônima sem o IP de admin excluído), ela aparecerá aqui em tempo real!
                  </p>
                </div>
              ) : (
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[720px]">
                      <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="py-3 px-4">Visitante / Status</th>
                          <th className="py-3 px-4">Data e Hora</th>
                          <th className="py-3 px-4">Localização (País / Cidade)</th>
                          <th className="py-3 px-4">Tempo na Página</th>
                          <th className="py-3 px-4">Tempo no Vídeo</th>
                          <th className="py-3 px-4">Botões Clicados</th>
                          <th className="py-3 px-4 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-200">
                        {filteredSessions.map((session) => (
                          <tr
                            key={session.id}
                            className="hover:bg-slate-800/40 transition cursor-pointer"
                            onClick={() => setSelectedSession(session)}
                          >
                            {/* Visitor / Status */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    session.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                                  }`}
                                  title={session.isOnline ? 'Online no site agora' : 'Offline'}
                                />
                                <div>
                                  <div className="font-bold text-white flex items-center gap-1.5">
                                    {session.device === 'Mobile' ? (
                                      <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                                    ) : session.device === 'Tablet' ? (
                                      <Tablet className="w-3.5 h-3.5 text-amber-400" />
                                    ) : (
                                      <Monitor className="w-3.5 h-3.5 text-slate-400" />
                                    )}
                                    <span className="font-mono text-[11px] text-slate-300">
                                      {session.ip}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    {session.browser} • {session.device}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Date and Time */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="font-semibold text-slate-200">
                                {session.formattedDate}
                              </div>
                            </td>

                            {/* Location */}
                            <td className="py-3 px-4">
                              <div className="font-bold text-white flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>{session.city}</span>
                                {session.region && (
                                  <span className="text-slate-400 font-normal">
                                    ({session.region})
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400">
                                {session.country} ({session.countryCode})
                              </div>
                            </td>

                            {/* Time on Page */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold font-mono">
                                <Clock className="w-3 h-3" />
                                {formatDuration(session.durationSeconds)}
                              </div>
                            </td>

                            {/* Video Watch Time */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              {session.videoWatchTimeSeconds > 0 || session.videoPlayed ? (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold font-mono">
                                  <Video className="w-3 h-3 text-amber-400" />
                                  <span>{formatDuration(session.videoWatchTimeSeconds)}</span>
                                </div>
                              ) : (
                                <span className="text-slate-500 text-[11px] italic">
                                  Não assistiu
                                </span>
                              )}
                            </td>

                            {/* Buttons Clicked */}
                            <td className="py-3 px-4">
                              {session.buttonsClicked && session.buttonsClicked.length > 0 ? (
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {session.buttonsClicked.slice(0, 3).map((b, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-semibold truncate max-w-[130px]"
                                      title={b.target}
                                    >
                                      {b.target}
                                    </span>
                                  ))}
                                  {session.buttonsClicked.length > 3 && (
                                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">
                                      +{session.buttonsClicked.length - 3}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-500 text-[11px] italic">
                                  Nenhum clique
                                </span>
                              )}
                            </td>

                            {/* Action */}
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSession(session);
                                }}
                                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 text-[11px] font-bold transition"
                              >
                                Ver Jornada
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: BUTTONS CLICKED RANKING */}
          {activeTab === 'buttons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white">
                    Ranking de Botões Mais Clicados
                  </h3>
                  <p className="text-xs text-slate-400">
                    Contagem exata de cliques em cada botão, pacote e chamada para ação (CTA).
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-bold">
                  Total de Cliques: <span className="text-amber-400 font-mono">{clicks.length}</span>
                </div>
              </div>

              {buttonStats.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <MousePointerClick className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p>Nenhum clique registrado ainda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {buttonStats.map(([target, item]) => {
                    const pct = clicks.length > 0 ? Math.round((item.count / clicks.length) * 100) : 0;
                    return (
                      <div
                        key={target}
                        className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 flex flex-col justify-between space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-white text-xs leading-snug">
                            {target}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-black font-mono text-xs shrink-0">
                            {item.count} cliques
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-[10.5px] text-slate-400 mb-1">
                            <span>{item.category.toUpperCase()}</span>
                            <span>{pct}% do total</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LOCATIONS (COUNTRIES & CITIES) */}
          {activeTab === 'locations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Countries */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span>Acessos por País</span>
                </div>
                {countryStats.length === 0 ? (
                  <p className="text-xs text-slate-400">Nenhum dado geográfico gravado.</p>
                ) : (
                  <div className="space-y-2">
                    {countryStats.map(([country, item]) => {
                      const pct = sessions.length > 0 ? Math.round((item.count / sessions.length) * 100) : 0;
                      return (
                        <div key={country} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-200">
                              {country} ({item.code})
                            </span>
                            <span className="text-amber-400 font-mono font-bold">
                              {item.count} ({pct}%)
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cities */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-3">
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Acessos por Cidade</span>
                </div>
                {cityStats.length === 0 ? (
                  <p className="text-xs text-slate-400">Nenhum dado de cidade gravado.</p>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {cityStats.map(([cityKey, item]) => {
                      const pct = sessions.length > 0 ? Math.round((item.count / sessions.length) * 100) : 0;
                      return (
                        <div key={cityKey} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-200 truncate max-w-[200px]" title={cityKey}>
                              {cityKey}
                            </span>
                            <span className="text-emerald-400 font-mono font-bold">
                              {item.count} visitas
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: ADMIN IP EXCLUSION (Owner Protection) */}
          {activeTab === 'adminIp' && (
            <div className="space-y-5 max-w-2xl mx-auto py-2">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      Proteção e Exclusão do Seu IP (Não Sujar Dados)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Quando você navega no site para testar, seu IP é ignorado e nenhum clique ou visita é computado nas métricas.
                    </p>
                  </div>
                </div>

                {/* Current IP status */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Seu Endereço IP Detectado:</span>
                    <span className="text-lg font-mono font-black text-amber-300">
                      {currentMyIp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCurrentIpExcluded ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Excluído com Sucesso
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          addExcludedIp(currentMyIp);
                          reloadAllData();
                        }}
                        className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow"
                      >
                        Excluir Meu IP Agora
                      </button>
                    )}
                  </div>
                </div>

                {/* Manual Add IP */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Adicionar Outro IP para Excluir Manualmente:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: 189.120.35.42"
                      value={manualIpInput}
                      onChange={(e) => setManualIpInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 text-white font-mono focus:outline-hidden focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (manualIpInput.trim()) {
                          addExcludedIp(manualIpInput.trim());
                          setManualIpInput('');
                          reloadAllData();
                        }
                      }}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold text-white transition"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>

                {/* List of currently excluded IPs */}
                <div className="space-y-2 pt-2 border-t border-slate-700/60">
                  <span className="text-xs font-bold text-slate-400">
                    IPs Atualmente Excluídos ({excludedIps.length}):
                  </span>
                  {excludedIps.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">Nenhum IP na lista.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {excludedIps.map((ip) => (
                        <div
                          key={ip}
                          className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2"
                        >
                          <span>{ip}</span>
                          {ip === currentMyIp && (
                            <span className="text-[10px] text-amber-400 font-sans font-bold">
                              (Você)
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              removeExcludedIp(ip);
                              reloadAllData();
                            }}
                            className="text-slate-500 hover:text-rose-400 transition"
                            title="Remover exclusão"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Purge / Reset Options */}
                <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Tem certeza que deseja apagar os registros gerados pelo seu IP?')) {
                        purgeRecordsByIp(currentMyIp);
                        reloadAllData();
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    Limpar histórico de testes do meu IP
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('ATENÇÃO: Deseja apagar TODOS os dados de rastreamento do dashboard?')) {
                        clearAllAnalytics();
                        reloadAllData();
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Resetar Todos os Dados
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Detail for a Single Visitor Session */}
        {selectedSession && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                    {selectedSession.countryCode}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Jornada do Visitante: {selectedSession.city}, {selectedSession.country}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      IP: {selectedSession.ip} • Entrada: {selectedSession.formattedDate}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSession(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 overflow-y-auto space-y-4 text-xs">
                
                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[11px] text-slate-400 block">Tempo na Página</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      {formatDuration(selectedSession.durationSeconds)}
                    </span>
                  </div>

                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[11px] text-slate-400 block">Tempo no Vídeo</span>
                    <span className="text-base font-black text-amber-400 font-mono">
                      {formatDuration(selectedSession.videoWatchTimeSeconds)}
                    </span>
                  </div>

                  <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[11px] text-slate-400 block">Rolagem da Página</span>
                    <span className="text-base font-black text-purple-400 font-mono">
                      {selectedSession.scrollDepth || 0}%
                    </span>
                  </div>
                </div>

                {/* Timeline of actions */}
                <div className="space-y-2">
                  <h4 className="font-black text-white text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Linha do Tempo das Ações (O que a pessoa fez):</span>
                  </h4>

                  <div className="space-y-2 border-l-2 border-slate-700 pl-3 ml-2">
                    
                    {/* Action 1: Entered */}
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -left-[19px] top-1" />
                      <div className="text-slate-200 font-semibold">
                        Entrou na Página
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {selectedSession.formattedDate} • Dispositivo: {selectedSession.device} ({selectedSession.browser})
                      </div>
                    </div>

                    {/* Action 2: Video if played */}
                    {selectedSession.videoWatchTimeSeconds > 0 && (
                      <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute -left-[19px] top-1" />
                        <div className="text-amber-300 font-bold">
                          Assistiu ao Vídeo da Fórmula
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Tempo total assistido: {formatDuration(selectedSession.videoWatchTimeSeconds)}
                        </div>
                      </div>
                    )}

                    {/* Action 3: Buttons */}
                    {selectedSession.buttonsClicked && selectedSession.buttonsClicked.length > 0 ? (
                      selectedSession.buttonsClicked.map((b, idx) => (
                        <div key={idx} className="relative">
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 absolute -left-[19px] top-1" />
                          <div className="text-white font-bold flex items-center gap-2">
                            <span>{b.target}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300">
                              {b.category}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Clicou aos {b.timeOffsetSeconds}s após entrar ({b.formattedTime})
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-500 italic text-[11px] pt-1">
                        Nenhum botão foi clicado durante esta visita.
                      </div>
                    )}

                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-slate-800 bg-slate-950 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedSession(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Fechar Detalhes
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
