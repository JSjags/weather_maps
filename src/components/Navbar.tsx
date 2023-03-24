import cloud from "../assets/cloud.png";

const Navbar = () => {
  return (
    <div className=" relative z-10 w-full h-[10vh] gap-2 flex items-center px-3 bg-teal-300 ">
      <img src={cloud} className="w-[3rem] h-[3rem]" />
      <p className="font-semibold text-[2rem] sm:text-[1.6rem] xs:text-[1.4rem]">
        Weather Maps
      </p>
    </div>
  );
};

export default Navbar;
