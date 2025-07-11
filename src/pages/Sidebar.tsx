// src/pages/Sidebar.tsx
import React from 'react';
import {
  Home,
  Activity,
  Users,
  Package,
  UserCheck,
  PlayCircle,
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pipe-analysis', label: 'PIPE Analysis', icon: Activity },
    { id: 'merchants', label: 'Merchants', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', icon: Package },
    { id: 'onboarding', label: 'Onboarding Tracker', icon: UserCheck },
    { id: 'kms', label: 'KMS', icon: PlayCircle }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SabDesk</h1>
            <p className="text-sm text-gray-600">Internal Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
