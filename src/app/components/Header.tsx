"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";
import { GiHamburgerMenu } from "react-icons/gi";
import { menuItems } from "@/utils/menuItems";
import ThemeSwitch from "./ThemeSwitch";
import AuthButton from "./AuthButton";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggle = () => setDrawerOpen(!drawerOpen);

  return (
    <header className="sticky top-0 w-full z-30 shadow-sm bg-white/50 backdrop-blur dark:text-slate-800">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="w-60 max-w-full flex items-center">
              <Link
                href={"/"}
                className={`text-[30px] font-extrabold cursor-pointer block w-full`}
              >
                NextBlog
              </Link>

              {/* menus */}
              <div className="items-center gap-4 hidden md:flex ml-10 font-semibold">
                {menuItems.map((item) => (
                  <Link key={item.id} href={item.path}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                {session && session.user ? (
                  <>
                    <div className="dropdown dropdown-hover hidden md:block dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        className="btn m-1 bg-transparent border-none hover:bg-transparent"
                      >
                        <div className="w-12 rounded-full relative aspect-square overflow-hidden">
                          <Image
                            alt="avatar"
                            src={
                              session?.user.image
                                ? session?.user.image
                                : "/blank-profile.svg"
                            }
                            fill
                          />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box dark:bg-slate-100 w-52"
                      >
                        <li>
                          <p className="hover:cursor-default hover:bg-transparent text-center font-semibold">
                            {session?.user.name}
                          </p>
                        </li>
                        <li>
                          <ThemeSwitch />
                        </li>
                        <li>
                          <a>Logout</a>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={() => signIn("github")}
                    >
                      LogIn
                    </button>
                  </>
                )}
              </div>

              {/* mobile menu */}
              <div className="drawer md:hidden block">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                  checked={drawerOpen}
                  onChange={toggle}
                />
                <div className="drawer-content">
                  {/* Page content here */}
                  <label
                    htmlFor="my-drawer"
                    className="drawer-button cursor-pointer"
                  >
                    <GiHamburgerMenu size={20} />
                  </label>
                </div>
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {menuItems.map((item) => (
                      <li key={item.id} onClick={toggle}>
                        <Link href={item.path}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
