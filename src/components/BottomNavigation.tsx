
import { Home, FileText, Image, History, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/seo', icon: FileText, label: 'SEO' },
  { path: '/thumbnail', icon: Image, label: 'Thumbnail' },
  { path: '/history', icon: History, label: 'History' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="glass-card rounded-none border-l-0 border-r-0 border-b-0 p-2">
      <div className="flex justify-around items-center">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
