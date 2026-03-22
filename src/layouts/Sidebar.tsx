import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { useUIStore } from '../features/ui/store/uiStore';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/patients', icon: Users, label: 'Patients' },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  // We'll use sidebarOpen as the 'expanded' state for desktop too
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 
          bg-zinc-950 border-r border-zinc-800/60
          flex flex-col transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'w-[260px] translate-x-0' : 'w-[80px] -translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Container */}
        <div className={`flex items-center h-16 border-b border-zinc-800/40 px-4 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Activity className="w-5 h-5 text-zinc-100 stroke-[2.5]" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold text-zinc-50 tracking-tight animate-fade-in whitespace-nowrap">
                Med<span className="text-primary-500">Dash</span>
              </span>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={`hidden lg:flex w-8 h-8 text-zinc-500 hover:text-zinc-200 ${!sidebarOpen ? 'absolute -right-4 top-4 bg-zinc-900 border border-zinc-800 rounded-full shadow-xl z-50' : ''}`}
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {sidebarOpen && (
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 px-3 mb-4 animate-fade-in">
              Platform
            </p>
          )}
          
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              title={!sidebarOpen ? item.label : ''}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth group relative ${
                  isActive
                    ? 'bg-primary-500/10 text-primary-500'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50'
                } ${!sidebarOpen ? 'justify-center' : ''}`
              }
            >
              <item.icon
                className={`w-5 h-5 flex-shrink-0`}
              />
              
              {sidebarOpen && (
                <span className="animate-fade-in whitespace-nowrap">{item.label}</span>
              )}

              {/* Active Indicator */}
              <NavLink 
                to={item.to}
                className={({ isActive }) => 
                  `absolute left-0 w-1 rounded-r-full bg-primary-500 transition-all duration-300 h-6 ${isActive ? 'opacity-100' : 'opacity-0'}`
                }
              />
            </NavLink>
          ))}
        </nav>

        {/* User context or help area */}
        <div className={`p-4 border-t border-zinc-800/40 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
           {sidebarOpen ? (
             <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800/50">
               <p className="text-[10px] font-medium text-zinc-500 mb-1">Status</p>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-success" />
                 <span className="text-xs text-zinc-200">System Online</span>
               </div>
             </div>
           ) : (
             <div className="w-2 h-2 rounded-full bg-success" />
           )}
        </div>
      </aside>
    </>
  );
}
