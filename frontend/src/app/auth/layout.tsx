import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kakebo",
  description: "Gerenciamento financeiro pessoal inspirado no método japonês Kakebo",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex h-screen">
          {/* <Sidebar /> */}
          <div className="flex-1 flex flex-col">
            {/* <Header /> */}
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}