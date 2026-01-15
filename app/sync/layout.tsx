import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Channel Sync - Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SyncLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <div className="container mx-auto px-4 py-20 md:py-[160px] max-w-7xl">
      {children}
    </div>
  </>;
}
