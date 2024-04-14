import Image from "next/image";
import { AudioComponent } from "./audio";
import { ImageComponent } from "./image";
import { VideoComponent } from "./video";

import { saveAs } from "file-saver";

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
  const saveImage = () => {
    saveAs(output, type);
  };
  switch (type) {
    case "mp4":
      component = <VideoComponent src={output} isPending={isPending} />;
      break;
    case "png":
      component = <ImageComponent src={output} isPending={isPending} />;
      break;
    case "mp3":
    case "wav":
      component = <AudioComponent src={output} isPending={isPending} />;
      break;
    default:
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

          <span
            className="text-base text-white hidden lg:flex"
            onClick={saveImage}
          >
            Download
          </span>
        </button>
      </div>
    </div>
  );
};

export default OutputComponent;
