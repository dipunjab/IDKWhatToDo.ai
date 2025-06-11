import { PagerComponent } from "@syncfusion/ej2-react-grids"
import CareerCard from "components/CareerCard"
import Header from "components/Headers"
import { useState } from "react";
import { useSearchParams } from "react-router";

const CareerAi = () => {

  const [searchParams] = useSearchParams();
    const initialPage = Number(searchParams.get('page') || '1')

    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.location.search = `?page=${page}`
    }

  return (
    <main className="all-users wrapper">
      <Header
        title="Careers"
        description="View and edit AI-generated Career plans"
        ctaText="Create a Career"
        ctaUrl="/career/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">
          Manage Created Career
        </h1>

        <div className="career-grid mb-4">
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

        <PagerComponent
          totalRecordsCount={10}
          pageSize={8}
          currentPage={1}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  )
}

export default CareerAi
