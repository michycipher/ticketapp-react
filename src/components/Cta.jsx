const CTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-500 text-white p-16 rounded-2xl text-center shadow-2xl overflow-hidden">
          <div className="absolute w-[300px] h-[300px] bg-white opacity-10 rounded-full top-[-150px] right-[-100px]"></div>

          <h2 className="text-4xl font-extrabold mb-6 relative z-10">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 relative z-10">
            Join thousands of happy users booking their tickets with Tix.
          </p>
          <a
            href="/auth/signup"
            className="px-10 py-4 rounded-lg font-semibold text-blue-600 bg-white hover:-translate-y-1 transition-transform inline-block relative z-10 shadow-lg"
          >
            Create Free Account
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
