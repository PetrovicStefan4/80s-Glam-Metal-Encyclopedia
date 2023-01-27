import Link from "next/link";
import dayjs from "dayjs";
import IBand from "../../@types/band";

const BandCard = (props: IBand) => {
  const { id, name, formedAt, info, image } = props;

  const a =
    "https://www.gannett-cdn.com/media/Phoenix/Phoenix/2014/07/15/1405461691000-phxdc5-6g69q2om5hsvjmf56ei-original-1-.jpg";

  return (
    <div key={id}>
      <Link href={`/bands/${id}`}>
        <a>
          <div className="band-card flex justify-center items-center flex-col">
            {!image && (
              <div className="h-48 w-48 rounded-full overflow-hidden mb-3">
                <div
                  className="h-48 w-48 background-image rounded-full"
                  style={{ backgroundImage: `url(${a})` }}
                ></div>
              </div>
            )}
            {image && (
              <div className="h-48 w-48 rounded-full overflow-hidden mb-3">
                <div
                  className="h-48 w-48 background-image rounded-full"
                  style={{ backgroundImage: `url(${image?.path})` }}
                ></div>
              </div>
            )}
            <div>
              <p className="font-bold text-center">{name}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BandCard;
