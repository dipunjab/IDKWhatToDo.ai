declare interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageURL: string;
}

declare interface UserData extends BaseUser {
  careerPlansCreated: number | string;
  status: "user" | "admin";
}

declare type User = BaseUser;

declare interface DropdownItem {
  name: string;
}

// src/types/careerPlan.ts

/** One actionable step in the user’s learning journey */
interface TimelineStep {
  step: number;             // 1, 2, 3…
  title: string;            // e.g. “Learn JavaScript Basics”
  description: string;      // e.g. “Complete an online JS course…”
  duration?: string;        // e.g. “4 weeks”
}

/** A link to an external resource or course */
interface ResourceLink {
  title: string;            // e.g. “FreeCodeCamp JS Course”
  url: string;
}

/** The full AI-generated career plan */
declare interface CareerPlan {
  /** Unique identifier */
  id: string;

  /** Which topic or focus this plan is for */
  planName: string;         // e.g. “Front-End Web Development”

  /** A human-readable overview of the plan */
  summary: string;
  country: string;
  /** User’s input profile (for context & display) */
  profileOverview: string[];  
  suggestedCareers: string[];  
  recommendedSkills: string[];  
  learningPath: TimelineStep[];  
  industryOutlook: string[];
  salaryRange: string;
  resourceLinks: ResourceLink[];  
  createdAt: string;        
}

declare interface CareerCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

type GetAllCareersResponse = {
  allCareers: Models.Document[];
  total: number;
};

declare interface CareerFormData {
  age: number;
  country: string;
  education: string;
  interests: string[];
  personality: string;
  skills: string[];
  experienceLevel: string;
  descriptionByUser: string
}

declare interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  totalCareerPlanned: number;
  CareersCreated: {
    currentMonth: number;
    lastMonth: number;
  };
}

declare interface StatsCard {
  headerTitle: string;
  total: number;
  lastMonthCount: number;
  currentMonthCount: number;
}

declare interface TrendResult {
  trend: "increment" | "decrement" | "no change";
  percentage: number;
}

declare interface Country {
  name: string;
  flag: string;
  value: string;
}

declare interface Career {
  id: string;
  title: string;
  description: string;
  salaryInsights: {
    averageLocal: string;
    remoteOrFreelance: string;
  };
  reasoning: string;
  requiredSkills: string[];
  learningPath: {
    phase: string;
    topics: string[];
  }[];
  onlineResources: {
    name: string;
    type: string;
    url: string;
  }[];
  localOpportunities: string;
  relatedAlternatives: string[];
  imageUrls: string[];
}

declare interface CreateCareerResponse {
  id?: string;
}