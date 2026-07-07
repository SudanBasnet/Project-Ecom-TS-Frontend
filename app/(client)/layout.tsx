import StoreChatbot from "@/components/common/chat/store-chatbot";
import Footer from "@/components/common/layout/footer/footer";
import Navbar from "@/components/common/layout/nav/navbar";
import PageTransition from "@/components/common/ui/page-transition";

const StoreLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <PageTransition className="flex flex-1 flex-col overflow-x-hidden">
        {children}
      </PageTransition>
      <Footer />
      <StoreChatbot />
    </div>
  );
};

export default StoreLayout;
