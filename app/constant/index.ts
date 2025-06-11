import type { AxisModel } from "@syncfusion/ej2-react-charts";
import { formatDate } from "lib/utlis";


export const sidebarItems = [
    {
        id: 1,
        icon: "/icons/home.svg",
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        id: 3,
        icon: "/icons/icons8-ai-16.png",
        label: "Career AI",
        href: "/careerai",
    },
    {
        id: 2,
        icon: "/icons/users.svg",
        label: "All Users",
        href: "/admin/all-users",
        role: "admin",
    },
    {
        id: 4,
        icon: "/icons/feedback.svg",
        label: "Feedbacks",
        href: "/admin/feedback",
        role: "admin",
    },
];

//Form Options
export const educationLevels = [
    "No Formal Education",
    "Primary School",
    "Middle School",
    "High School",
    "Diploma ",
    "Vocational Training",
    "Associate Degree",
    "Undergraduate (Bachelor's)",
    "Graduate (Master's)",
    "Doctorate (PhD)",
];

export const interests = [
    "Technology",
    "Healthcare",
    "Business",
    "Finance",
    "Art & Design",
    "Education",
    "Science",
    "Engineering",
    "Law",
    "Media & Journalism",
    "Environment & Sustainability",
    "Gaming & Esports",
    "Fashion & Lifestyle",
    "Politics & Social Causes",
    "Travel & Tourism",
    "Sports & Athletics",
    "Writing & Literature",
    "None / I'm Unsure",
];

export const personalityTypes = [
    "Introvert",
    "Extrovert",
    "Creative",
    "Analytical",
    "Practical",
    "Leader",
    "Helper",
    "Thinker",
    "Doer",
    "Dreamer",
    "I don’t know",
];

export const skillSets = [
    "Problem Solving",
    "Communication",
    "Critical Thinking",
    "Creativity",
    "Teamwork",
    "Leadership",
    "Time Management",
    "Emotional Intelligence",
    "Tech Literacy",
    "Numerical Reasoning",
    "Customer Service",
    "None yet, I'm still exploring",
];

export const experienceLevels = [
  "No experience",
  "1–2 years",
  "3–5 years",
  "6–9 years",
  "10+ years",
];

export const selectItems = [
  "education",
  "interests",
  "personality",
  "skills",
  "experienceLevel",
] as (keyof CareerFormData)[];

export const comboBoxItems = {
    education: educationLevels,
    interests: interests,
    personality: personalityTypes,
    skills: skillSets,
    experienceLevel: experienceLevels
} as Record<keyof CareerFormData, string[]>;

export const dashboardStats = {
    totalUsers: 12450,
    usersJoined: { currentMonth: 218, lastMonth: 176 },
    totalCareerPlanned: 3210,
    careerPlannedThisMonth: { currentMonth: 150, lastMonth: 250 },
    userRoles: { totalAdmins: 62, currentMonth: 25, lastMonth: 15 },
};

export const chartOneData: object[] = [
    { x: "Jan", y1: 0.5, y2: 1.5, y3: 0.7 },
    { x: "Feb", y1: 0.8, y2: 1.2, y3: 0.9 },
    { x: "Mar", y1: 1.2, y2: 1.8, y3: 1.5 },
    { x: "Apr", y1: 1.5, y2: 2.0, y3: 1.8 },
    { x: "May", y1: 1.8, y2: 2.5, y3: 2.0 },
    { x: "Jun", y1: 2.0, y2: 2.8, y3: 2.5 },
];

export const userXAxis: AxisModel = {
    valueType: "Category",
    title: "Day"
};

export const userYAxis = {
    minimum: 0,
    maximum: 10,
    interval: 2,
    title: "Count"
};


//for career
export const careerXAxis: AxisModel = {
    valueType: "Category",
    title: "Month",
    majorGridLines: { width: 0 },
};

export const careerYAxis: AxisModel = {
    minimum: 0,
    maximum: 300,
    interval: 50,
    title: "Number of Career Queries",
};

// career suggestion mock data
export const allCareerSuggestions = [
    {
        queryId: "cq1",
        careers: ["Software Engineer", "Data Analyst"],
        recommendedSkills: ["JavaScript", "SQL", "Python"],
        learningPath: [
            "Complete a coding bootcamp",
            "Build 3 personal projects",
            "Contribute to open-source repositories",
        ],
        salaryRange: "$70k–$100k",
    },
    {
        queryId: "cq2",
        careers: ["Graphic Designer", "Content Writer"],
        recommendedSkills: ["Adobe Photoshop", "Creative Writing", "SEO Basics"],
        learningPath: [
            "Take an online UI/UX design course",
            "Create a portfolio of 5 design pieces",
            "Start a personal blog to practice writing",
        ],
        salaryRange: "$40k–$60k",
    },
    {
        queryId: "cq3",
        careers: ["Marketing Manager", "Business Analyst"],
        recommendedSkills: ["Leadership", "Data Interpretation", "Presentation Skills"],
        learningPath: [
            "Enroll in an MBA introductory course",
            "Volunteer for project management tasks",
            "Get certified in Google Analytics",
        ],
        salaryRange: "$80k–$120k",
    },
    {
        queryId: "cq4",
        careers: ["Registered Nurse", "Healthcare Administrator"],
        recommendedSkills: ["Patient Care", "Medical Terminology", "Team Coordination"],
        learningPath: [
            "Complete an accredited nursing program",
            "Gain clinical experience through internships",
            "Study for the NCLEX-RN exam",
        ],
        salaryRange: "$60k–$90k",
    },
    {
        queryId: "cq5",
        careers: ["University Professor", "Research Scientist"],
        recommendedSkills: ["Critical Thinking", "Academic Writing", "Lab Techniques"],
        learningPath: [
            "Publish 2 peer-reviewed papers",
            "Teach undergraduate seminars",
            "Apply for research grants",
        ],
        salaryRange: "$70k–$110k",
    },
];

export const allUsers = [
    {
        id: "u1",
        name: "Ali Khan",
        email: "ali.khan@example.com",
        imageUrl: "/assets/images/ali.jpg",
        dateJoined: formatDate("2025-01-01"), role: "user",
    },
    {
        id: "u2",
        name: "Sara Malik",
        email: "sara.malik@example.com",
        imageUrl: "/assets/images/sara.jpg",
        dateJoined: formatDate("2025-01-01"), role: "user",
    },
    {
        id: "u3",
        name: "Hamid Ali",
        email: "hamid.ali@example.com",
        imageUrl: "/assets/images/hamid.jpg",
        dateJoined: formatDate("2025-01-01"), role: "admin",
    },
    {
        id: "u4",
        name: "Zara Noor",
        email: "zara.noor@example.com",
        imageUrl: "/assets/images/zara.jpg",
        dateJoined: formatDate("2025-01-01"), role: "user",
    },
    {
        id: "u5",
        name: "Omar Sheikh",
        email: "omar.sheikh@example.com",
        imageUrl: "/assets/images/omar.jpg",
        dateJoined: formatDate("2025-01-01"),
        role: "user",
    },
];

