import React, { useState } from 'react';
import { Search, Filter, Play, Clock, Eye, Calendar, Star, Download } from 'lucide-react';
import { KMSVideo } from '../types';

const KMS: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const kmsVideos: KMSVideo[] = [
    {
      id: 'KMS001',
      title: 'New Payment Gateway Launch - March 2024',
      description: 'Complete overview of the new payment gateway features, integration process, and merchant benefits.',
      category: 'new_launch',
      duration: '15:30',
      thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-03-10',
      views: 1250,
      isNew: true
    },
    {
      id: 'KMS002',
      title: 'Operations Team Training - Transaction Monitoring',
      description: 'Step-by-step guide for operations team on monitoring transactions, handling disputes, and escalation procedures.',
      category: 'operations',
      duration: '22:45',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-03-05',
      views: 890,
      isNew: false
    },
    {
      id: 'KMS003',
      title: 'Merchant Agreement Process & Documentation',
      description: 'Comprehensive guide on creating merchant agreements, legal requirements, and documentation standards.',
      category: 'agreements',
      duration: '18:20',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-02-28',
      views: 567,
      isNew: false
    },
    {
      id: 'KMS004',
      title: 'New Employee Onboarding - SabPaisa Overview',
      description: 'Introduction to SabPaisa ecosystem, company culture, and basic training for new employees.',
      category: 'training',
      duration: '35:15',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-02-20',
      views: 2340,
      isNew: false
    },
    {
      id: 'KMS005',
      title: 'Compliance & Risk Management Updates',
      description: 'Latest compliance requirements, risk assessment procedures, and regulatory updates for 2024.',
      category: 'compliance',
      duration: '28:10',
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-03-12',
      views: 445,
      isNew: true
    },
    {
      id: 'KMS006',
      title: 'Advanced Operations - Pipe Management',
      description: 'Deep dive into payment pipe management, optimization strategies, and troubleshooting common issues.',
      category: 'operations',
      duration: '31:45',
      thumbnail: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-03-08',
      views: 678,
      isNew: false
    },
    {
      id: 'KMS007',
      title: 'Customer Support Excellence Training',
      description: 'Best practices for customer support, communication skills, and handling difficult situations.',
      category: 'training',
      duration: '24:30',
      thumbnail: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-02-15',
      views: 1120,
      isNew: false
    },
    {
      id: 'KMS008',
      title: 'UPI 2.0 Integration Guide',
      description: 'Technical walkthrough of UPI 2.0 features, implementation guidelines, and merchant setup process.',
      category: 'new_launch',
      duration: '19:55',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      uploadDate: '2024-03-14',
      views: 823,
      isNew: true
    }
  ];

  const filteredVideos = kmsVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || video.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'new_launch': return 'bg-green-100 text-green-800';
      case 'operations': return 'bg-blue-100 text-blue-800';
      case 'agreements': return 'bg-purple-100 text-purple-800';
      case 'training': return 'bg-orange-100 text-orange-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'new_launch': return 'New Launch';
      case 'operations': return 'Operations';
      case 'agreements': return 'Agreements';
      case 'training': return 'Training';
      case 'compliance': return 'Compliance';
      default: return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const totalVideos = filteredVideos.length;
  const newVideos = filteredVideos.filter(v => v.isNew).length;
  const totalViews = filteredVideos.reduce((sum, video) => sum + video.views, 0);
  const avgDuration = filteredVideos.reduce((sum, video) => {
    const [minutes, seconds] = video.duration.split(':').map(Number);
    return sum + minutes + (seconds / 60);
  }, 0) / filteredVideos.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Management System (KMS)</h1>
        <div className="text-sm text-gray-600">
          Employee training and knowledge resources
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Videos</h3>
              <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
            </div>
            <Play className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">New Videos</h3>
              <p className="text-2xl font-bold text-green-600">{newVideos}</p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Views</h3>
              <p className="text-2xl font-bold text-purple-600">{totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Duration</h3>
              <p className="text-2xl font-bold text-orange-600">{avgDuration.toFixed(0)}m</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="new_launch">New Launch</option>
                <option value="operations">Operations</option>
                <option value="agreements">Agreements</option>
                <option value="training">Training</option>
                <option value="compliance">Compliance</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100 transition-all">
                      <Play className="w-6 h-6 text-gray-900" />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(video.category)}`}>
                      {getCategoryLabel(video.category)}
                    </span>
                  </div>
                  {video.isNew && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-full">
                        NEW
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                      {video.duration}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(video.uploadDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KMS;