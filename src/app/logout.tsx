import { cookies } from "next/headers";
import React from "react";

const remove = () => {
  const cookieStore = cookies();

  cookieStore.delete("sessionToken");
  cookieStore.delete("next-auth.session-token");
  cookieStore.delete("next-auth.callback-url");
  cookieStore.delete("next-auth.csrf-token");
  cookieStore.delete("GoogleSessionEmail");
};

export default remove;
