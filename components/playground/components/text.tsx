import { Spinner } from "@/components/ui/spinner";

export const TextComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => {
  return (
    <div
      className="flex border-gray-800 rounded-sm px-3 py-3"
      style={{ borderWidth: "1px" }}
    >
      <p className="text-white">{src}</p>
      {isPending && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
