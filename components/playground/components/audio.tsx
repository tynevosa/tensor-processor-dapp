import { Spinner } from "@/components/ui/spinner";

export const AudioComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => {
  return (
    <div className="flex justify-center items-center">
      <audio
        controls
        src={src}
        className={`${isPending ? "opacity-10" : "opacity-100"}`}
      ></audio>
      {isPending && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
