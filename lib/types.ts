export interface OptimizationInput {
  script: string;
  brandName: string;
  productDetails: string;
  icp: string;
  platform: string;
  stageOfAwareness: string;
  controlLabel: string;
}

export interface AuditItem {
  element: string;
  explanation: string;
}

export interface ChangeItem {
  original: string;
  rewrite: string;
  rationale: string;
}

export interface HookVariation {
  id: string;
  name: string;
  hook: string;
  whyItWorks: string;
  psychologicalMechanism: string;
}

export interface RewriteSection {
  label: string;
  timing: string;
  content: string;
}

export interface LaunchTest {
  hookId: string;
  hookName: string;
  hookDescription: string;
  priority: 'launch_first' | 'test_second' | 'test_third';
  priorityLabel: string;
  budgetPercent: number;
}

export interface OptimizationOutput {
  metadata: {
    brand: string;
    date: string;
    control: string;
    icp: string;
    stageOfAwareness: string;
    platform: string;
  };
  controlAudit: {
    originalScript: string;
    wordCount: number;
    estimatedRuntime: string;
    whatsWorking: AuditItem[];
    whatsBloated: AuditItem[];
    score: number;
    scoreRationale: string;
  };
  rewrite: {
    targetRuntime: string;
    wordCount: string;
    format: string;
    sections: RewriteSection[];
  };
  whatChangedAndWhy: ChangeItem[];
  hookVariations: HookVariation[];
  productionNotes: {
    format: string;
    creatorProfile: string;
    delivery: string;
    onScreenText: string;
    productMoment: string;
    endCard: string;
  };
  launchRecommendation: {
    tests: LaunchTest[];
    budgetSplitNote: string;
    testDuration: string;
  };
}
