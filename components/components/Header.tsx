"use client"
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Image from "next/image";
import GDSC from "../assets/GDSC-logo.svg";
import { navigation } from "../../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu, HamburgerMenu2 } from "../design/Header";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";
import { AuthDialog } from "./Signin";

function useGetUser() {
  const { data: session } = useSession();
  return session;
}

const Header: React.FC = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  // const [isClient, setIsClient] = useState(false);
  const session =useGetUser();
  console.log(session);
  
  useEffect(() => {
    // Setting isClient to true once the component is mounted on the client
    console.log(session);

  }, []);

  // Using useRouter only if the component is mounted on the client
  // const { asPath } = isClient ? useRouter() : { asPath: "" };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 lg:bg-transparent lg:backdrop-blur-sm ${
        openNavigation ? "bg-black" : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-2 h-[4.3rem]">
      <a className="block " href="/">
        <div className="flex w-[12rem] items-center xl:mr-8 gap-2">
            <Image src={GDSC} width={40} height={30} alt="GDG" />
          <span className="text-lg text-white font-semibold">GDG DIT</span>
        </div>
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-black lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          {session?(<div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-3 md:py-3 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
           <Button className=" lg:hidden" onClick={async () => await signOut()}>
            Logout
            </Button>
          </div>):
           (<div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            <AuthDialog initialMode="signup">
            <Button className=" lg:hidden relative p-2 py-3">
              New account
            </Button>
            </AuthDialog>
            <br />
            <AuthDialog initialMode="signin">
            <Button className=" lg:hidden relative p-2 py-3">
              Sign in
            </Button>
            </AuthDialog>
          </div>)
          }
      
          {session?(<HamburgerMenu  />):<HamburgerMenu2  />}
        </nav>
        <div>
          {session ? (
            <Button className="hidden lg:flex" onClick={async () => await signOut()}>
            Logout
            </Button>
          ) : (<div className="flex justify-between items-center">
            <AuthDialog initialMode="signup">
            <div className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">
              New account
            </div>
            </AuthDialog>
            <AuthDialog initialMode="signin">
            <Button className="hidden lg:flex">
              Sign in
            </Button>
            </AuthDialog>
          </div>)}
        </div>


        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;