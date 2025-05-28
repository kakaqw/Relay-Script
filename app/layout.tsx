import Provider from "./provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider>{children}</Provider>;
}
