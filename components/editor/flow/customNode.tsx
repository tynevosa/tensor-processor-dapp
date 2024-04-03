import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import Image from "next/image";
import starIcon from "@/public/images/star.png";
import checkedIcon from "@/public/images/checked.png";

const CustomNode = (data: any, isConnectable: any) => {
  const [iCollapse, setICollapse] = useState(true);
  const [oCollapse, setOCollapse] = useState(true);

  const handleCollapseClikced = () => {
    if (iCollapse) {
      setICollapse(false);
    } else {
      setICollapse(true);
    }
  };

  const handleOCollapseClikced = () => {
    if (oCollapse) {
      setOCollapse(false);
    } else {
      setOCollapse(true);
    }
  };

  return (
    <>
      {data.data.Ihandle && data.data.Ihandle > 0 && (
        <>
          {Array.from({ length: data.data.Ihandle }).map((_, i) => (
            <Handle
              key={i}
              id={`handle-${i}`}
              type="target"
              position={Position.Left}
              style={{
                top: 20 * (i + 1),
                background: "#97AEF3",
                border: "none",
                width: "10px",
                height: "10px",
              }}
              onConnect={(params) => console.log("handle onConnect", params)}
              isConnectable={isConnectable}
            />
          ))}
        </>
      )}

      <div className="bg-[#121218] border border-[#242835] w-full flex flex-col  ml-1 rounded-[3px] pt-1 ">
        <div className="flex">
          <div className="flex cursor-pointer bg-[#24242A] pt-1 pb-1 gap-1 px-2">
            <Image alt="star-icon" src={starIcon} className="w-3 h-4 mt-1" />
            <div>
              <div className="text-white text-[12px] text-left">
                {"Character Generator"}
              </div>
              <div className="text-[#535358]">{"ChatGpt-3.5-TPU"}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#121218] p-2">
          <div className="">
            <div
              onClick={handleCollapseClikced}
              className="flex justify-between"
            >
              <Image
                alt="star-icon"
                src={checkedIcon}
                className={`w-3 h-2 mt-1 ${
                  iCollapse ? " rotate-0 " : " rotate-180 "
                }`}
              />
              <div className="text-white">
                INPUT{" "}
                <span className="rounded-2 bg-[#1F212E] text-[#8599D6]">
                  0/2
                </span>
              </div>
            </div>
            <div className={iCollapse ? "" : "hidden"}>
              {data.data.input &&
                data.data.input > 0 &&
                Array.from({ length: data.data.input }).map((_, i) => (
                  <input
                    key={i}
                    id={`handle-${i}`}
                    className="w-full bg-[#121218] rounded-[3px] border border-size-1 border-[#464F6F] text-[#97AEF3] mt-2 pl-1 text-[12px]"
                    type="editor"
                  />
                ))}
            </div>
          </div>

          <div className="mt-3">
            <div
              onClick={handleOCollapseClikced}
              className="flex justify-between"
            >
              <Image
                alt="star-icon"
                src={checkedIcon}
                className={`w-3 h-2 mt-1 ${
                  oCollapse ? " rotate-0 " : " rotate-180 "
                }`}
              />
              <div className="text-white">OUTPUT</div>
            </div>
            <div className={oCollapse ? "" : "hidden"}>
              <div>
                <input
                  className="w-full bg-[#121218] rounded-[3px] border border-size-1 border-[#464F6F] text-[#97AEF3] mt-2 pl-1  text-[12px]"
                  type="editor"
                />
              </div>
              <div className="mt-2 text-[#505056]">
                Input: 178 tokens
                <input
                  className="w-full bg-[#121218] rounded-[3px] border border-size-1 border-[#464F6F] text-[#97AEF3] mt-1 pl-1  text-[12px]"
                  type="editor"
                  placeholder="Last run: --"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        data.data.Ohandle &&
          data.data.Ohandle > 0 &&
          // <>
          Array.from({ length: data.data.Ohandle }).map((_, i) => (
            <Handle
              key={i}
              type="source"
              position={Position.Right}
              id={`handle-${i}`}
              style={{
                bottom: 20 * (i + 1),
                top: "auto",
                background: "#97AEF3",
                border: "none",
                width: "10px",
                height: "10px",
                right: "-16px",
              }}
              isConnectable={isConnectable}
            />
          ))
        // </>
      }
    </>
  );
};

export default memo(CustomNode);
