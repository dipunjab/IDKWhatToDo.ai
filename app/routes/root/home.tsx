import { Link, type LoaderFunctionArgs, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { cn, parseCareerData } from "../../../lib/utlis";
import { Headers, CareerCard } from "../../../components";
import { getAllCareers } from "~/appwrite/careers";
import type { Route } from "../../../.react-router/types/app/routes/root/+types/careerai";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useEffect, useState, useRef } from "react";
import { User, Settings, LogOut, Home, Menu, X, Compass, Github, Linkedin } from "lucide-react";

import { getUser, logoutUser } from "~/appwrite/auth";
import { PagerComponent } from "@syncfusion/ej2-react-grids";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || "1", 10);
  const offset = (page - 1) * limit;

  const [{ allCareers, total }] = await Promise.all([
    getAllCareers(limit, offset),
  ]);



  return {
    careers: allCareers?.map(({ $id, careerDetail, imageUrls }) => ({
          docId: $id,
      ...parseCareerData(careerDetail),
      imageUrls: imageUrls ?? []
    })),
    total,

  };
};

const CareerHome = ({ loaderData }: Route.ComponentProps) => {

  const [user, setUser] = useState<UserDocument | null>(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null)
    console.log("User Logged out");

  }


  const careers = loaderData.careers as any[] | [];
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  };

  const [isDialogOpen, setDialogOpen] = useState(false);
  const dialogInstance = useRef<DialogComponent | null>(null);

  const navigate = useNavigate()

  return (
    <main className="flex flex-col App" id='dialog-target'>
      <header className="w-full absolute top-0 z-50 bg-transparent">
        <nav className="wrapper flex items-center justify-between py-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/icons/logo.png"
                alt="logo"
                className="w-10 h-10 rounded-full shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
              />
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold bg-gradient-to-r from-[#fdffff] via-[#86e7ff] to-[#f7dcf3] text-transparent bg-clip-text drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
              IDKWhatToDo
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => setDialogOpen(true)}
                  className="relative group"
                >
                  <div className="inset-0 rounded-full bg-gradient-to-r from-[#0b8ca3] to-[#f150dc] p-0.5 group-hover:p-1 transition-all duration-300">
                    <div className="rounded-full ">
                      <img
                        src={user.imageURL || "/images/usman.jpg"}
                        alt="user"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                  </div>
                </button>

                <div className="hidden lg:flex gap-3 items-center">
                  <Link
                    to="/dashboard"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-300 text-teal-950 transition-all duration-300 hover:scale-105">
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>

                <DialogComponent
                  ref={dialogInstance}
                  width='320px'
                  header=''
                  visible={isDialogOpen}
                  showCloseIcon={false}
                  isModal={true}
                  target='.App'
                  close={() => setDialogOpen(false)}
                  cssClass="custom-dialog"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="relative bg-gradient-to-br from-[#0b8ca3] via-[#06a0c7] to-[#f150dc] p-6 text-white">
                      <button
                        onClick={() => setDialogOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm p-1">
                            <img
                              src={user.imageURL || "/icons/user-placeholder.png"}
                              alt="user"
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-white truncate">
                            {user.name || 'User'}
                          </h3>
                          <p className="text-white/80 text-sm truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-white/70 font-medium uppercase tracking-wider">
                        Navigation Menu
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-blue-100"
                        onClick={() => setDialogOpen(false)}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white group-hover:scale-110 transition-transform duration-300">
                          <Home className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 group-hover:text-blue-700">Dashboard</div>
                          <div className="text-xs text-gray-500">View your progress</div>
                        </div>
                      </Link>

                      <div className="my-3 mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                      <button
                        onClick={() => {
                          setDialogOpen(false);
                          handleLogout();
                        }}
                        className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 border border-transparent hover:border-red-100 w-full"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 text-white group-hover:scale-110 transition-transform duration-300">
                          <LogOut className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-800 group-hover:text-red-700">Sign Out</div>
                          <div className="text-xs text-gray-500">Logout from account</div>
                        </div>
                      </button>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <div className="text-xs text-gray-400 text-center">
                        IDKWhatToDo © 2025
                      </div>
                    </div>
                  </div>
                </DialogComponent>
              </>
            ) : (
              <Link
                to="/login"
                className="group relative overflow-hidden px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f150dc] to-[#0b8ca3] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <section className="career-hero relative w-full">
        <div className="flex flex-col items-start justify-center w-full h-full px-4 sm:px-6 lg:px-8 py-50 md:py-50 sm:py-32 bg-linear-100 bg-cover bg-center">
          <article className="w-full max-w-[520px] space-y-4">
            <h1 className="text-white drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl font-bold">
              Discover Your Ideal Career Path
            </h1>
            <p className="text-white/90 text-base sm:text-lg font-medium">
              Based on your interests and skills, explore careers tailored just for you.
            </p>
          </article>

          <div className="mt-6">
            <Link to="#careers">
              <button
                type="button"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition duration-300 text-lg"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>


      <section className="pt-20 wrapper flex flex-col gap-12 h-full">
        <Headers title="Why Use CareerAI?" description="Get personalized career guidance with smart tools" />

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <img
            src="/images/dashboard.jpg"
            alt="Dashboard Preview"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Tailored Career Matches</h3>
                <p className="text-gray-600">We analyze your skills and interests to suggest the most relevant paths.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-pink-100 text-pink-600">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Smart Dashboard</h3>
                <p className="text-gray-600">Track your saved careers, explore resources.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Interactive Learning</h3>
                <p className="text-gray-600">Understand job roles better with detailed cards, skill trees, and trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper py-24 flex flex-col-reverse lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            Can't Find Your Career? <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Create One with AI
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Use our AI-powered tools to generate and define your own unique career path.
            Whether you're exploring new ideas or building from scratch, we've got your back.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <button
              type="button"
              onClick={() => navigate(user ? "/career/create" : "/login")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
            >
              Create Career with AI
            </button>
          </motion.div>
        </div>

        <div className="flex-1">
          <img
            src="/images/careercreate.png"
            alt="Create Career with AI"
            className="w-full rounded-2xl shadow-2xl object-cover h-[400px]"
          />
        </div>
      </section>


      <section id="careers" className="py-20 wrapper flex flex-col gap-10">
        <Headers title="Career Recommendations" description="Curated career suggestions just for you" />
        <div className="career-grid">
          {careers.map((career) => (
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
        <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={8}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4"
        />
      </section>

      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="wrapper footer-container flex flex-col md:flex-row items-center justify-between gap-6 py-6 md:py-0">

          {/* Logo and Name */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons/logo1.png" alt="logo" className="w-[30px] h-[30px]" />
            <h1 className="text-xl font-bold text-blue-900">
              IDKWhatToDo.<span className="text-purple-600">ai</span>
            </h1>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/dipunjab/IDKWhatToDo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/usmanghani-js/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-600 transition"
            >
              <Linkedin size={22} />
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-4 text-sm text-gray-500">
            {['Terms & Conditions', 'Privacy Policy'].map((item) => (
              <Link
                to="/"
                key={item}
                className="hover:text-indigo-600 transition whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>

        </div>
      </footer>

    </main>
  );
};


export default CareerHome;