import { type SchemaTypeDefinition } from "sanity";

import { idea } from "@/sanity/schemaTypes/idea";
import { author } from "@/sanity/schemaTypes/author";
import { playlist } from "@/sanity/schemaTypes/playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, idea, playlist],
};
