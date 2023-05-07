import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
// import { NextAuthOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    res.send({
      content: "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
};

// const authOptions: NextAuthOptions = {
//   // your NextAuth options here
// };
