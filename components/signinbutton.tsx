import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInWithGoogleButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
    </div>
  );
}
