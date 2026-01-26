import type { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || "https://www.fiootv.com";

export const metadata: Metadata = {
  title: "TV Channels List – FiooTV | Browse 4000+ Live TV Channels",
  description: "Browse FiooTV's complete list of 4000+ live TV channels. Search by category, genre, or channel name. Sports, news, entertainment, movies, and more in multiple languages.",
  keywords: ["TV channels", "live TV channels", "IPTV channels", "channel list", "TV guide", "streaming channels", "FiooTV channels"],
  openGraph: {
    title: "TV Channels List – FiooTV | Browse 4000+ Live TV Channels",
    description: "Browse FiooTV's complete list of 4000+ live TV channels. Search by category, genre, or channel name.",
    url: `${defaultUrl}/channels`,
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "FiooTV TV Channels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TV Channels List – FiooTV | Browse 4000+ Live TV Channels",
    description: "Browse FiooTV's complete list of 4000+ live TV channels. Search by category, genre, or channel name.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: `${defaultUrl}/channels`,
  },
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
