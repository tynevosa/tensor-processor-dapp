import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="bg-[#000510] text-white py-4 px-8 flex justify-end border-b border-[#242835] w-full">
      <Button className="text-lg font-semibold px-8" variant={"secondary"}>
        Sign In
      </Button>
    </div>
  );
};
