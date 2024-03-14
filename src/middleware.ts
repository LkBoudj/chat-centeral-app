import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { conversations_page } from "./lib/configs/routes_name";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl.pathname;
    const role = token?.user.roles?.toLowerCase();
    var isAuth;
    if (
      url.startsWith("/dashboard") &&
      !["admin", "superadmin"].includes(role)
    ) {
      return NextResponse.rewrite(
        new URL(conversations_page, "http://localhost:3000/chat")
      );
    }

    // if (url.startsWith("/chat") && token?.user.roles) {
    //   const roles = req.nextauth.token?.user.roles;
    //   // roles.forEach((role: Role) => {
    //   //   isAuth = role.permission.find(
    //   //     (permission: Permission) => permission.name == "loginDashboard"
    //   //   );
    //   // });
    //   console.log(roles);

    //   if (!isAuth) {
    //     return NextResponse.rewrite(new URL("/chat", req.url));
    //   }
    // }
    //   return NextResponse.rewrite(
    //     new URL("/auth/login?message=You Are Not Authorized!", req.url)
    //   );
    // if (
    //   req.nextUrl.pathname.startsWith("/user") &&
    //   req.nextauth.token?.role !== "user"
    // )
    //   return NextResponse.rewrite(
    //     new URL("/auth/login?message=You Are Not Authorized!", req.url)
    //   );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: [
    "/chat/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/prompts/:path*",
  ],
};
