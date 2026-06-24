import StoreChatbot from "@/components/common/chat/store-chatbot";
import Footer from "@/components/common/layout/footer/footer";
import Navbar from "@/components/common/layout/nav/navbar";

const StoreLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1 flex-col overflow-x-hidden">{children}</div>
      <Footer />
      <StoreChatbot />
    </div>
  );
};

export default StoreLayout;
