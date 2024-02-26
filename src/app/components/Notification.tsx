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
    title: "__ayooo and 17 others ",
    description: "liked your story.",
    date: "3d",
    img: "https://avatar.iran.liara.run/public/1",
  },
  {
    title: "miguels and 2 others",
    description: "started following you.",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/2",
  },
  {
    title: "yk_ and _the_real_manda",
    description: "commented on your post",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/3",
  },
  {
    title: "follow __ayooo, yk__",
    description: "and others you know to see their photos and videos.",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/4",
  },
  {
    title: "otimmy.i",
    description: "started following you",
    date: "2w",
    img: "https://avatar.iran.liara.run/public/5",
  },
  {
    title: "miguels and 2 others ",
    description: "started following you.",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/2",
  },
  {
    title: "yk_ and _the_real_manda",
    description: "commented on your post",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/3",
  },
  {
    title: "follow __ayooo, yk__",
    description: "and others you know to see their photos and videos.",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/4",
  },
  {
    title: "otimmy.i",
    description: "started following you",
    date: "2w",
    img: "https://avatar.iran.liara.run/public/5",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const Notification = ({ className, ...props }: CardProps) => {
  return (
    <Card
      className={cn("w-[380px] mb-6 bg-accent-black border-0", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="pb-3"> Notification</CardTitle>
        <MenubarSeparator />
      </CardHeader>
      <CardContent className="grid h-80 gap-4">
        <ScrollArea>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid self-center grid-cols-[1.8rem_1fr] gap-4 py-3 px-2 cursor-pointer last:mb-0 last:pb-0 hover:bg-accent"
            >
              <div className="w-8 h-8 bg-accent-black rounded-full flex items-center">
                <img src={notification.img} alt="avatar" />
              </div>
              <div className="space-y-1 h-full flex items-center">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}{" "}
                    <span className="text-xs text-muted-foreground">
                      {notification.description}
                    </span>{" "}
                    <span className="text-xs text-right text-muted-foreground opacity-60">
                      {notification.date}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Notification;
