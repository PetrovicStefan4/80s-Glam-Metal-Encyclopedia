const dayjs = require("dayjs");
const year = dayjs().format("YYYY");

const Footer = () => {
  return (
    <>
      <div className="bg-red-600 z-10">
        <p className="text-center text-white py-3">
          Copyright © {year} sleazealleycat. All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
