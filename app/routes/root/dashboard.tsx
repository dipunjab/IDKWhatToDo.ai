import { Headers, StatsCard } from "components"
import CareerCard from "components/CareerCard"

const Dashboard = () => {
  const user = {
    name: "Usman Ghani"
  }

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
            total={100}
            currentMonthCount={34}
            lastMonthCount={50}
          />
          <StatsCard
            headerTitle="Total Career Created"
            total={34}
            currentMonthCount={12}
            lastMonthCount={22}
          />
          <StatsCard
            headerTitle="Active Users"
            total={55}
            currentMonthCount={30}
            lastMonthCount={25}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

        <div className='trip-grid'>
            <CareerCard
              key={2}
              id={"2"}
              name={"Software Developer"}
              imageUrl={"/images/career1.avif"}
              location={'Pakistan'}
              tags={["Computer Science", "Programming"]}
              salary={"$200k"}
            />
        </div>
      </section>


    </div>

  )
}

export default Dashboard
