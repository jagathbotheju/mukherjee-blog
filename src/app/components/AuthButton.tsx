"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const AuthButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="absolute top-0 bottom-0 w-full h-full bg-slate-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {session && session.user ? (
        <div className="flex items-center gap-2">
          <p>{session.user.name}</p>
          <button className="btn btn-secondary" onClick={() => signOut()}>
            LogOut
          </button>
        </div>
      ) : (
        <>
          <button
            className="btn btn-secondary"
            onClick={() => signIn("github")}
          >
            LogIn
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButton;
