import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    const data = await req.json();

    const { name, username, avatarUrl, links, typeUser } = data;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        avatarUrl,
        firstLogin: false,
        typeUser,
        links: {
          create: links,
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[UPDATE_USER]", error);
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
