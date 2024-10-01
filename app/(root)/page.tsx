import { Search } from "lucide-react";

function Home() {
  return (
    <main className="">
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col">
        <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before-tri after-tri">
          Pitch, Vote and Grow
        </p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-bold text-white text-[54px] max-w-5xl text-center my-5">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-center">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <div className="max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5">
          <input
            className="flex-1 placeholder:font-bold placeholder:text-black w-full h-auto outline-none"
            placeholder="Search Startup"
          />

          <div className="size-[50px] rounded-full bg-black flex justify-center items-center">
            <Search className="size-[20px] text-white" />
          </div>
        </div>
      </section>

      <section className="px-5 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[30px] text-black">Explore Startups</p>
      </section>
    </main>
  );
}

export default Home;
