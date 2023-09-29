import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await NextResponse.json({
      message: `Successfully logged out`,
    });
    //setting as empty cookie
    res.cookies.delete("sessionToken");
    res.cookies.delete("next-auth.session-token");
    res.cookies.delete("next-auth.callback-url");
    res.cookies.delete("next-auth.csrf-token");
    res.cookies.delete("GoogleSessionEmail");
    return res;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
};
