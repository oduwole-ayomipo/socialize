import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MenubarSeparator } from "@/components/ui/menubar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const notifications = [
  {
    title: "__ayooo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi scing elit, ut labore et dolore...",
    date: "3d",
    img: "https://avatar.iran.liara.run/public/1",
  },
  {
    title: "miguels",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium,",
    date: "3d",
    img: "https://avatar.iran.liara.run/public/2",
  },
  {
    title: "yk_",
    description:
      "At vero eos et accusamus et iusto odio dignissimos praesentium voluptatum delenit",
    date: "4d",
    img: "https://avatar.iran.liara.run/public/3",
  },
  {
    title: "__ayooo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi scing elit, ut labore et dolore...",
    date: "5d",
    img: "https://avatar.iran.liara.run/public/4",
  },
  {
    title: "miguels",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium,",
    date: "5d",
    img: "https://avatar.iran.liara.run/public/5",
  },
  {
    title: "__ayooo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi scing elit, ut labore et dolore...",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/6",
  },
  {
    title: "miguels",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium,",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/7",
  },
  {
    title: "yk_",
    description:
      "At vero eos et accusamus et iusto odio dignissimos praesentium voluptatum delenit",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/8",
  },
  {
    title: "__ayooo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi scing elit, ut labore et dolore...",
    date: "2w",
    img: "https://avatar.iran.liara.run/public/9",
  },
  {
    title: "miguels",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium,",
    date: "2w",
    img: "https://avatar.iran.liara.run/public/10",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const Messages = ({ className, ...props }: CardProps) => {
  return (
    <Card
      className={cn("w-[380px] mb-11 bg-accent-black border-0", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="pb-3">Messages</CardTitle>
        <MenubarSeparator />
      </CardHeader>
      <CardContent className="grid h-80 gap-4">
        <ScrollArea>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid self-center grid-cols-[3rem_1fr] gap-4 py-3 px-2 cursor-pointer last:mb-0 last:pb-0 hover:bg-accent"
            >
              <div className="w-12 h-12 bg-accent-black rounded-full flex items-center">
                <img src={notification.img} alt="avatar" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-xs text-muted-foreground opacity-60">
                      {notification.date}
                    </p>
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Messages;
