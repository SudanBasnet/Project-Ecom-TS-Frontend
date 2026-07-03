import Footer from "@/components/common/layout/footer/footer";
import Navbar from "@/components/common/layout/nav/navbar";

const AuthLayout = ({ children }: LayoutProps<"/auth">) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <div className="flex flex-1 flex-col overflow-x-hidden">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
