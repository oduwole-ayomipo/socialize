"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { db } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Cormorant_Unicase } from "next/font/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const cormorant = Cormorant_Unicase({ weight: ["700"], subsets: ["latin"] });
const Header = () => {
  const { currentUser } = useAuthContext();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "userProfile", currentUser.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const name = docSnap.data().username;
          setDisplayName(name);
        } else {
          toast.error("Data not set");
        }
      } catch (err: any) {
        toast.error(err.code);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  return (
    <>
      <header className="w-full sticky top-0 z-[9999] h-24 flex items-center p-4 pb-8 md:pt-7 md:p-8 justify-between gap-6">
        <Link href="./">
          <h1
            id="logo"
            className={`text-3xl font-black cursor-pointer ${cormorant.className}`}
          >
            socialize
          </h1>
        </Link>
        <div className="w-[50%] flex items-center border px-3 bg-black">
          <MagnifyingGlassIcon className="h-5 w-5 opacity-45" />
          <Input placeholder="search..." className="focus-visible:ring-0" />
        </div>
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://avatar.iran.liara.run/public/55" />
            <AvatarFallback>RE</AvatarFallback>
          </Avatar>

          <h3 className="ml-2 uppercase text-sm hidden md:block">
            {displayName}
          </h3>
        </div>
      </header>
    </>
  );
};

export default Header;
