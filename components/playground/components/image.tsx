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
      <div className="relative w-full h-[344px]">
        <div
          className={`w-full h-full transition-all transition-duration-500 ${
            isPending ? "opacity-20" : ""
          }`}
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${src})`,
          }}
        ></div>
        {isPending && (
          <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
