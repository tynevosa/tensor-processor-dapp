import { Spinner } from "@/components/ui/spinner";

export const VideoComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => {
  return (
    <div className="h-[500px] w-full relative">
      <video
        controls
        className={`w-full h-full ${isPending ? "opacity-20" : ""}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isPending && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
