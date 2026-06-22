import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalScrollBadge from "@/components/layout/GlobalScrollBadge";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Bridge Digital | Bridging Business & Technology",
  description: "Des solutions digitales modernes conçues pour faire croître les organisations grâce à la technologie. Services sur-mesure en développement Web, applications Mobiles, solutions SaaS, CRM, et Intégration IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#0F172A]">
        {children}
        <GlobalScrollBadge />
        {/* Global SVG clipPaths definitions to prevent browser reference loss during HMR or page transitions */}
        <svg width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <defs>
            <clipPath id="hero-mobile-clip" clipPathUnits="objectBoundingBox">
              <path d="M0.85,0 H0.95 A0.05,0.03,0,0,1,1,0.03 V0.97 A0.05,0.03,0,0,1,0.95,1 H0.05 A0.05,0.03,0,0,1,0,0.97 V0.35 A0.05,0.03,0,0,1,0.05,0.32 H0.39 A0.05,0.03,0,0,0,0.44,0.29 V0.27 A0.05,0.03,0,0,1,0.49,0.24 H0.51 A0.05,0.03,0,0,0,0.56,0.21 V0.19 A0.05,0.03,0,0,1,0.61,0.16 H0.63 A0.05,0.03,0,0,0,0.68,0.13 V0.11 A0.05,0.03,0,0,1,0.73,0.08 H0.75 A0.05,0.03,0,0,0,0.8,0.05 V0.03 A0.05,0.03,0,0,1,0.85,0 Z" />
            </clipPath>
            <clipPath id="clip" clipPathUnits="objectBoundingBox">
              <path d="M0.0235,0H0.6235A0.0235,0.04,0,0,1,0.6471,0.04V0.06A0.0235,0.04,0,0,0,0.6706,0.1H0.9765A0.0235,0.04,0,0,1,1,0.14V0.96A0.0235,0.04,0,0,1,0.9765,1H0.0235A0.0235,0.04,0,0,1,0,0.96V0.44A0.0235,0.04,0,0,1,0.0235,0.4H0.0353A0.0235,0.04,0,0,0,0.0588,0.36V0.04A0.0235,0.04,0,0,1,0.0824,0" />
            </clipPath>
            <clipPath id="clip-mobile" clipPathUnits="objectBoundingBox">
              <path d="M0.0571,0H0.9429A0.0571,0.0286,0,0,1,1,0.0286V0.9A0.0571,0.0286,0,0,1,0.9429,0.9286H0.4857A0.0571,0.0286,0,0,0,0.4286,0.9571V0.9714A0.0571,0.0286,0,0,1,0.3714,1H0.0571A0.0571,0.0286,0,0,1,0,0.9714V0.3143A0.0571,0.0286,0,0,1,0.0571,0.2857H0.0571A0.0571,0.0286,0,0,0,0.1143,0.2571V0.0286A0.0571,0.0286,0,0,1,0.1714,0" />
            </clipPath>
          </defs>
        </svg>
      </body>
    </html>
  );
}
