import { useCallback, useState } from "react";
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";
import Image from "next/image";
import WebcamComponent from "@/components/ui/web-camera";
import { createClient } from "@supabase/supabase-js";
import { v1 } from "uuid";
import { useModel } from "@/components/contexts/model-context";
import { setDefaultAutoSelectFamily } from "net";

type Props = {
  title: string;
  description: string;
  property: string;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export const FileUploadComponent: React.FC<Props> = ({
  title,
  description,
  property,
}) => {
  const { input, setInput } = useModel();
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const {
    getRootProps,
    getInputProps,
  }: {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
  } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const uploadFile = async (file: File) => {
        const name = file.name;
        const uName = v1();
        const { data, error } = await supabase.storage
          .from("temporary")
          .upload(`./${uName}`, file);
        if (data) {
          const uploadedLink = supabase.storage
            .from("temporary")
            .getPublicUrl(uName);
          setInput({ ...input, [property]: uploadedLink["data"]["publicUrl"] });
          setFileName(name);
        } else {
          console.log(error);
        }
      };
      uploadFile(acceptedFiles[0]);
    },
    maxFiles: 1,
  });

  const onDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    let tempInput = input;
    delete tempInput[property];
    setInput(tempInput);
    setFileName(undefined);
    if (!fileName) return;
    try {
      const tempFileName = fileName.split("/").reverse().at(0) as string;
      supabase.storage
        .from("temporary")
        .remove([tempFileName]);
    } catch (error) { }
  }, [property, fileName, input, setInput, setFileName]);

  return (
    <>
      <button className="text-white flex flex-row items-center gap-2">
        <Image
          src={"/images/model/file-w.svg"}
          alt="images"
          width="0"
          height="0"
          className="w-auto h-[20px]"
        />
        <span className="uppercase text-lg font-semibold">
          {title}&nbsp;{" "}
          <span className="lowercase italic text-[#51586C] text-lg">file</span>
        </span>
      </button>
      <div className="relative w-full min-w-full bg-[#0B0B0E]  rounded-sm border-2 border-[#242835] border-dotted h-[92px]">
        <div
          {...getRootProps()}
          className="flex flex-col items-start px-3 py-3 justify-start gap-2 !w-full !max-w-full !min-w-full h-full"
        >
          <input {...getInputProps()} />
          <div className="flex flex-row gap-2">
            <Image
              src={"/images/model/file-g.svg"}
              alt="images"
              width={20}
              height={20}
            />
            <p className="text-[#51586C] text-lg font-semibold">
              Drop a file or click to upload
            </p>
          </div>
          {fileName && (
            <div className="flex gap-1 w-full justify-between">
              <p className="overflow-hidden w-11/12 flex-shrink truncate text-[#51586C] text-lg font-semibold">
                {fileName}
              </p>
            </div>
          )}
        </div>
        <button onClick={onDelete} className="absolute right-3 bottom-3 min-w-5">
          <Image
            src={"/images/model/trashcan.svg"}
            alt="images"
            width={20}
            height={20}
          />
        </button>
      </div>
    </>
  );
};
