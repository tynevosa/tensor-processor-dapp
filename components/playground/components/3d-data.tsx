import { Spinner } from "@/components/ui/spinner";
import Script from "next/script";

export const ThreeDComponent: React.FC<{ src: string; isPending: boolean }> = ({
  src,
  isPending,
}) => {
  return (
    <div
      className="flex border-gray-800 rounded-sm"
      style={{ borderWidth: "7px" }}
    >
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" />
      <model-viewer
        class="w-full h-[500px]"
        key={src}
        src={src}
        tone-mapping="neutral"
        shadow-intensity="1"
        ar
        camera-controls
        touch-action="pan-y"
        alt="A 3D model carousel">
      </model-viewer>
      {isPending && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
