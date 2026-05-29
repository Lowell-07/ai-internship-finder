import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InternMatch - AI Internship Finder",
  description: "AI-powered internship discovery platform. Upload your resume, chat with our assistant, and find your perfect role.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
