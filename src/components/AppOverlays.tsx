import { useLocation } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ChatBot from "@/components/ChatBot";

/**
 * Site-wide floating widgets.
 * These should not appear on admin routes to avoid covering forms/pages.
 */
const AppOverlays = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) return null;

  return (
    <>
      <WhatsAppButton />
      <ScrollToTop />
      <ChatBot />
    </>
  );
};

export default AppOverlays;
