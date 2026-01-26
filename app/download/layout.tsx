import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "Download FiooTV App – iOS, Android, Android TV & Web Player",
  description: "Download FiooTV app for iOS, Android, Android TV, and Web Player. Compatible with all devices. Simple setup, fast servers, unlimited device access. Get started today!",
  keywords: ["FiooTV download", "IPTV app download", "streaming app", "Android TV app", "iOS IPTV", "IPTV player", "FiooTV app"],
  openGraph: {
    title: "Download FiooTV App – iOS, Android, Android TV & Web Player",
    description: "Download FiooTV app for iOS, Android, Android TV, and Web Player. Compatible with all devices. Simple setup, fast servers.",
    url: `${defaultUrl}/download`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Download FiooTV App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download FiooTV App – iOS, Android, Android TV & Web Player",
    description: "Download FiooTV app for iOS, Android, Android TV, and Web Player. Compatible with all devices.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/download`,
  },
};

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
