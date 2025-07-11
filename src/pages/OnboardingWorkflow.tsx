import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Calendar, User } from 'lucide-react';
import { OnboardingTracker } from '../types';

const OnboardingWorkflow: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const onboardingData: OnboardingTracker[] = [
    {
      id: 'OT001',
      merchantName: 'TechCorp Solutions',
      dateOfOnboarding: '2024-01-15',
      currentStatus: 'TRANSACTING',
      firstTransactionDate: '2024-01-20',
      daysSinceOnboarding: 60,
      completionPercentage: 100,
      assignedTo: 'Rahul Sharma'
    },
    {
      id: 'OT002',
      merchantName: 'Fashion Hub',
      dateOfOnboarding: '2024-02-20',
      currentStatus: 'ACTIVE',
      daysSinceOnboarding: 25,
      completionPercentage: 85,
      assignedTo: 'Priya Patel'
    },
    {
      id: 'OT003',
      merchantName: 'Food Express',
      dateOfOnboarding: '2024-03-10',
      currentStatus: 'WIP',
      daysSinceOnboarding: 5,
      completionPercentage: 60,
      assignedTo: 'Amit Kumar'
    },
    {
      id: 'OT004',
      merchantName: 'Digital Services',
      dateOfOnboarding: '2024-01-05',
      currentStatus: 'TRANSACTING',
      firstTransactionDate: '2024-01-12',
      daysSinceOnboarding: 70,
      completionPercentage: 100,
      assignedTo: 'Sneha Singh'
    },
    {
      id: 'OT005',
      merchantName: 'Retail Store',
      dateOfOnboarding: '2024-02-28',
      currentStatus: 'WIP',
      daysSinceOnboarding: 17,
      completionPercentage: 45,
      assignedTo: 'Vikash Gupta'
    },
    {
      id: 'OT006',
      merchantName: 'E-commerce Plus',
      dateOfOnboarding: '2024-03-05',
      currentStatus: 'ACTIVE',
      daysSinceOnboarding: 10,
      completionPercentage: 90,
      assignedTo: 'Anita Verma'
    },
    {
      id: 'OT007',
      merchantName: 'Health Care Ltd',
      dateOfOnboarding: '2024-03-12',
      currentStatus: 'WIP',
      daysSinceOnboarding: 3,
      completionPercentage: 30,
      assignedTo: 'Rajesh Yadav'
    }
  ];

  const filteredData = onboardingData.filter(item => {
    const matchesSearch = item.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.currentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TRANSACTING': return 'bg-green-100 text-green-800';
      case 'ACTIVE': return 'bg-blue-100 text-blue-800';
      case 'WIP': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'TRANSACTING': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'ACTIVE': return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'WIP': return <Clock className="w-5 h-5 text-yellow-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
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

  const wipMerchants = filteredData.filter(m => m.currentStatus === 'WIP').length;
  const activeMerchants = filteredData.filter(m => m.currentStatus === 'ACTIVE').length;
  const transactingMerchants = filteredData.filter(m => m.currentStatus === 'TRANSACTING').length;
  const avgCompletionRate = (filteredData.reduce((sum, item) => sum + item.completionPercentage, 0) / filteredData.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Onboarding Tracker</h1>
        <div className="text-sm text-gray-600">
          Track merchant onboarding progress and status changes
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">WIP Merchants</h3>
              <p className="text-2xl font-bold text-yellow-600">{wipMerchants}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Merchants</h3>
              <p className="text-2xl font-bold text-blue-600">{activeMerchants}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Transacting</h3>
              <p className="text-2xl font-bold text-green-600">{transactingMerchants}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Completion</h3>
              <p className="text-2xl font-bold text-gray-900">{avgCompletionRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-600" />
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
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="WIP">WIP</option>
                <option value="ACTIVE">Active</option>
                <option value="TRANSACTING">Transacting</option>
              </select>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Onboarding
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Since Onboarding
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.merchantName}</div>
                      <div className="text-sm text-gray-500">{item.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{formatDate(item.dateOfOnboarding)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.currentStatus)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.currentStatus)}`}>
                        {item.currentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.firstTransactionDate ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-900">{formatDate(item.firstTransactionDate)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Not started</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.daysSinceOnboarding} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.completionPercentage >= 80 ? 'bg-green-600' : 
                            item.completionPercentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${item.completionPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.completionPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{item.assignedTo}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWorkflow;