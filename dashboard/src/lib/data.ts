export type AdStatus = "pending" | "live" | "archive";

export interface Ad {
  id: string;
  campaign: string;
  hookType: string;
  variant: string;
  date: string;
  status: AdStatus;
  format: "image" | "video";
  roas?: number;
  ctr?: number;
  cpc?: number;
  metaAdId?: string;
  score?: number;
  thumbnailUrl?: string;
}

export interface Brief {
  id: string;
  campaign: string;
  date: string;
  status: "active" | "template" | "archived";
  objective: string;
  targetAudience: string;
  hooks: string[];
  kpis: { roas: number; ctr: number; cpc: number };
  forgeRun?: string;
}

export interface PerformanceScore {
  adId: string;
  campaign: string;
  date: string;
  roas: number;
  ctr: number;
  cpc: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface WeeklyReport {
  week: string;
  totalSpend: number;
  totalRevenue: number;
  avgRoas: number;
  avgCtr: number;
  avgCpc: number;
  adsRunning: number;
  newCreatives: number;
}

export const ads: Ad[] = [
  {
    id: "ad-001",
    campaign: "summer-sale",
    hookType: "problem-agitate",
    variant: "v1",
    date: "2026-04-14",
    status: "live",
    format: "video",
    metaAdId: "23851234567890",
    roas: 4.2,
    ctr: 2.8,
    cpc: 0.95,
    score: 87,
  },
  {
    id: "ad-002",
    campaign: "summer-sale",
    hookType: "social-proof",
    variant: "v2",
    date: "2026-04-14",
    status: "live",
    format: "image",
    metaAdId: "23851234567891",
    roas: 3.1,
    ctr: 1.9,
    cpc: 1.10,
    score: 62,
  },
  {
    id: "ad-003",
    campaign: "retention-q2",
    hookType: "curiosity-gap",
    variant: "v1",
    date: "2026-04-16",
    status: "live",
    format: "video",
    metaAdId: "23851234567892",
    roas: 5.1,
    ctr: 3.4,
    cpc: 0.78,
    score: 94,
  },
  {
    id: "ad-004",
    campaign: "new-audience",
    hookType: "direct-offer",
    variant: "v1",
    date: "2026-04-18",
    status: "pending",
    format: "video",
  },
  {
    id: "ad-005",
    campaign: "new-audience",
    hookType: "direct-offer",
    variant: "v2",
    date: "2026-04-18",
    status: "pending",
    format: "image",
  },
  {
    id: "ad-006",
    campaign: "new-audience",
    hookType: "testimonial",
    variant: "v1",
    date: "2026-04-19",
    status: "pending",
    format: "video",
  },
  {
    id: "ad-007",
    campaign: "q1-promo",
    hookType: "problem-agitate",
    variant: "v1",
    date: "2026-03-10",
    status: "archive",
    format: "image",
    metaAdId: "23849876543210",
    roas: 1.8,
    ctr: 1.1,
    cpc: 1.45,
    score: 31,
  },
  {
    id: "ad-008",
    campaign: "q1-promo",
    hookType: "social-proof",
    variant: "v1",
    date: "2026-03-10",
    status: "archive",
    format: "video",
    metaAdId: "23849876543211",
    roas: 2.9,
    ctr: 2.2,
    cpc: 1.05,
    score: 58,
  },
  {
    id: "ad-009",
    campaign: "retention-q1",
    hookType: "curiosity-gap",
    variant: "v3",
    date: "2026-03-25",
    status: "archive",
    format: "video",
    metaAdId: "23849876543212",
    roas: 6.3,
    ctr: 4.1,
    cpc: 0.62,
    score: 98,
  },
];

export const briefs: Brief[] = [
  {
    id: "brief-001",
    campaign: "new-audience",
    date: "2026-04-17",
    status: "active",
    objective: "Acquire new users aged 25–40 with interest in productivity tools",
    targetAudience: "Entrepreneurs, freelancers, side-hustlers in the US/CA",
    hooks: [
      "Direct offer: 50% off first month",
      "Testimonial: real user transformation story",
      "Curiosity gap: the one habit that doubled our clients' revenue",
    ],
    kpis: { roas: 3.5, ctr: 2.0, cpc: 1.2 },
    forgeRun: "2026-04-18",
  },
  {
    id: "brief-002",
    campaign: "retention-q2",
    date: "2026-04-15",
    status: "active",
    objective: "Re-engage lapsed users from Q1 cohort, drive subscription renewals",
    targetAudience: "Past users inactive for 30–90 days",
    hooks: [
      "We've added 12 new features since you left",
      "Your competitors are already using this",
      "Come back — here's what you missed",
    ],
    kpis: { roas: 4.0, ctr: 2.5, cpc: 0.9 },
  },
  {
    id: "brief-tpl-001",
    campaign: "seasonal-sale",
    date: "2026-01-01",
    status: "template",
    objective: "Drive urgency purchases around seasonal events",
    targetAudience: "Warm audiences and lookalikes",
    hooks: [
      "Limited time: [OFFER] ends [DATE]",
      "Everyone's buying this for [EVENT]",
      "Last chance to [BENEFIT] before [EVENT]",
    ],
    kpis: { roas: 3.0, ctr: 1.8, cpc: 1.2 },
  },
];

export const performanceScores: PerformanceScore[] = [
  { adId: "ad-001", campaign: "summer-sale", date: "2026-04-20", roas: 4.2, ctr: 2.8, cpc: 0.95, spend: 450, impressions: 47368, clicks: 1326, conversions: 42 },
  { adId: "ad-002", campaign: "summer-sale", date: "2026-04-20", roas: 3.1, ctr: 1.9, cpc: 1.10, spend: 280, impressions: 25455, clicks: 484, conversions: 24 },
  { adId: "ad-003", campaign: "retention-q2", date: "2026-04-20", roas: 5.1, ctr: 3.4, cpc: 0.78, spend: 620, impressions: 57407, clicks: 1952, conversions: 71 },
  { adId: "ad-007", campaign: "q1-promo", date: "2026-03-31", roas: 1.8, ctr: 1.1, cpc: 1.45, spend: 310, impressions: 28182, clicks: 310, conversions: 11 },
  { adId: "ad-008", campaign: "q1-promo", date: "2026-03-31", roas: 2.9, ctr: 2.2, cpc: 1.05, spend: 190, impressions: 17273, clicks: 380, conversions: 16 },
  { adId: "ad-009", campaign: "retention-q1", date: "2026-03-31", roas: 6.3, ctr: 4.1, cpc: 0.62, spend: 520, impressions: 48148, clicks: 1975, conversions: 117 },
];

export const weeklyReports: WeeklyReport[] = [
  { week: "Mar 10", totalSpend: 1020, totalRevenue: 2856, avgRoas: 2.8, avgCtr: 2.2, avgCpc: 1.08, adsRunning: 4, newCreatives: 3 },
  { week: "Mar 17", totalSpend: 1150, totalRevenue: 3335, avgRoas: 2.9, avgCtr: 2.3, avgCpc: 1.04, adsRunning: 5, newCreatives: 2 },
  { week: "Mar 24", totalSpend: 1320, totalRevenue: 4092, avgRoas: 3.1, avgCtr: 2.6, avgCpc: 0.98, adsRunning: 5, newCreatives: 4 },
  { week: "Mar 31", totalSpend: 1020, totalRevenue: 3264, avgRoas: 3.2, avgCtr: 2.5, avgCpc: 0.97, adsRunning: 3, newCreatives: 0 },
  { week: "Apr 7", totalSpend: 890, totalRevenue: 2848, avgRoas: 3.2, avgCtr: 2.4, avgCpc: 1.01, adsRunning: 3, newCreatives: 1 },
  { week: "Apr 14", totalSpend: 1350, totalRevenue: 5130, avgRoas: 3.8, avgCtr: 2.7, avgCpc: 0.93, adsRunning: 5, newCreatives: 3 },
];

export const kpiTargets = {
  roas: 3.5,
  ctr: 2.0,
  cpc: 1.2,
};
