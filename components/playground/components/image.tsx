import { Spinner } from "@/components/ui/spinner";

export const ImageComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => {
  return (
    <div
      className="flex border-gray-800 rounded-sm"
      style={{ borderWidth: "7px" }}
    >
      <img
        className={`w-full transition-all transition-duration-500 ${
          isPending ? "opacity-20" : ""
        }`}
        src={src}
      ></img>
      {isPending && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
