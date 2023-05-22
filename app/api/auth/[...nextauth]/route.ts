import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import NextAuth, { AuthOptions, SessionOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
console.log(process.env.GOOGLE_ID);
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      if (session.user) {
        session.user.id = sessionUser?._id.toString();
      }
      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectToDatabase();

        //check if user exists
        const userExists = await User.findOne({ email: profile.email });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
