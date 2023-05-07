import { useSession, signIn, signOut } from "next-auth/react";

export default function AccessToken() {
  const { data } = useSession();

  return <div>Access Token: {data}</div>;
}
