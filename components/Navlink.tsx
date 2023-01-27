import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = (props: { title: string; link: string }) => {
  const { title, link } = props;

  const router = useRouter();
  const { pathname } = router;

  return (
    <Link href={link}>
      <a>
        <span
          className={clsx(
            pathname === link ? "text-gray-800" : "text-white",
            "ease-in-out duration-300 hover:text-gray-800 hover:ease-in-out font-bold"
          )}
        >
          {title}
        </span>
      </a>
    </Link>
  );
};

export default NavLink;
