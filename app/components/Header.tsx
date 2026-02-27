import Link from "next/link";
import Image from "next/image";

export default function Header(): React.JSX.Element {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#110720]/80 backdrop-blur-md border-b border-white/5">
      <nav className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="container mx-auto max-w-6xl flex items-center justify-between h-full">
          <Link 
            href="/" 
            className="flex items-center group"
          >
            <Image 
              src="/logo/logo.svg" 
              alt="Shivansh" 
              width={180} 
              height={70} 
              className="w-32 sm:w-44 md:w-52 h-auto group-hover:opacity-80 transition-opacity drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
              priority
            />
          </Link>
          <ul className="flex items-center gap-4 sm:gap-8 list-none m-0 p-0 text-sm sm:text-base">
            <li className="m-0 p-0">
              <Link 
                href="#home" 
                className="text-white/80 hover:text-purple-400 transition-colors py-2 block"
              >
                Home
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link 
                href="#about" 
                className="text-white/80 hover:text-purple-400 transition-colors py-2 block"
              >
                About
              </Link>
            </li>
            <li className="m-0 p-0">
              <Link 
                href="#lab" 
                className="text-white/80 hover:text-purple-400 transition-colors py-2 block"
              >
                Lab
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

