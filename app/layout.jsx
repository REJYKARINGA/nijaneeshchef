import "./globals.css";

export const metadata = {
  title: "NIJANEESH",
  description:
    "Nijaneesh, Assistant Manager (Dietary Department), Regional Cancer Centre, Medical College, Trivandrum. Business, hospitality and collaboration.",
  icons: {
    icon: "https://www.nijaneeshchef.com/wp-content/uploads/2024/10/cropped-WhatsApp-Image-2024-10-26-at-9.34.26-AM-270x270.jpeg",
  },
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
