import Link from "next/link";
import IRecordLabel from "../../@types/record-label";

const RecordLabelCard = (props: IRecordLabel) => {
  const { id, name, image } = props;

  const a =
    "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=6&m=1223671392&s=170667a&w=0&h=zP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU=";

  return (
    <div key={id}>
      <Link href={`/record-labels/${id}`}>
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

export default RecordLabelCard;
