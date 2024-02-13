"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Cormorant_Unicase } from "next/font/google";

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
      <main className="w-full flex items-center justify-between p-9 gap-6">
        <div className="">
          <h1
            id="logo"
            className={`text-3xl font-black ${cormorant.className}`}
          >
            socialize
          </h1>
        </div>
        <div className="w-[50%] flex items-center">
          <label className="hidden" htmlFor="search">
            search
          </label>
          <span className="absolute pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              opacity={0.6}
              viewBox="0 0 24 24"
              strokeWidth="0.7"
              stroke="#FFFAFF"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
          <input
            type="text"
            name="search"
            placeholder="search..."
            className="w-full bg-transparent px-12 py-2 rounded-2xl outline outline-[1px] outline-accent-green"
            id="search"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
          <h3 className="font-secondary text-lg">{displayName}</h3>
        </div>
      </main>
    </>
  );
};

export default Header;
