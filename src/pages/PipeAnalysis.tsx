import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingDown,
  TrendingUp,
  Activity,
  Bell,
  X,
  RefreshCw
} from 'lucide-react';
import { PipeAnalysis as PipeAnalysisType, PipeAlert } from '../types';

const PipeAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pipeFilter, setPipeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [alerts, setAlerts] = useState<PipeAlert[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const pipeAnalysisData: PipeAnalysisType[] = [
    {
      id: 'PA001',
      merchantId: '1',
      merchantName: 'TechCorp Solutions',
      pipeName: 'BOB',
      paymentMode: 'UPI_COLLECT',
      totalTransactions: 100,
      successTransactions: 30,
      failedTransactions: 70,
      successRate: 30,
      lastUpdated: '2024-03-15T10:30:00Z',
      status: 'critical',
      recommendedAction: 'Switch to YES_BANK pipe'
    },
    {
      id: 'PA002',
      merchantId: '2',
      merchantName: 'Fashion Hub',
      pipeName: 'AIRTEL',
      paymentMode: 'UPI_INTENT',
      totalTransactions: 250,
      successTransactions: 225,
      failedTransactions: 25,
      successRate: 90,
      lastUpdated: '2024-03-15T09:45:00Z',
      status: 'healthy'
    },
    {
      id: 'PA003',
      merchantId: '3',
      merchantName: 'Food Express',
      pipeName: 'YES_BANK',
      paymentMode: 'NETBANKING',
      totalTransactions: 180,
      successTransactions: 135,
      failedTransactions: 45,
      successRate: 75,
      lastUpdated: '2024-03-15T09:15:00Z',
      status: 'warning',
      recommendedAction: 'Monitor closely'
    },
    {
      id: 'PA004',
      merchantId: '4',
      merchantName: 'Digital Services',
      pipeName: 'INDIAN_BANK',
      paymentMode: 'CARD',
      totalTransactions: 320,
      successTransactions: 304,
      failedTransactions: 16,
      successRate: 95,
      lastUpdated: '2024-03-15T08:30:00Z',
      status: 'healthy'
    },
    {
      id: 'PA005',
      merchantId: '5',
      merchantName: 'Retail Store',
      pipeName: 'BOB',
      paymentMode: 'WALLET',
      totalTransactions: 150,
      successTransactions: 90,
      failedTransactions: 60,
      successRate: 60,
      lastUpdated: '2024-03-15T07:20:00Z',
      status: 'warning',
      recommendedAction: 'Consider pipe optimization'
    }
  ];

  // Generate alerts for critical pipes
  useEffect(() => {
    const criticalPipes = pipeAnalysisData.filter(pipe => pipe.status === 'critical' || pipe.successRate < 50);
    const newAlerts: PipeAlert[] = criticalPipes.map(pipe => ({
      id: `ALERT_${pipe.id}`,
      merchantId: pipe.merchantId,
      merchantName: pipe.merchantName,
      pipeName: pipe.pipeName,
      paymentMode: pipe.paymentMode,
      successRate: pipe.successRate,
      totalTransactions: pipe.totalTransactions,
      recommendedPipe: pipe.pipeName === 'BOB' ? 'YES_BANK' : 'INDIAN_BANK',
      severity: pipe.successRate < 30 ? 'high' : pipe.successRate < 60 ? 'medium' : 'low',
      timestamp: new Date().toISOString()
    }));

    setAlerts(newAlerts);
    if (newAlerts.length > 0) {
      setShowAlert(true);
    }
  }, []);

  const filteredData = pipeAnalysisData.filter(pipe => {
    const matchesSearch = pipe.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pipe.pipeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPipe = pipeFilter === 'all' || pipe.pipeName === pipeFilter;
    const matchesStatus = statusFilter === 'all' || pipe.status === statusFilter;
    return matchesSearch && matchesPipe && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPipeColor = (pipeName: string) => {
    switch (pipeName) {
      case 'BOB': return 'bg-blue-100 text-blue-800';
      case 'AIRTEL': return 'bg-red-100 text-red-800';
      case 'YES_BANK': return 'bg-green-100 text-green-800';
      case 'INDIAN_BANK': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const healthyPipes = filteredData.filter(p => p.status === 'healthy').length;
  const warningPipes = filteredData.filter(p => p.status === 'warning').length;
  const criticalPipes = filteredData.filter(p => p.status === 'critical').length;
  const avgSuccessRate = (filteredData.reduce((sum, pipe) => sum + pipe.successRate, 0) / filteredData.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Alert Popup */}
      {showAlert && alerts.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-6 h-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">PIPE Alert</h3>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-900">
                        {alert.merchantName} - {alert.pipeName} PIPE
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        Success Rate: {alert.successRate}% ({alert.totalTransactions} transactions)
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        <strong>Action Required:</strong> Switch to {alert.recommendedPipe} pipe
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAlert(false)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Take Action
              </button>
              <button
                onClick={() => setShowAlert(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">PIPE Analysis</h1>
        <div className="flex items-center space-x-3">
          {alerts.length > 0 && (
            <button
              onClick={() => setShowAlert(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>{alerts.length} Alert{alerts.length > 1 ? 's' : ''}</span>
            </button>
          )}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Healthy Pipes</h3>
              <p className="text-2xl font-bold text-green-600">{healthyPipes}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Warning Pipes</h3>
              <p className="text-2xl font-bold text-yellow-600">{warningPipes}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Critical Pipes</h3>
              <p className="text-2xl font-bold text-red-600">{criticalPipes}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Success Rate</h3>
              <p className="text-2xl font-bold text-gray-900">{avgSuccessRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
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
                placeholder="Search merchants or pipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={pipeFilter}
                onChange={(e) => setPipeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Pipes</option>
                <option value="BOB">BOB</option>
                <option value="AIRTEL">AIRTEL</option>
                <option value="YES_BANK">YES BANK</option>
                <option value="INDIAN_BANK">INDIAN BANK</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
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
                  Pipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((pipe) => (
                <tr key={pipe.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pipe.merchantName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPipeColor(pipe.pipeName)}`}>
                      {pipe.pipeName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{pipe.paymentMode.replace('_', ' ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Total: {pipe.totalTransactions}</div>
                      <div className="text-xs text-green-600">Success: {pipe.successTransactions}</div>
                      <div className="text-xs text-red-600">Failed: {pipe.failedTransactions}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            pipe.successRate >= 80 ? 'bg-green-600' : 
                            pipe.successRate >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${pipe.successRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{pipe.successRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(pipe.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pipe.status)}`}>
                        {pipe.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(pipe.lastUpdated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pipe.status === 'critical' || pipe.status === 'warning' ? (
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                        Change Pipe
                      </button>
                    ) : (
                      <span className="text-xs text-gray-500">No action needed</span>
                    )}
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

export default PipeAnalysis;