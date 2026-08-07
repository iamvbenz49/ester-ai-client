export { auth as proxy } from "@/auth.edge";

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
