import { defineQuery } from "next-sanity";

export const IDEAS_QUERY =
  defineQuery(`*[_type == "idea" && defined(slug.current)][0...12]{
  _id, 
  title, 
  slug, 
  _createdAt,
  author->{
    name,
    slug,
    image,
    bio
  }, 
  description, 
  category, 
  image, 
}`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  email,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    title,
    slug,
    author->{
      name,
      slug,
      image,
      bio
    },
    description,
    category,
    image,
    pitch
  }
}`);
