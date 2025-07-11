export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'analyst';
  avatar?: string;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  gmv: number;
  joinDate: string;
  category: string;
  location: string;
}

export interface Transaction {
  id: string;
  merchantId: string;
  merchantName: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
  type: 'payment' | 'refund' | 'chargeback';
  gateway: string;
}

export interface Subscription {
  id: string;
  merchantId: string;
  merchantName: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  amount: number;
  billingCycle: 'monthly' | 'annual';
}

export interface OnboardingStep {
  id: string;
  merchantId: string;
  merchantName: string;
  step: number;
  totalSteps: number;
  currentStep: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  startDate: string;
  lastUpdated: string;
}

export interface PipeAnalysis {
  id: string;
  merchantId: string;
  merchantName: string;
  pipeName: 'BOB' | 'AIRTEL' | 'YES_BANK' | 'INDIAN_BANK';
  paymentMode: 'UPI_COLLECT' | 'UPI_INTENT' | 'NETBANKING' | 'CARD' | 'WALLET';
  totalTransactions: number;
  successTransactions: number;
  failedTransactions: number;
  successRate: number;
  lastUpdated: string;
  status: 'healthy' | 'warning' | 'critical';
  recommendedAction?: string;
}

export interface PipeAlert {
  id: string;
  merchantId: string;
  merchantName: string;
  pipeName: string;
  paymentMode: string;
  successRate: number;
  totalTransactions: number;
  recommendedPipe: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface HomeMetrics {
  totalTransactingMerchants: number;
  totalGMV: number;
  totalTransactions: number;
  totalWIPMerchants: number;
}

export interface TopMerchant {
  id: string;
  name: string;
  gmv: number;
  transactions: number;
  growth: string;
}

export interface OnboardingTracker {
  id: string;
  merchantName: string;
  dateOfOnboarding: string;
  currentStatus: 'WIP' | 'ACTIVE' | 'TRANSACTING';
  firstTransactionDate?: string;
  daysSinceOnboarding: number;
  completionPercentage: number;
  assignedTo: string;
}

export interface KMSVideo {
  id: string;
  title: string;
  description: string;
  category: 'new_launch' | 'operations' | 'agreements' | 'training' | 'compliance';
  duration: string;
  thumbnail: string;
  uploadDate: string;
  views: number;
  isNew: boolean;
}