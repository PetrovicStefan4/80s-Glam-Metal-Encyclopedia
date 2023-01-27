import Link from "next/link";
import NavLink from "./Navlink";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 right-0 bg-red-500 z-20">
      <nav className="container mx-auto py-2 lg:py-3">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <a>
              <div className="flex justify-center items-center">
                <NavbarLogo />
                <p className="text-lg lg:text-2xl font-bold">SLEAZE ALLEYCAT</p>
              </div>
            </a>
          </Link>
          <div className="hidden lg:block">
            <ul className="flex justify-center items-center">
              <li className="mr-3">
                <NavLink title="Home" link="/" />
              </li>
              <li className="mr-3">
                <NavLink title="Bands" link="/bands" />
              </li>
              <li className="mr-3">
                <NavLink title="Albums" link="/albums" />
              </li>
              <li className="mr-3">
                <NavLink title="Record Labels" link="/record-labels" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const NavbarLogo = () => {
  return (
    <svg
      className="h-10 w-10 text-white mr-2"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <circle cx="11" cy="16" r="1" />
      <polyline points="12 16 12 11 14 12" />
    </svg>
  );
};

export default Navbar;
