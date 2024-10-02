import Form from "@/components/Form";

function Page() {
  return (
    <>
      <section className="w-full bg-primary min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-bold text-white sm:text-[54px] text-[36px] max-w-5xl text-center my-5">
          Submit Your Startup Pitch
        </h1>
      </section>

      <Form />
    </>
  );
}

export default Page;
