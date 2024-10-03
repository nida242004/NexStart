"use client";

import { redirect } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { ExternalLink } from "lucide-react";
import { useState, useActionState } from "react";

import { createIdea } from "@/lib/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const StartupForm = () => {
  const [pitch, setPitch] = useState("");

  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await createIdea(prevState, formData, pitch);
      if (result.status == "SUCCESS") redirect(`/idea/${result._id}`);

      return result;
    },
    {
      title: "",
      description: "",
      category: "",
      link: "",
      error: "",
      status: "IDEAL",
    },
  );

  return (
    <form
      action={formAction}
      className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6"
    >
      <div>
        <label
          htmlFor="title"
          className="font-bold text-[18px] text-black uppercase"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
          required
          placeholder="JSM Academy Masterclasss"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="font-bold text-[18px] text-black uppercase"
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300"
          rows={5}
          required
          placeholder="Short description of your startup idea"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="font-bold text-[18px] text-black uppercase"
        >
          Category
        </label>
        <Input
          id="category"
          name="category"
          required
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
          placeholder="Choose a category (e.g., Tech, Health, Education, etc.)"
        />
      </div>

      <div>
        <label
          htmlFor="link"
          className="font-bold text-[18px] text-black uppercase"
        >
          Image link
        </label>
        <Input
          id="link"
          name="link"
          type="url"
          className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300"
          required
          placeholder="Paste a link to your demo or promotional media"
        />
      </div>

      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] text-black uppercase"
        >
          Pitch
        </label>

        <MDEditor
          id="pitch"
          value={pitch}
          preview="edit"
          height={300}
          onChange={(value) => setPitch(value as string)}
          className="mt-3 border-[3px] border-black text-[18px] text-black font-semibold placeholder:text-black-300"
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves ",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary border-[4px] border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]"
      >
        <ExternalLink className="w-6 h-6 mr-2" />
        {isPending ? "Submitting..." : "Submit Your Pitch"}
      </Button>
    </form>
  );
};

export default StartupForm;
