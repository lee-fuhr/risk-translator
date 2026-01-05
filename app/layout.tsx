import type { Metadata } from "next";
import "./globals.css";
import FeedbackWidget from "@/components/FeedbackWidget";

export const metadata: Metadata = {
  title: "Risk Translator | Turn technical specs into risk-justified decisions",
  description: "Help engineers justify technical decisions to purchasing managers using risk language. $150 one-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800;900&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script async src="https://plausible.io/js/pa-yMl5jQ4Lrwq6-JlvmjpSk.js"></script>
        <script dangerouslySetInnerHTML={{__html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}} />
      </head>
      <body>
        {children}
        <FeedbackWidget toolName="Risk Translator" />
      </body>
    </html>
  );
}
