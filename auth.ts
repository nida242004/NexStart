import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const id = profile?.id;
      const login = profile?.login || "unknown_user";
      const bio = profile?.bio || "";
    
      if (!id) return false; // Prevent sign-in if ID is missing
    
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
    
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: `github-${id}`,
          name: user?.name || "Unknown",
          username: login,
          email: user?.email || "",
          image: user?.image || "",
          bio,
        });
      }
    
      return true;
    },
    
    async jwt({ token, account, profile }) {
      if (account && profile?.id) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });
    
        token.id = user?._id; // Fallback ID if user is not found
      }
    
      return token;
    },
    


    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});


// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";

// import { client } from "./sanity/lib/client";
// import { writeClient } from "@/sanity/lib/write-client";
// import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHubProvider({
//     clientId: process.env.AUTH_GITHUB_ID,
//     clientSecret: process.env.AUTH_GITHUB_SECRET,
//   })],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       // Check if the user exists in Sanity
//       const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//         id: profile?.id,
//       });

//       console.log({ existingUser, profile, user });

//       if (!existingUser) {
//         // User not found in Sanity, create a new user document
//         await writeClient.create({
//           _type: "author",
//           id: profile?.id,
//           name: user?.name,
//           username: profile?.login,
//           email: user?.email,
//           image: user?.image,
//           bio: profile?.bio || "",
//         });
//       }

//       // Return true to continue the sign-in process
//       return true;
//     },
//     async jwt({ token, account, profile }) {
//       // Add profile id to the JWT token on sign-in
//       if (account && profile) {
//         // get the user from sanity
//         const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//           id: profile?.id,
//         });

//         // Extend the token with the GitHub profile id
//         token.id = user._id || profile.id;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // Pass the profile id from the token to the session
//       Object.assign(session, { id: token.id });
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET,
//   debug: true,
// });
