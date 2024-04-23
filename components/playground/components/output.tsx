import Image from "next/image";
import { AudioComponent } from "./audio";
import { ImageComponent } from "./image";
import { VideoComponent } from "./video";
import { ThreeDComponent } from "./3d-data";
import { TextComponent } from "./text";

interface OutputComponentProps {
  isPending: boolean;
  output: string;
  time: number;
}

const OutputComponent: React.FC<OutputComponentProps> = ({
  isPending,
  output,
  time,
}) => {
  let component = null;
  const type = output.toString().split(".").reverse().at(0) ?? "";
  switch (type) {
    case "mp4":
    case "avi":
      component = <VideoComponent src={output} isPending={isPending} />;
      break;
    case "png":
    case "jpg":
      component = <ImageComponent src={output} isPending={isPending} />;
      break;
    case "mp3":
    case "wav":
      component = <AudioComponent src={output} isPending={isPending} />;
      break;
    case "glb":
      component = <ThreeDComponent src={output} isPending={isPending} />;
      break;
    default:
      component = <TextComponent src={output} isPending={isPending} />;
      break;
  }
  return (
    <div>
      {component}
      <div className="flex flex-row justify-between items-center mt-5">
        <p className="text-lg text-gray-400 my-3 font-semibold">
          {isPending ? (
            <span>Generating...</span>
          ) : (
            <span>{"Generated in " + time + " s"}</span>
          )}
        </p>
        <button className="rounded-sm px-2 py-2 flex flex-row items-center gap-1 bg-gray-600">
          <Image
            src="/images/model/download.svg"
            width={20}
            height={20}
            alt="setting"
          />

          <a
            href={output}
            className="text-base text-white hidden lg:flex"
            download={true}
          >
            Download
          </a>
        </button>
      </div>
    </div>
  );
};

export default OutputComponent;
