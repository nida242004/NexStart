import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Startups")
    .items([
      S.documentTypeListItem("idea").title("Ideas"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("playlist").title("Playlists"),
    ]);
