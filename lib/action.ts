"use server";

import { auth } from "@/auth";
import slugify from "slugify";

import { client } from "@/sanity/lib/client";
import { server } from "@/sanity/lib/server";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";

export const createIdea = async (state: any, form: FormData, pitch: string) => {
  const session = await auth();

  if (!session) {
    return JSON.parse(
      JSON.stringify({
        error: "Not signed in",
        status: "ERROR",
      }),
    );
  }

  const formData = {
    title: form.get("title"),
    description: form.get("description"),
    category: form.get("category"),
    image: form.get("link"),
  };

  try {
    const authorRefId = await client.fetch(AUTHOR_BY_ID_QUERY, {
      // @ts-ignore
      id: session?.id,
    });

    if (!authorRefId) {
      return {
        ...formData,
        error: "Author not found",
        status: "ERROR",
      };
    }

    const slug = slugify(formData?.title as string, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
    });

    const idea = {
      ...formData,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: authorRefId._id,
      },
      pitch,
    };

    const result = await server.create({
      _type: "idea",
      ...idea,
    });

    return JSON.parse(
      JSON.stringify({
        ...result,
        error: "",
        status: "SUCCESS",
      }),
    );
  } catch (error) {
    console.log("Error", error);

    return JSON.parse(
      JSON.stringify({
        error: JSON.stringify(error) || "Unknown error",
        status: "ERROR",
      }),
    );
  }
};
