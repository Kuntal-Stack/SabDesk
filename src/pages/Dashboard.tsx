// src/pages/Dashboard.tsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import HomePage from "./HomePage";
import PipeAnalysis from "./PipeAnalysis";
import MerchantManagement from "./MerchantManagement";
import SubscriptionManagement from "./SubscriptionManagement";
import OnboardingWorkflow from "./OnboardingWorkflow";
import KMS from "./KMS";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "pipe-analysis":
        return <PipeAnalysis />;
      case "merchants":
        return <MerchantManagement />;
      case "subscriptions":
        return <SubscriptionManagement />;
      case "onboarding":
        return <OnboardingWorkflow />;
      case "kms":
        return <KMS />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar fixed */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main area */}
      <div className="flex-1 ml-64">
        <Header />
        <main className="mt-20 p-4 overflow-y-auto min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
