
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
    <nav className="bottom-nav-glass">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`nav-item group ${isActive ? 'active' : ''}`}
            >
              <Icon className={`h-5 w-5 mb-1 transition-all duration-300 ${
                isActive 
                  ? 'text-primary scale-110' 
                  : 'text-muted-foreground group-hover:text-primary group-hover:scale-105'
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground group-hover:text-primary'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
