import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {

  try {

    const token = req.cookies.get("access_token")?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

    // usuario nao autenticado
    if (!token && !isAuthPage) {

      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    // usuario autenticado tentando acessar login/register
    if (token && isAuthPage) {

      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();

  } catch {

    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/movimentacoes/:path*",
    "/graficos/:path*",
    "/relatorios/:path*",
    "/auth/:path*"
  ],
};