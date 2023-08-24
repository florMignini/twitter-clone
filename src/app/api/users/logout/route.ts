import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await NextResponse.json({
      message: `Successfully logged out`,
    });
    //setting as empty cookie
    res.cookies.delete("sessionToken");
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
