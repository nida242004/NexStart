import Explore from "@/components/Explore";
import SearchForm from "@/components/SearchForm";

async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).query as string;

  return (
    <>
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative before-tri after-tri">
          Pitch, Vote and Grow
        </p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-bold text-white sm:text-[54px] text-[36px] max-w-5xl text-center my-5">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-center">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm />
      </section>

      <section className="px-5 py-10 max-w-7xl mx-auto">
        <p className="font-semibold text-[30px] text-black">Explore Startups</p>

        <Explore query={query} />
      </section>
    </>
  );
}

export default Home;
