import Link from "next/link";

type Props = {
  link: string;
  title: string;
  artist: string;
  year: string;
  cover: string;
};

const AlbumCard = (props: Props) => {
  const { link, title, artist, year, cover } = props;

  return (
    <Link href={link || "/"}>
      <a className={"block rounded border-2 border-gray-300 bg-white"}>
        <div className="w-full aspect-square">
          <div
            className="w-full aspect-square background-image"
            style={{ backgroundImage: `url(${cover})` }}
          ></div>
        </div>
        <div className={"p-2"}>
          <h3 className={"font-semibold text-center"}>{artist}</h3>
          <h3 className={"text-center"}>{title}</h3>
          <p className={"text-center"}>({year})</p>
        </div>
      </a>
    </Link>
  );
};

export default AlbumCard;
