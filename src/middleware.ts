import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl.pathname;
    var isAuth;

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
  matcher: ["/conversation/:path*", "/dashboard/:path*", "/:path*"],
};
