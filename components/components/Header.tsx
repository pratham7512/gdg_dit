"use client"
import { useRouter } from "next/router";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import Image from "next/image";
import GDSC from "../assets/GDSC.svg";
import { navigation } from "../../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "../design/Header";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

function getUser() {
  const { data: session } = useSession();
  return session;
}

const Header: React.FC = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const session =getUser();
  useEffect(() => {
    // Setting isClient to true once the component is mounted on the client
    setIsClient(true);
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
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <Image src={GDSC} width={190} height={40} alt="GDG" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>
        <div>
          {session ? (
            <Button className="hidden lg:flex" onClick={async () => await signOut()}>
            Logout
            </Button>
          ) : (<div className="flex justify-between items-center">
            <a
              href="/signup"
              className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
            >
              New account
            </a>
            <Button className="hidden lg:flex" href="/signin">
              Sign in
            </Button>
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