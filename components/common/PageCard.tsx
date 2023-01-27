import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  title: string;
};

const PageCard = (props: Props) => {
  const { link, title } = props;

  return (
    <Link href={link}>
      <a>
        <div
          className={
            "flex justify-center items-center bg-gray-700 shadow-2xl w-48 p-6 font-bold ease-in-out duration-300 rounded-md mr-5 hover:bg-red-500 hover:ease-in-out"
          }
        >
          <span className={"text-lg text-white"}>{title}</span>
        </div>
      </a>
    </Link>
  );
};

export default PageCard;
