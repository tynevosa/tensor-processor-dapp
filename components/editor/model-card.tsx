import Image from "next/image";
import iconAI from "@/public/images/prompt-icon.png"
import noteIcon from "@/public/images/note.png"

const AIPrompt = (props: any) => {
    return (
        <div className="md:w-1/4 mb-6 cursor-pointer">
            <div className="m-4 px-8 pt-6 pb-6 rounded-[4px] text-white border border-2 border-[#191B24]" style={{ backgroundColor: "#121218" }}>
                <div className="flex items-center">
                    <Image src={iconAI} alt="logo" className="md:w-12 md:h-12 rounded-[2px] mr-2" />
                    <div className="mt-4">
                        <h1 className="text-2xl"><b>{props.datas.title}</b></h1>
                        <p className="h-10 overflow-hidden text-base leading-tight mt-3 text-2xl">
                            {props.datas.engin}
                        </p>
                    </div>
                </div>

                <div className="mt-3">
                    <span className="text-base text-[16px]">{props.datas.desc}</span>
                </div>
                <div className="flex mt-4 w-full pt-2 justify-between">
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-2">
                            <Image src={noteIcon} alt="note" className="w-5 h-6"></Image>
                            <p className="text-white text-[18px]">{props.datas.count}</p>
                        </div>

                        <p className="text-white text-[18px]">{props.datas.date}</p>
                    </div>

                    <p className="cursor-pointer text-[18px]">{props.datas.type}</p>
                </div>
            </div>
        </div>
    );
};

export default AIPrompt;