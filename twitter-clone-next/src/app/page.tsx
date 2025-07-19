"use client";

import ProtectedRoute from "./components/ProtectedRoute";
import Feed from "./components/Feed";


export default function HomePage() {
  return (
    <ProtectedRoute>
      <Feed />
    </ProtectedRoute>
  );
}
