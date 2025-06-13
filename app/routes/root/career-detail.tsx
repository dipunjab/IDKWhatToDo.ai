import { parseCareerData } from 'lib/utlis';
import React from 'react'
import type { LoaderFunctionArgs } from 'react-router';
import { getAllCareers, getCareerById } from '~/appwrite/careers';
import type { Route } from './+types/career-detail';
import Header from 'components/Headers';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { careerId } = params;
  if (!careerId) throw new Error('Career ID is required');
  console.log("📌 careerId param:", careerId);

  const [career, careers] = await Promise.all([
    getCareerById(careerId),
    getAllCareers(4, 0)
  ]);

  return {
    career,
    allCareers: careers.allCareers?.map(({ $id, careerDetail, imageUrls }) => ({
      id: $id,
      ...parseCareerData(careerDetail),
      imageUrls: imageUrls ?? []
    }))
  }
}

const CareerDetail = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.career?.imageUrls || [];
  const careerData: any = parseCareerData(loaderData?.career?.careerDetail);


  const { title, description, recommendedCareer, learningPath, localOpportunities, onlineResources, reasoning, relatedAlternatives, requiredSkills, salaryInsights } = careerData || {};



  return (
    <main className="career-detail wrapper">
      <Header title="Career Detail" description="View AI-generated Career plan" />

      <section className="container wrapper-md space-y-10 py-6">

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

          <h3 className="text-sm text-primary-600 font-semibold uppercase tracking-wide mb-2">🎯 Your Ideal Career</h3>

          <h2 className="text-3xl font-bold text-gray-800 mb-1">{title}</h2>

          <p className="text-gray-600 text-base mb-4">{description}</p>

          <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
            <h4 className="text-md font-semibold text-primary-700 mb-1">🤖 Why This Career Was Recommended for You</h4>
            <p className="text-primary-900 leading-relaxed">{reasoning}</p>
          </div>

          {imageUrls.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {imageUrls.map((url: any, index: any) => (
                <img
                  key={index}
                  src={url}
                  alt={`Career image ${index + 1}`}
                  className="rounded-lg object-cover h-40 w-full"
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-2">
          <h3 className="text-sm text-primary-600 font-semibold uppercase tracking-wide mb-2">🛠️ Required Skills</h3>

          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
            {requiredSkills?.map((skill: string, index: number) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-3">
          <h3 className="text-sm text-blue-600 font-semibold uppercase tracking-wide mb-4">🎓 Learning Path</h3>

          <ol className="space-y-4 border-l-2 border-blue-200 pl-4">
            {learningPath?.map((phase: any, index: number) => (
              <li key={index}>
                <div className="font-semibold text-blue-700">{phase.phase}</div>
                <ul className="list-disc list-inside text-gray-700 ml-2 mt-1 space-y-1">
                  {phase.topics.map((topic: string, idx: number) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-8 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-sm text-green-600 font-semibold uppercase tracking-wide mb-4">🌐 Online Resources</h3>

          <ul className="space-y-3 text-sm text-gray-700">
            {onlineResources?.map((res: any, index: number) => (
              <li key={index} className="flex flex-col">
                <div className="font-semibold text-gray-800">{res.name} <span className="text-gray-500 text-xs ml-1">({res.type})</span></div>
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  {res.url.replace(/^https?:\/\//, '')}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-3">
          <h3 className="text-sm text-rose-600 font-semibold uppercase tracking-wide mb-4">🏙️ Local Opportunities</h3>
          <p className="text-gray-700 leading-relaxed">
            {localOpportunities}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-3">
          <h3 className="text-sm text-yellow-600 font-semibold uppercase tracking-wide mb-4">💰 Salary Insights</h3>

          <div className="text-gray-700 space-y-2">
            <p><strong>Local:</strong> {salaryInsights?.averageLocal}</p>
            <p><strong>Remote / Freelance:</strong> {salaryInsights?.remoteOrFreelance}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mb-2">🔄 Related Career Alternatives</h3>

          <div className="flex flex-wrap gap-2 mt-2">
            {relatedAlternatives?.map((alt: string, index: number) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full border border-indigo-100"
              >
                {alt}
              </span>
            ))}
          </div>
        </div>


      </section>

    </main>
  )
}

export default CareerDetail;