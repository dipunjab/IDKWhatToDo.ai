import { Headers, StatsCard } from "components"
import CareerCard from "components/CareerCard"
import { getAllUsers, getUser } from "~/appwrite/auth"
import type { Route } from "./+types/dashboard";
import { getAllCareers } from "~/appwrite/careers";
import { parseCareerData } from "lib/utlis";
import { getCareersByInterest, getuserAndCareersStats, getUserGrowthPerDay } from "~/appwrite/dashboard";
import {
    Category,
    ChartComponent,
    ColumnSeries,
    DataLabel, Inject, SeriesCollectionDirective, SeriesDirective,
    SplineAreaSeries,
    Tooltip
} from "@syncfusion/ej2-react-charts";
import { careerXAxis, careerYAxis, userXAxis, userYAxis } from "~/constant";

export const clientLoader = async () => {
  const [
    user,
    dashboardStats,
    careers,
    userGrowth,
    careersByInterest,
    allUsers,
  ] = await Promise.all([
    await getUser(),
    await getuserAndCareersStats(),
    await getAllCareers(4, 0),
    await getUserGrowthPerDay(),
    await getCareersByInterest(),
    await getAllUsers(4, 0),
  ])
  
  const allCareers = careers?.allCareers?.map(({ $id, careerDetail, imageUrls }) => ({
    docId: $id,
    ...parseCareerData(careerDetail),
    imageUrls: imageUrls ?? []
  }))

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 10),
  }))

  return {
    user,
    dashboardStats,
    userGrowth,
    careersByInterest,
    allCareers,
    allUsers: mappedUsers
  }
}

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData?.user as User | null;
  const allCareers = loaderData?.allCareers as Career[] | [];

  const { dashboardStats, userGrowth, careersByInterest } = loaderData;


  return (
    <div className="dashboard wrapper">
      <Headers
        title={`Welcome ${user?.name ?? 'Guest'} 👋`}
        description="Monitor user activity, trending careers, and AI-generated insights in real time"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Career Created"
            total={dashboardStats.totalCareerPlanned}
            currentMonthCount={dashboardStats.CareersCreated.currentMonth}
            lastMonthCount={dashboardStats.CareersCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Careers</h1>

        <div className='career-grid'>
          {allCareers?.map((career) => (
            <CareerCard
              key={career.id}
              id={career.docId}
              name={career.title}
              description={career.description}
              imageUrl={career?.imageUrls[0]}
              tags={career.requiredSkills}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
       <ChartComponent
                    id="chart-1"
                    primaryXAxis={userXAxis}
                    primaryYAxis={userYAxis}
                    title="User Growth"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="Column"
                            name="Column"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />

                        <SeriesDirective
                            dataSource={userGrowth}
                            xName="day"
                            yName="count"
                            type="SplineArea"
                            name="Wave"
                            fill="rgba(71, 132, 238, 0.3)"
                            border={{ width: 2, color: '#4784EE'}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>

                <ChartComponent
                    id="chart-2"
                    primaryXAxis={careerXAxis}
                    primaryYAxis={careerYAxis}
                    title="Career Trends"
                    tooltip={{ enable: true}}
                >
                    <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

                    <SeriesCollectionDirective>
                        <SeriesDirective
                            dataSource={careersByInterest}
                            xName="interests"
                            yName="count"
                            type="Column"
                            name="Interest"
                            columnWidth={0.3}
                            cornerRadius={{topLeft: 10, topRight: 10}}
                        />
                    </SeriesCollectionDirective>
                </ChartComponent>
      </section>
   

    </div>

  )
}

export default Dashboard
