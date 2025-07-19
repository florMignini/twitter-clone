"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return <>{children}</>;
}
