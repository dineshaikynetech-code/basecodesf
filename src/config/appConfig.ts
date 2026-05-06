export interface FeatureFlags {
  is_UrlShortnerAllowed: boolean;
  is_CalendarViewAllowed: boolean;
  is_CanvaAllowed: boolean;
  is_EngagementViewAllowed: boolean;
  is_DashboardViewAllowed: boolean;
  is_HashTagAllowed: boolean;
  canDeleteBulkPosts: boolean;
  canViewInsights: boolean;
  canAccessAIModule: boolean;
  currentSocialChannel: number;
  totalSocialChannel: number | null;
  currentUploadSize: number;
  totalUploadSize: number;
  currentMemberCount: number;
  totalMemberCount: number | null;
  currentWorkspace: number;
  totalWorkspace: number | null;
  currentAiGeneratedCount: number;
  totalAiGeneratedCount: number | null;
  currentSchedulePostCount: number;
  currentDraftPostCount: number;
  currentPostCount: number;
  currentLocalBusiness: number;
  totalLocalBusiness: number;
}

export interface NavSection {
  id: string;
  name: string;
  requiredFeature?: keyof FeatureFlags;
}

export interface NavModule {
  id: string;
  name: string;
  icon?: any;
  path?: string;
  requiredFeature?: keyof FeatureFlags;
  requiredFeatures?: Array<keyof FeatureFlags>;
  match?: "any" | "all";
  sections?: NavSection[];
  children?: NavModule[];        // For nested groups like SMM
  enabled?: boolean;
  showInNav?: boolean;
}

export interface AppConfig {
  featureFlags: FeatureFlags;
  navigationModules: NavModule[];
  subscriptionActive: boolean;
  planName: string;
  userRole: string;
  defaultRole: string;
}