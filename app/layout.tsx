import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Respawn Østfold — MCSR Ranked Cash Prize Tournament",
  description: "Østfolds første Minecraft esports-turnering. MCSR Ranked speedrun-format, cash prize og livestreamet på Twitch fra Glemmen VGS, Fredrikstad.",
  keywords: ["Respawn Østfold", "MCSR Ranked", "Minecraft speedrun", "esports", "Glemmen VGS", "Fredrikstad", "cash prize tournament"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className="dark">
      <body>{children}</body>
    </html>
  );
}
