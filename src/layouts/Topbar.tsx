import { Bell, LogOut, User, Search, Settings, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../features/auth/store/authStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function Topbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Area */}
      <div className="flex items-center gap-6 flex-1">
        <div className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 uppercase tracking-wider scale-90 origin-left">
            Workspace
          </span>
          <span className="text-xs font-semibold text-zinc-300">Default Group</span>
        </div>

        {/* Global Search Primitive */}
        <div className="hidden lg:block w-full max-w-sm">
          <Input
            placeholder="Search anything... (⌘K)"
            leftIcon={<Search className="w-4 h-4" />}
            className="!h-9 bg-zinc-950/50 border-zinc-800/60 focus:bg-zinc-900 transition-all hover:bg-zinc-900/30"
          />
        </div>
      </div>

      {/* Right Area */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 mr-2 px-3 border-r border-zinc-800">
           <Button variant="ghost" size="icon" className="w-8 h-8">
             <HelpCircle className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon" className="w-8 h-8">
             <Settings className="w-4 h-4" />
           </Button>
        </div>

        {/* Notifications */}
        <div className="relative group">
          <Button
             variant="ghost"
             size="icon"
             className="relative text-zinc-400 hover:text-zinc-100"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-zinc-950" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 py-1 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer group ml-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
            {user?.displayName ? (
              <span className="text-xs font-bold text-zinc-300 uppercase letter-spacing-widest">
                {user.displayName.charAt(0)}
              </span>
            ) : (
              <User className="w-4 h-4 text-zinc-500" />
            )}
          </div>
          
          <div className="hidden lg:block">
            <p className="text-xs font-semibold text-zinc-200 leading-none">
              {user?.displayName || 'Administrator'}
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5 leading-none">
              {user?.email || 'admin@meddash.io'}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="w-8 h-8 ml-1 text-zinc-500 hover:text-danger"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
