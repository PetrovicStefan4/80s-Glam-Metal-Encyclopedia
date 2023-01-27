type Props = {
  text: string;
  onClick: () => void;
};

const ButtonAdd = (props: Props) => {
  const { text, onClick } = props;

  return (
    <a onClick={onClick}>
      <div className="bg-white text-gray-800 py-1 px-3 easy-in-out transition-duration-300 rounded-full font-semibold hover:bg-yellow-200 flex items-center">
        <span className="mr-1">
          <svg
            className="h-8 w-8 text-red-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="12" cy="12" r="9" />{" "}
            <line x1="9" y1="12" x2="15" y2="12" />{" "}
            <line x1="12" y1="9" x2="12" y2="15" />
          </svg>
        </span>
        <span>{text}</span>
      </div>
    </a>
  );
};

export default ButtonAdd;
