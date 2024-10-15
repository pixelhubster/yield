"use client";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Bell, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavLinkProps {
  href: string;
  children: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);
//   const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside as unknown as EventListener);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside as unknown as EventListener);
    };
  }, []);
  

  const toggleDrawer = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  

  const NavLink = ({ href, children }:{href:string, children:string}) => (
    <Link
      href={href}
      className={`text-black hover:text-green-400 transition-colors duration-200 text-[.9rem] ${
        pathname === href ? "text-green-400 p-2 bg-background rounded-full" : "text-text"
      }`}
      onClick={handleLinkClick}
    >
      {children}
    </Link>
  );

  return (
    <nav className={`w-full z-50 transition-all duration-300 p-2 bg-background`}>
      <div className="max-w-7x mx-auto px-4 sm:px-6 lg:px-8 bg-secondary rounded-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="bg-green-400 text-text text-xs font-bold px-2 py-1 rounded-md">
                CE
              </span>
              <span className="text-text font-semibold text-lg">ClassEdge</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-text">
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                  
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-secondary text-[#f0f0f0] border border-gray-700 rounded-full focus:ring-2 focus:ring-gray-700 transition-all duration-300"
                />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-text hover:bg-accent">
              <Bell size={20} />
            </Button>
           
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-[#f0f0f0] hover:bg-[#202425]"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-[#151718] border-l border-[#202425]"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-[#202425]">
                    <span className="text-lg font-semibold text-[#f0f0f0]">
                      Menu
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-[#f0f0f0] hover:bg-[#202425]"
                    >
                      <X size={24} />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4 mt-4">
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                    <NavLink href="/">Link</NavLink>
                  </nav>
                  
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;