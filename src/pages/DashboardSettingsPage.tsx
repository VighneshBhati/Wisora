import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardSettingsSidebar } from "@/components/layout/DashboardSettingsSidebar";
import { AnnouncementsTab } from "@/components/settings/AnnouncementsTab";
import { AccountTab } from "@/components/settings/AccountTab";
import { useRandomBackground } from "../hooks/useRandomBackground";
import { SEOHead } from '@/components/seo';

const DashboardSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("account");
  const bgClass = useRandomBackground();

  const renderActiveTab = () => {
    switch (activeTab) {
      case "account":
        return <AccountTab />;
      case "announcements":
        return <AnnouncementsTab />;
      default:
        return <AccountTab />;
    }
  };

  return (
    <>
      <SEOHead />
      <div className={bgClass + " min-h-screen"}>
        <DashboardLayout>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 min-h-[60vh] py-4">
            <div className="lg:w-64 lg:flex-shrink-0">
              <DashboardSettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div className="flex-1 min-w-0">
              {renderActiveTab()}
            </div>
          </div>
        </DashboardLayout>
      </div>
    </>
  );
};

export default DashboardSettingsPage;
