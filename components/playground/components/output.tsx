import Image from "next/image";
import { AudioComponent } from "./audio";
import { ImageComponent } from "./image";
import { VideoComponent } from "./video";
import { ThreeDComponent } from "./3d-data";
import { TextComponent } from "./text";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

interface OutputComponentProps {
  loadingStatus: string;
  output: string;
  time: number;
  failedMessage: string;
}

const OutputComponent: React.FC<OutputComponentProps> = ({
  loadingStatus,
  output,
  time,
  failedMessage
}) => {
  const type = useMemo(() => {
    if (output.includes("https://"))
      return output.split(".").reverse().at(0) ?? "";
    else return "txt";
  }, [output]);

  const [isDownloading, startDownload] = useTransition();
  const downloadFile = useCallback(() => {
    startDownload(async () => {
      try {
        let blob;
        let fileName;
        if (type === "txt") {
          blob = new Blob([output], {type: "text/plain;charset=utf-8"});
          fileName = "output.txt";
        } else {
          const { data } = await axios.get(output, {
            responseType: 'blob', // Important to handle binary data
          })
          blob = new Blob([data]);
          fileName = output.substring(output.lastIndexOf("/") + 1);
        }

        // Create a temporary link and trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    });
  }, [output]);
  return (
    <div>
      {
        ["mp4", "avi"].includes(type) && <VideoComponent src={output} isPending={loadingStatus === "pending"} /> ||
        ["png", "jpg"].includes(type) && <ImageComponent src={output} isPending={loadingStatus === "pending"} /> ||
        ["mp3", "wav"].includes(type) && <AudioComponent src={output} isPending={loadingStatus === "pending"} /> ||
        ["glb"].includes(type) && <ThreeDComponent src={output} isPending={loadingStatus === "pending"} /> ||
        ["txt"].includes(type) && <TextComponent src={output} isPending={loadingStatus === "pending"} />
      }
      <div className="relative flex flex-row items-center mt-5">
        <p className="text-lg text-gray-400 my-3 font-semibold">
          {
            (loadingStatus === "pending" && <span>Generating...</span>) ||
            (loadingStatus === "failed" && <span className="text-red-500 whitespace-nowrap">{failedMessage}</span>) ||
            ((loadingStatus === "success" || loadingStatus === "idle") && <>Generated in <span className=" text-green-500">{time}</span> s</>)
          }
        </p>
        <button className="rounded-sm px-2 py-2 flex flex-row items-center gap-1 bg-gray-600 absolute -right-0" 
          onClick={isDownloading ? undefined : downloadFile}>
          {isDownloading? 
          <div className="grid w-full place-items-center overflow-x-scroll rounded-lg lg:overflow-visible">
            <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24">
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
              </path>
            </svg>
          </div> :
          <Image
            src="/images/model/download.svg"
            width={24}
            height={24}
            alt="setting"
          />
          }
          <span
            className="text-base text-white hidden lg:flex"
          >Download </span>
        </button>
      </div>
    </div>
  );
};

export default OutputComponent;
