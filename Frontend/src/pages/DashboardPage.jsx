import React from 'react';
import { LayoutDashboard, Activity, Shield, Settings, LogOut } from 'lucide-react';
import TacticalMap from '../components/dashboard/TacticalMap';
import TribunalLog from '../components/dashboard/TribunalLog';
import { useThreatSimulation } from '../hooks/useThreatSimulation';

const DashboardPage = () => {
    const { activeThreats } = useThreatSimulation();

    return (
        <div className="flex h-screen w-full bg-[#101010] text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-[80px] flex-shrink-0 border-r border-white/10 flex flex-col items-center py-6 bg-[#0A0A0A]">
                <div className="mb-8">
                    <div className="w-10 h-10 bg-[#00FFFF]/10 rounded-lg flex items-center justify-center border border-[#00FFFF]/30">
                        <Shield className="w-6 h-6 text-[#00FFFF]" />
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full px-2">
                    <SidebarItem icon={<LayoutDashboard size={24} />} active />
                    <SidebarItem icon={<Activity size={24} />} />
                    <SidebarItem icon={<Shield size={24} />} />
                </nav>

                <div className="mt-auto">
                    <SidebarItem icon={<Settings size={24} />} />
                    <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-center">
                        <SidebarItem icon={<LogOut size={24} />} />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                <header className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">SYSTEM DASHBOARD</h1>
                        <p className="text-gray-400 text-sm mt-1">Overview of active autonomous agents</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FFFF]/10 border border-[#00FFFF]/20 text-[#00FFFF] text-xs font-mono">
                            <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
                            SYSTEM ONLINE
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {/* Placeholder Widgets */}
                    <DashboardCard title="Active Agents" value="12" trend="+2" />
                    <DashboardCard title="Threats Neutralized" value="843" trend="+15%" />
                    <DashboardCard title="System Uptime" value="99.99%" trend="Stable" />

                    {/* Tactical Map */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[400px] bg-[#151515] border border-white/5 rounded-xl overflow-hidden relative group">
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-mono text-red-500 tracking-wider">LIVE FEED</span>
                        </div>
                        <TacticalMap threats={activeThreats.map(t => ({
                            id: t.id,
                            lat: t.coordinates[0],
                            lng: t.coordinates[1],
                            type: t.type,
                            status: t.status
                        }))} />
                    </div>

                    {/* Tribunal Log */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 h-[400px] rounded-xl overflow-hidden">
                        <TribunalLog />
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon, active }) => (
    <button className={`w-full aspect-square flex items-center justify-center rounded-xl transition-all duration-200 ${active ? 'bg-[#00FFFF]/10 text-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.2)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
        {icon}
    </button>
);

const DashboardCard = ({ title, value, trend }) => (
    <div className="bg-[#151515] border border-white/5 rounded-xl p-6 hover:border-[#00FFFF]/30 transition-colors duration-300 group">
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-white group-hover:text-[#00FFFF] transition-colors">{value}</span>
            <span className="text-xs font-mono text-[#00FFFF] bg-[#00FFFF]/10 px-2 py-1 rounded">{trend}</span>
        </div>
    </div>
);

export default DashboardPage;
