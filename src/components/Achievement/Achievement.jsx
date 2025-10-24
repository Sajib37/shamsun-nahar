import AchivementCards from "./AchivementCards";

const Achievement = () => {
  return (
    <section className="section-padding pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto ">
        <div className=" mx-auto ">
          <h1 className=" font-bold  lg:text-6xl md:text-4xl text-3xl text-center">
            Achievements
          </h1>
        </div>

        <div className="lg:w-[85%] mx-auto mt-4 md:mt-8 lg:mt-10">
          <AchivementCards />
        </div>
      </div>
    </section>
  );
};

export default Achievement;
