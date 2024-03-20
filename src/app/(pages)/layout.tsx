import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" w-full max-w-7xl mx-auto" id="Layout">
        <div className="relative scroll-smooth scroll-m-0">
          <div>
            <Header />
          </div>
          {children}
          <div className="flex items-center w-full justify-center">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default layout;
