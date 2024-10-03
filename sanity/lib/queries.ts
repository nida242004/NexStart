import { defineQuery } from "next-sanity";

export const IDEAS_QUERY =
  defineQuery(`*[_type == "idea" && defined(slug.current)] | order(_createdAt desc){
  _id, 
  title, 
  slug, 
  _createdAt,
  author->{
    _id,
    name,
    slug,
    image,
    bio
  }, 
  description, 
  category, 
  image, 
}`);

export const IDEA_BY_ID_QUERY =
  defineQuery(`*[_type == "idea" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author->{
    _id,
    name,
    slug,
    image,
    bio
  },
  views,
  description,
  category,
  image,
  pitch
}`);

export const AUTHOR_BY_ID_QUERY =
  defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const AUTHOR_BY_GITHUB_ID_QUERY =
  defineQuery(`*[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
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

export const IDEAS_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "idea" && author._ref == $id]{
  _id, 
  title, 
  slug, 
  _createdAt,
  author->{
    _id,
    id,
    name,
    slug,
    image,
  }, 
  description, 
  category, 
  image, 
}`);

export const SEARCH_QUERY = defineQuery(
  `*[_type == "idea" && (title match $search || category match $search || author->name match $search)][0...12]{
  _id, 
  title, 
  slug, 
  _createdAt,
  author->{
    _id,
    name,
    slug,
    image,
  }, 
  description, 
  category, 
  image, 
}`,
);
