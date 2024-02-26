//home, create, activities, messages, friends
import {
  HomeIcon,
  PlusCircledIcon,
  HeartIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <nav className="fixed px-2 flex py-3 w-11/12 max-w-8xl shadow-lg bg-accent-black opacity-90 z-50 bottom-6">
        <Menubar className="border-0 w-full flex justify-around items-center bg-transparent">
          <MenubarMenu>
            <MenubarTrigger className="focus:bg-transparent focus:opacity-60 hover:opacity-60">
              <Link href="./">
                <div className="flex flex-row items-center justify-center">
                  <HomeIcon />
                  <span className="ml-2 hidden md:block">Home</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="focus:bg-transparent focus:opacity-60 hover:opacity-60">
              <Link href="./create">
                <div className="flex flex-row items-center justify-center">
                  <PlusCircledIcon />
                  <span className="ml-2 hidden md:block">Create</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="focus:bg-transparent focus:opacity-60 hover:opacity-60">
              <Link href="./activities">
                <div className="flex flex-row items-center justify-center">
                  <HeartIcon />
                  <span className="ml-2 hidden md:block">Activities</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="focus:bg-transparent focus:opacity-60 hover:opacity-60">
              <Link href="./messages">
                <div className="flex flex-row items-center justify-center">
                  <ChatBubbleIcon />
                  <span className="ml-2 hidden md:block">Messages</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="focus:bg-transparent focus:opacity-60 hover:opacity-60">
              <Link href="./friends">
                <div className="flex flex-row items-center justify-center">
                  <PersonIcon />
                  <span className="ml-2 hidden md:block">Friends</span>
                </div>
              </Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="w-fit focus:bg-accent-black data-[state=open]:bg-accent-black">
              <DotsVerticalIcon />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Saved <MenubarShortcut>⌘S</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Settings <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Logout <MenubarShortcut>⌘X</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </nav>
    </>
  );
};

export default Sidebar;
