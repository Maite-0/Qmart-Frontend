"use client"
import { Inter } from "next/font/google";
import { SheduleProvider } from "./services/providers/sheduleProvider";
import { GameresultProvider } from "./services/providers/gameResultsProvider";
import { ProfileProvider } from "./services/providers/playerProfileProvider";
import React from "react";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SheduleProvider>
      <GameresultProvider>
        <ProfileProvider>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </ProfileProvider>
      </GameresultProvider>
    </SheduleProvider>
  );
}
