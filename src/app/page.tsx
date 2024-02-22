import Header from "./components/Header";
import Main from "./components/Main";
import Messages from "./components/Messages";
import Notification from "./components/Notification";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <>
      {/* childer start */}
      <div className="flex items-start gap-7 w-full p-4 md:pt-9 md:px-8 ">
        <Main />
        <div className="hidden md:block">
          <Notification />
          <Messages />
        </div>
      </div>
      {/* childer end */}
    </>
  );
}
