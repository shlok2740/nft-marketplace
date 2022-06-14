import { useState, useEffect } from "react";
import Logo from "./Logo";
import {
  HiOutlineSun,
  HiOutlineSearch,
  HiOutlineMoon,
  HiOutlineCreditCard,
  HiOutlineLogout,
} from "react-icons/hi";
import SearchInput from "./SearchInput";
import NavMenus from "./NavMenus";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

function Navbar() {
  const [mounted, setMounted] = useState(false);
  const address = useAddress();
  const disconnect = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <HiOutlineMoon
          className="h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <HiOutlineSun
          className="h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  const menus = [
    {
      name: "Etherscan",
      href: `https://rinkeby.etherscan.io/address/${process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS}`,
    },
    {
      name: "OpenSea",
      href: "https://testnets.opensea.io/collection/otherdeed-ce8y1tjrgw",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-2 shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between space-x-6">
        <div className="xl:pr-40">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>

        <div className="ml-8 hidden flex-1 sm:block">
          <SearchInput />
        </div>

        <div className="hidden pr-6 lg:block xl:pl-8">
          <NavMenus menus={menus} />
        </div>

        <div className="flex items-center space-x-6">
          <Link href={`https://testnets.opensea.io/${address}`}>
            <HiOutlineCreditCard className="h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white" />
          </Link>
          {renderThemeChanger()}
          <HiOutlineSearch className="h-7 w-7 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white sm:hidden" />
          <HiOutlineLogout
            className="h-8 w-8 cursor-pointer text-gray-600 transition-all hover:text-black dark:text-gray-300 hover:dark:text-white"
            onClick={disconnect}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
