import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { AppConfig, FeatureFlags } from './appConfig';
import { BASE_NAVIGATION } from './navigationConfig';

interface ConfigContextValue {
  config: AppConfig;
  hasPermission: (permission: keyof FeatureFlags) => boolean;
  hasRole: (role: string) => boolean;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

function evaluatePermission(item: any, flags: FeatureFlags): boolean {
  if (item.requiredFeature) return flags[item.requiredFeature] === true;
  if (item.requiredFeatures?.length) {
    const match = item.match ?? 'any';
    return match === 'any'
      ? item.requiredFeatures.some((f: keyof FeatureFlags) => flags[f] === true)
      : item.requiredFeatures.every((f: keyof FeatureFlags) => flags[f] === true);
  }
  return true;
}

export function ConfigProvider({
  children,
  apiData,
}: {
  children: ReactNode;
  apiData: any;
}) {
  const config = useMemo((): AppConfig => {
    const data = apiData?.data ?? {};
    const f = data.features ?? {};
    const sub = data.subscription ?? { status: 'inactive', planName: 'Free' };
    const workspaceData = data.workspaceData ?? {};

    const featureFlags: FeatureFlags = {
      is_UrlShortnerAllowed: f.is_UrlShortnerAllowed ?? false,
      is_CalendarViewAllowed: f.is_CalendarViewAllowed ?? false,
      is_CanvaAllowed: f.is_CanvaAllowed ?? false,
      is_EngagementViewAllowed: f.is_EngagementViewAllowed ?? false,
      is_DashboardViewAllowed: f.is_DashboardViewAllowed ?? false,
      is_HashTagAllowed: f.is_HashTagAllowed ?? false,
      canDeleteBulkPosts: f.canDeleteBulkPosts ?? false,
      canViewInsights: f.canViewInsights ?? false,
      canAccessAIModule: f.canAccessAIModule ?? true,
      currentSocialChannel: f.currentSocialChannel ?? 0,
      totalSocialChannel: f.totalSocialChannel ?? null,
      currentUploadSize: f.currentUploadSize ?? 0,
      totalUploadSize: f.totalUploadSize ?? 20480,
      currentMemberCount: f.currentMemberCount ?? 0,
      totalMemberCount: f.totalMemberCount ?? null,
      currentWorkspace: f.currentWorkspace ?? 0,
      totalWorkspace: f.totalWorkspace ?? null,
      currentAiGeneratedCount: f.currentAiGeneratedCount ?? 0,
      totalAiGeneratedCount: f.totalAiGeneratedCount ?? null,
      currentSchedulePostCount: f.currentSchedulePostCount ?? 0,
      currentDraftPostCount: f.currentDraftPostCount ?? 0,
      currentPostCount: f.currentPostCount ?? 0,
      currentLocalBusiness: f.currentLocalBusiness ?? 0,
      totalLocalBusiness: f.totalLocalBusiness ?? 0,
    };

    const navigationModules = BASE_NAVIGATION.map((base) => {
      const moduleEnabled = evaluatePermission(base, featureFlags);
      const sections = (base.sections || []).map((section: any) => ({
        ...section,
        enabled: evaluatePermission(section, featureFlags),
      }));
      const children = (base.children || []).map((child: any) => ({
        ...child,
        enabled: evaluatePermission(child, featureFlags),
      }));

      return {
        ...base,
        enabled: moduleEnabled,
        sections,
        children,
      };
    }).filter((m) => m.enabled);

    return {
      featureFlags,
      navigationModules,
      subscriptionActive: sub.status === 'active',
      planName: sub.planName || 'Free',
      userRole: workspaceData.users?.[0]?.role || data.default_role || 'limited_user',
      defaultRole: data.default_role || 'limited_user',
    };
  }, [apiData]);

  const hasPermission = (permission: keyof FeatureFlags) => 
    config.featureFlags[permission] === true;

  const hasRole = (role: string) => 
    config.userRole === role || config.defaultRole === role;

  return (
    <ConfigContext.Provider value={{ config, hasPermission, hasRole }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error('useConfig must be used within ConfigProvider');
  return context;
};