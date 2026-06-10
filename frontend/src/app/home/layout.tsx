import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Logout from "../../components/Logout";
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

export default function HomeLayout({
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
            <main className="flex-1 overflow-auto p-16">{children}</main>
          </div>
        </div>
        <Logout />
      </body>
    </html>
  );
}