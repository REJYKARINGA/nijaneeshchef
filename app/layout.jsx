import "./globals.css";

const DESC =
  "Nijaneesh, Assistant Manager (Dietary Department), Regional Cancer Centre, Medical College, Trivandrum. Business, hospitality and collaboration.";

export const metadata = {
  metadataBase: new URL("https://nijaneeshchef.vercel.app"),
  title: "NIJANEESH",
  openGraph: {
    title: "NIJANEESH",
    description: DESC,
    url: "/",
    siteName: "NIJANEESH",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Chef Nijaneesh in a black chef coat plating a dish" }],
  },
  twitter: { card: "summary_large_image", title: "NIJANEESH", description: DESC, images: ["/og-image.jpg"] },
  description:
    "Nijaneesh, Assistant Manager (Dietary Department), Regional Cancer Centre, Medical College, Trivandrum. Business, hospitality and collaboration.",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
