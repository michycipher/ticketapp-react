import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Features from "../components/Features";
import CTA from "../components/Cta";


const LandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* hero section */}
      <section className="relative bg-[#7C3AED] text-white py-24 overflow-hidden">
        {/* Circles */}
        <div className="absolute top-[-200px] right-[-100px] w-[400px] h-[400px] bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-[50px] left-[-150px] w-[250px] h-[250px] bg-white opacity-5 rounded-full"></div>

        <div className="container relative text-center z-10">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            {/* Your All-in-One Ticketing Solution */}
            Book Anything. Go Anywhere.
          </h1>
          <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto">
            Book flights, concerts, events, and transportation seamlessly. One app
            for every journey and experience.
          </p>
          <div className="flex justify-center flex-wrap gap-6">
            <Link to="/auth/signup"
              className="px-10 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow-lg hover:-translate-y-1 transition-transform"
            >
              Get Started
            </Link>
            <a
              href="/signup"
              className="px-10 py-4 rounded-lg font-semibold text-blue-600 bg-white hover:-translate-y-1 transition-transform shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>

      </section>

      <svg
        className="absolute w-full rotate-180"
        viewBox="0 0 1920 150"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C320,120 640,20 960,64 C1280,108 1600,40 1920,64 L1920,150 L0,150 Z"
          fill="#7C3AED"
          className="animate-[waveMotion_3s_ease-in-out_infinite]"
        />
      </svg>


      {/* Main page */}
      <Features />
      <CTA />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default LandingPage