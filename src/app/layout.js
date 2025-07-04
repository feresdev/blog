import { Inter, Manrope } from 'next/font/google'
import "@/styles/globals.css";
import IsToaster from '@/components/IsToaster'
import { AuthProvider } from "@/context/AuthContext"

const inter = Inter({
  weight: ['600', '700'],
  subsets: ['latin']
})

const manrope = Manrope({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: "Blog",
  description: "En mejor Blog",
};

export default function RootLayout({children}) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${manrope.className} antialiased`}>
        <AuthProvider>
            {children}
            <IsToaster />
        </AuthProvider>
      </body>
    </html>
  );
}
