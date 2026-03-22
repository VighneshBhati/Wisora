import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useViewMode, type ViewMode } from '@/contexts/ViewModeContext';
import { User, Building2, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const modes: { id: ViewMode; label: string; icon: React.ComponentType<{ className?: string }>; route: string; description: string }[] = [
  { id: 'personal', label: 'Personal', icon: User, route: '/personal/home', description: 'Find experts for yourself' },
  { id: 'institutional', label: 'Institution', icon: Building2, route: '/institutional/dashboard', description: 'Manage your organization' },
  { id: 'expert', label: 'Expert', icon: Briefcase, route: '/expert/dashboard', description: 'Manage your sessions' },
];

export const ModeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { viewMode, setViewMode } = useViewMode();
  const navigate = useNavigate();

  const handleSwitch = (mode: typeof modes[0]) => {
    setViewMode(mode.id);
    navigate(mode.route);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 border border-border/30">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSwitch(mode)}
            title={mode.description}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
              viewMode === mode.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <mode.icon className="h-3.5 w-3.5" />
            {mode.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <p className="text-xs text-muted-foreground font-medium px-1 mb-1">Switch Mode</p>
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => handleSwitch(mode)}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left',
            viewMode === mode.id
              ? 'bg-primary/15 text-primary border border-primary/30'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent'
          )}
        >
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
            viewMode === mode.id ? 'bg-primary/20' : 'bg-muted'
          )}>
            <mode.icon className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-xs">{mode.label}</div>
            <div className="text-xs text-muted-foreground truncate">{mode.description}</div>
          </div>
          {viewMode === mode.id && (
            <div className="ml-auto w-2 h-2 rounded-full bg-primary flex-shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
};
