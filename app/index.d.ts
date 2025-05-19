declare interface BaseUser {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  imageUrl: string;
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

  /** User’s input profile (for context & display) */
  profileOverview: string[];  
  suggestedCareers: string[];  
  recommendedSkills: string[];  
  learningPath: TimelineStep[];  
  industryOutlook: string[];
  salaryRange: string;
  resourceLinks: ResourceLink[];  
  createdAt: string;        
  downloadLink?: string;
}

type GetAllCareersResponse = {
  allTrips: Models.Document[];
  total: number;
};

declare interface CareerFormData {
  age: string;
  country: string;
  education: string;
  interests: string[];
  personality: string;
  skills: string[];
  experienceLevel: string
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