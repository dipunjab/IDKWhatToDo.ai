import { parseCareerData } from "lib/utlis";
import { appwriteConfig, database } from "./client";

interface Document {
    [key: string]: any
}

type FilterByDate = (
    items: Document[],
    key: string,
    start: string,
    end?: string
) => number;

export const getuserAndCareersStats = async (): Promise<DashboardStats> => {

    const d = new Date();
    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrev = new Date(d.getFullYear(), d.getMonth() - 1, 1).toISOString();
    const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();


    const [users, careers] = await Promise.all([
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId
        ),
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.careerCollectionId
        )
    ]);

    const filterByDate: FilterByDate = (items, key, start, end) => items.filter((item) => (
        item[key] >= start && (!end || item[key] <= end)
    )).length;

    const filterUsersByRole = (role: string) => {
        return users.documents.filter((u: Document) => u.status === role)
    }

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(
                users.documents,
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                users.documents,
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        userRole: {
            total: filterUsersByRole('user').length,
            currentMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        totalCareerPlanned: careers.total,
        CareersCreated: {
            currentMonth: filterByDate(
                careers.documents,
                'createdAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        }
    }
};

export const getUserGrowthPerDay = async () => {
    const users = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId
    );

    const userGrowth = users.documents.reduce(
        (acc: { [key: string]: number }, user: Document) => {
            const date = new Date(user.joinedAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }))
};

export const getCareersCreatedPerDay = async () => {
    const careers = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.careerCollectionId
    );

    const careersGrowth = careers.documents.reduce(
        (acc: { [key: string]: number }, career: Document) => {
            const date = new Date(career.createdAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(careersGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getCareersByInterest = async () => {
    const careers = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.careerCollectionId
    );

    const interestCounts = careers.documents.reduce(
        (acc: { [key: string]: number }, career: Document) => {
            const careerDetail = parseCareerData(career.careerDetail);

            if (careerDetail && Array.isArray(careerDetail.interests)) {
                for (const interest of careerDetail.interests) {
                    acc[interest] = (acc[interest] || 0) + 1;
                }
            }
            
            return acc;
        },
        {}
    );

    return Object.entries(interestCounts).map(([interests, count]) => ({
        count: Number(count),
        interests,
    }));
};