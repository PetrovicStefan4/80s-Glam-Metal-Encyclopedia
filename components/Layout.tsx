import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
