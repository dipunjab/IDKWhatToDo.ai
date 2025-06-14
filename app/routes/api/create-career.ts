import { type ActionFunctionArgs, data } from "react-router";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseMarkdownToJson, parseCareerData } from "../../../lib/utlis";
import { appwriteConfig, database } from "~/appwrite/client";
import { ID } from "appwrite";

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    age,
    country,
    education,
    interests,
    personality,
    skills,
    experienceLevel,
    descriptionByUser,
    userId,
  } = await request.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

  try {
    const prompt = `
You are an intelligent career advisor AI. Based on the user's background and preferences, your task is to recommend **one** best-fit career path and provide detailed, practical guidance to help the user pursue it.

Please ensure:
- The recommended career is based on **current capability, interest, and potential**
- The explanation is professional, motivating, and customized to the user’s situation
- Alternatives are optional, and should only be added at the end for flexibility
- Output is clean **JSON only**, no markdown or commentary

Return a response in the following structure:

{
  "recommendedCareer": {
    "title": "Full name of the suggested career",
    "description": "1–2 sentence summary of what the career is about"
  },
  "reasoning": "A clear and personalized explanation (minimum 3–5 sentences) explaining why this is the best career match for the user right now, considering their skills, interests, education, experience, and location.",
  "requiredSkills": [
    "List of essential and helpful skills",
    "Example: communication, data analysis, UI design, etc."
  ],
  "learningPath": [
    {
      "phase": "Beginner",
      "topics": ["Key topic 1", "Key topic 2"]
    },
    {
      "phase": "Intermediate",
      "topics": ["Key topic 3", "Key topic 4"]
    },
    {
      "phase": "Advanced",
      "topics": ["Key topic 5", "Key topic 6"]
    }
  ],
  "onlineResources": [
    {
      "name": "Resource Name",
      "type": "Course / Channel / Article / Book",
      "url": "https://..."
    },
    ...
  ],
  "localOpportunities": "Describe the job market, demand, or opportunities for this career in ${country}. Include any country-specific benefits or barriers.",
  "salaryInsights": {
    "averageLocal": "Estimated salary in ${country}'s currency (monthly or annually)",
    "remoteOrFreelance": "If applicable, mention potential earnings for remote jobs or freelance roles in USD or international currency"
  },
  "relatedAlternatives": [
    "Closely related career 1",
    "Closely related career 2",
    "Closely related career 3"
  ]
}

User Profile:

- Age: ${age}
- Country: ${country}
- Education: ${education}
- Interests: ${interests.join(', ')}
- Personality Traits: ${personality}
- Skills: ${skills.join(', ')}
- Experience Level: ${experienceLevel}
- Additional Notes: ${descriptionByUser}

Your goal is to give the user **clarity**, not just information. Focus on what suits them most at this stage of life, and how they can start building toward it.
`;


    const textResult = await genAI
      .getGenerativeModel({ model: 'gemini-2.0-flash' })
      .generateContent([prompt])

    const career = parseMarkdownToJson(textResult.response.text()) as any;

    const flatCareer: Career = {
      id: ID.unique(), // manually include ID if needed
      title: career.recommendedCareer.title,
      description: career.recommendedCareer.description,
      reasoning: career.reasoning,
      requiredSkills: career.requiredSkills,
      learningPath: career.learningPath,
      onlineResources: career.onlineResources,
      localOpportunities: career.localOpportunities,
      salaryInsights: career.salaryInsights,
      relatedAlternatives: career.relatedAlternatives,
      imageUrls: [],
      interests: interests
    };


    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query= ${interests[0]} ${interests[1]} ${skills[1]}&client_id=${unsplashApiKey}`
    );

    const imageUrls = (await imageResponse.json()).results.slice(0, 3)
      .map((result: any) => result.urls?.regular || null);

    const result = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.careerCollectionId,
      ID.unique(),
      {
        careerDetail: JSON.stringify(flatCareer),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    )


    return data({ id: result.$id })
  } catch (e) {
    console.error('Error generating career plan: ', e);
  }
}