import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  JsonLd,
  localBusinessSchema,
  websiteSchema,
} from "@/components/json-ld";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
