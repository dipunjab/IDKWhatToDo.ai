import { PagerComponent } from "@syncfusion/ej2-react-grids"
import CareerCard from "components/CareerCard"
import Header from "components/Headers"
import { parseCareerData } from "lib/utlis";
import { useState } from "react";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { getAllCareers } from "~/appwrite/careers";
import type { Route } from "./+types/careerai";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 4;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || "1", 10);
  const offset = (page - 1) * limit;

  const { allCareers, total } = await getAllCareers(limit, offset);

  return {
    careers: (allCareers ?? []).map(({ $id, careerDetail, imageUrls }) => ({
      docId: $id,
      ...parseCareerData(careerDetail),
      imageUrls: imageUrls ?? []
    })),
    total
  }
}

const CareerAi = ({ loaderData }: Route.ComponentProps) => {
  const careers = loaderData?.careers as Career[]  | [];
console.log(careers);

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
          {careers.map((career) => (
            <>
            <CareerCard
              key={career.id}
              id={career.docId}
              name={career.title}
              description={career.description}
              imageUrl={career?.imageUrls[0]}
              tags={career.requiredSkills}
            />
            </>
          ))}
        </div>

        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={4}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>
    </main>
  )
}

export default CareerAi
