import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | Full Bridge Digital",
  description: "Parlez-nous de votre projet digital. L’équipe Full Bridge vous répond rapidement.",
};

export default function Contact() {
  return (
    <>
      <ContactPage />
      <Footer />
    </>
  );
}
