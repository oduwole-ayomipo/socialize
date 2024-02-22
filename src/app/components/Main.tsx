//home, create, activities, messages, friends
"use client";
import {
  HeartIcon,
  LoopIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  Share1Icon,
  BookmarkIcon,
  BarChartIcon,
} from "@radix-ui/react-icons";
import {
  Menubar,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const notifications = [
  {
    title: "__ayooo",
    description:
      "Hey there! I'm an avid traveler and photographer, capturing moments from around the world. Follow along for travel tips, stunning photography, and adventure stories!",
    date: "2d",
    img: "https://avatar.iran.liara.run/public/1",
    postSubject: "Exciting News!",
    postContent:
      "Just landed my dream job! Feeling grateful and excited for the new journey ahead. Can't wait to dive into exciting projects and meet amazing colleagues. Let's do this!",
  },
  {
    title: "miguels",
    postSubject: "Exciting News!",
    postContent:
      "🎨 Artist & Designer 🖌️ Exploring the intersection of art, technology, and culture. Check out my latest creations and behind-the-scenes process!",
    date: "2d",
    img: "https://avatar.iran.liara.run/public/2",
  },
  {
    title: "yk_",
    postSubject: "Exciting News!",

    postContent:
      "🎵 Music enthusiast and aspiring DJ 🎧 Sharing my favorite tracks, mixing tips, and upcoming gigs. Let's vibe together!",
    date: "3d",
    img: "https://avatar.iran.liara.run/public/3",
  },
  {
    title: "__ayooo",
    postSubject: "Exciting News!",

    postContent:
      "Exploring the culinary world, one dish at a time! 🍜 Join me on my foodie adventures, from street food to fine dining experiences.",
    date: "4d",
    img: "https://avatar.iran.liara.run/public/4",
  },
  {
    title: "miguels",
    postSubject: "Exciting News!",

    postContent:
      "📚 Bookworm & Literature lover 📖 Sharing book recommendations, insightful quotes, and thoughts on the latest reads. Let's dive into the world of words together!",
    date: "4d",
    img: "https://avatar.iran.liara.run/public/5",
  },
  {
    title: "__ayooo",
    postSubject: "Exciting News!",

    postContent:
      "Fitness enthusiast & Wellness advocate 💪 Sharing workout routines, healthy recipes, and tips for a balanced lifestyle. Let's sweat it out!",
    date: "5d",
    img: "https://avatar.iran.liara.run/public/6",
  },
  {
    title: "miguels",
    postSubject: "Exciting News!",

    postContent:
      "Tech geek & Gadgets aficionado 🚀 Exploring the latest in tech, gadgets, and innovation. Stay updated with the tech world's buzz!",
    date: "6d",
    img: "https://avatar.iran.liara.run/public/7",
  },
  {
    title: "yk_",
    postSubject: "Exciting News!",

    postContent:
      "🎮 Gaming enthusiast & Streamer 🕹️ Join me for gaming sessions, reviews, and discussions on the latest releases. Let's level up together!",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/8",
  },
  {
    title: "__ayooo",
    postSubject: "Exciting News!",

    postContent:
      "🌱 Nature lover & Environmental advocate 🌿 Sharing my passion for nature, sustainable living tips, and conservation efforts. Let's protect our planet together!",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/9",
  },
  {
    title: "miguels",
    postSubject: "Exciting News!",

    postContent:
      "🌍 Travel blogger & Adventure seeker 🌄 Embark on thrilling journeys, discover hidden gems, and get inspired to explore the world!",
    date: "1w",
    img: "https://avatar.iran.liara.run/public/10",
  },
];

type CardProps = React.ComponentProps<typeof Card>;

const Main = ({ className, ...props }: CardProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="w-full md:w-3/4 md:max-w-3/4">
      {notifications.map((notification, index) => (
        <Card
          key={index}
          className={cn(
            "w-full mb-3 md:mb-6 bg-accent-black border-0",
            className
          )}
          {...props}
        >
          <CardHeader>
            <CardTitle>
              <div className="flex items-center justify-between">
                <div className="mb-2 grid self-center grid-cols-[2rem_1fr] gap-3 p-2 cursor-pointer last:mb-0 last:pb-0">
                  <div className="w-8 h-8 bg-accent-black rounded-full flex items-center">
                    <Image src={notification.img} alt="avatar" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center h-full justify-between">
                      <p className="text-sm font-medium leading-none hover:border-b-2">
                        {notification.title}
                      </p>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <DotsVerticalIcon className="w-5 h-5 cursor-pointer hover:opacity-60" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem className="text-red-700 font-bold hover:text-red-700 hover:font-bold cursor-pointer">
                      Report
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Not Interested
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Cancel
                    </DropdownMenuItem>
                    <MenubarSeparator />
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardTitle>
            <MenubarSeparator />
          </CardHeader>
          <CardContent className="flex justify-between flex-col">
            <div className="px-2">
              <p className="text-sm pb-3 font-bold text-muted-foreground">
                {notification.postSubject}
              </p>
              <p className="text-sm pb-5 text-muted-foreground">
                {notification.postContent}
                <span className=" ml-2 text-xs text-muted-foreground opacity-50">
                  {notification.date}
                </span>
              </p>
            </div>
            <div className="flex items-center flex-col justify-center mb-4">
              <Carousel setApi={setApi} className="w-full max-w-lg">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-0">
                        <CardContent className="flex aspect-square w-full items-center justify-center p-6">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                {current} of {count}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-center mb-4 w-full">
              <MenubarSeparator />
              <Menubar className="border-0 bg-transparent ">
                <MenubarMenu>
                  <MenubarTrigger className="focus:bg-transparent hover:opacity-60">
                    <HeartIcon />
                    <span className="ml-2 text-xs lg:text-sm">1k</span>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="focus:bg-transparent hover:opacity-60">
                    <ChatBubbleIcon />
                    <span className="ml-2 text-xs lg:text-sm">64</span>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="focus:bg-transparent hover:opacity-60">
                    <BarChartIcon />
                    <span className="ml-2 text-xs lg:text-sm">23k</span>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="focus:bg-transparent hover:opacity-60">
                    <LoopIcon />
                    <span className="ml-2 text-xs lg:text-sm">13</span>
                  </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger className="focus:bg-transparent hover:opacity-60">
                    <Share1Icon />
                    <span className="ml-2 text-xs lg:text-sm">10</span>
                  </MenubarTrigger>
                </MenubarMenu>
              </Menubar>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Main;
