
import React from 'react';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import DashboardModernHeader from '@/components/ui/DashboardModernHeader';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/seo';
import { useSecureStudentNotifications } from '@/lib/hooks/secure-student-hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const StudentNotificationsPage = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: notifications, isLoading, error } = useSecureStudentNotifications(user);

  return (
    <>
      <SEOHead />
      <DashboardLayout>
        <DashboardModernHeader
        title={t('studentNotifications.title')}
        subtitle={t('studentNotifications.subtitle')}
      />
      <div className="space-y-6">
        <NotificationCenter notifications={notifications} isLoading={isLoading} error={error} />
      </div>
      </DashboardLayout>
    </>
  );
};
