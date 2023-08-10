"use client";
import Link from "next/link";
import poker from "../app/poker.png";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/Button";
import { useSession, signOut, signIn, getSession } from "next-auth/react";
import Avatar from "@/components/Avatar";
import { GetServerSidePropsContext } from "next";

import React, { useState } from "react";
import { ModeToggle } from "@/components/DarkModeToggle";
import { SheetSide } from "@/components/SideSheet";

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const user = session?.user;
  return (
    <div className="h-fit bg-zinc-100 border-zinc-300 z-[10] py-2 ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Image src={poker} alt="poker" className=" w-10 h-10 sm:h-6 sm:w-6" />{" "}
          <p
            className="hidden text-gray-900
         text-sm font-bold md:block"
          >
            {" "}
            Poker Club
          </p>
        </Link>

        {/* search bar */}
        <nav
          className={"flex text-sm gap-4 text-gray-900 font-bold items-center "}
        >
          <section
            className={"MOBILE-MENU md:hidden md:block hover:cursor-pointer"}
          >
            <SheetSide />
          </section>
          <section className="DESKTOP-MENU flex gap-2 md:block hidden">
            <div className={"flex gap-2"}>
            <Link
              href="/about"
              className="hover:bg-gray-200 text-gray-900 font-bold py-2 px-1 rounded"
            >
              ABOUT
            </Link>
            <Link
              href="/forum"
              className="hover:bg-gray-200 text-gray-900 font-bold py-2 px-1 rounded"
            >
              FORUM
            </Link>
            <Link
              href="/helper"
              className="hover:bg-gray-200 text-gray-900 font-bold py-2 px-1 rounded"
            >
              HELPER
            </Link>
            {session ? (
                <Link href={`/about/${user.name}`}>
                  <Avatar image={user.image} />
                </Link>
                // <Link href={`/user/${user.name}`}>
                //   <Avatar image={user.image} />
                // </Link>
            ) : (
                <Link
                    href={"auth/signin"}
                    className={
                      "bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    }
                >
                  Sign In
                </Link>
            )}
            </div>
          </section>
          {/*{user && (*/}
          {/*  <Link href={`/user/${user.name}`}>*/}
          {/*    <Avatar image={user.image} />*/}
          {/*  </Link>*/}
          {/*)}*/}
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
}

// // The way Next.js works is that when it builds the app, it looks thru all the page files and checks if they have any getServerSideProps or getStaticProps functions.Everything that's happening inside these functions is executed on the server, and the result is sent to the client.
// // Can I still use this with the new next js?
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);
//   return {
//     props: {
//       session,
//     },
//   };
// }


// <header
//     className={"flex justify-between items-center py-4 px-2 bg-green-600"}
// >
//     <Link href="/">
//         <div className={"flex gap-4"}>
//
//             <h1 className={"text-2xl font-bold text-black"}>{`Poker Club`}</h1>
//         </div>
//     </Link>
//     <nav className={"flex gap-4 text-black font-bold items-center"}>
//         <Link href="/about">about</Link>
//         <Link href="/forum">forum</Link>
//         <Link href="/helper">helper</Link>
//         {user &&
//             <Link href={`/user/${user.name}`}>
//                 <Avatar image={user.image}/>
//             </Link>
//         }
//         {session ? <Button text="Log out" onClick={() => signOut()}/> :
//             <Button text="Log in" onClick={() => signIn()}/>
//         }
//     </nav>
// </header>