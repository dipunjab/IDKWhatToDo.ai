import {appwriteConfig, database} from "~/appwrite/client";
import {Query} from "appwrite";

export const getAllCareers = async (limit: number, offset: number) => {
    const allCareers = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.careerCollectionId,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc('createdAt')]
    )

    if(allCareers.total === 0) {
        console.error('No careers found');
        return { allTrips: [], total: 0 }
    }

    return {
        allCareers: allCareers.documents,
        total: allCareers.total,
    }
}

export const getCareerById = async (careerId: string) => {
    const career = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.careerCollectionId,
        careerId
    );

    if(!career.$id) {
        console.log('Career not found')
        return null;
    }

    return career;
}