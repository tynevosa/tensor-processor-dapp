import Image from "next/image";
import iconAI from "@/public/images/prompt-icon.png"
import noteIcon from "@/public/images/note.png"
import { useRouter } from 'next/navigation'

const AIPrompt = (props: any) => {

  const router = useRouter()

  const handleClicked = () => {
    // if (props.kind === 'prompt') {

    // } else {
      const default_id = props.datas.id
      const str_val = default_id.toString()
      localStorage.setItem('workflow_id', str_val)
      router.push('/dashboard/editor/workflow')
    // }
  }

  return (
    <div className="md:w-1/4 mb-6 cursor-pointer min-w-[380px]" onClick={handleClicked}>
      <div className="m-4 px-8 pt-6 pb-6 rounded-[4px] text-white border border-[#191B24]" style={{ backgroundColor: "#121218" }}>
        <div className="flex items-center">
          <Image src={iconAI} alt="logo" className="md:w-12 md:h-12 rounded-[2px] mr-2" />
          <div className="mt-4">
            <h1 className="text-[18px]"><b>{props.datas.name ?? 'UNTITLED'}</b></h1>
            <div className="h-10 overflow-hidden text-base leading-tight flex">
              <p className="text-[#605D5C] font-bold">{props.datas.nodes_count + ' NODES'}</p><p className="font-bold">{'/' + props.datas.edges_count + ' EDGES'}</p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-base text-[16px]">{props.datas.desc}</span>
        </div>
        <div className="flex mt-4 w-full pt-2 justify-between">
          <div className="flex gap-8 items-center">
            <div className="flex gap-2">
              <Image src={noteIcon} alt="note" className="w-5 h-6"></Image>
              {/* <p className="text-white text-[18px]">{props.datas.count}</p> */}
              <p className="text-white text-[16px]">8</p>
            </div>
            <p className="text-white text-[18px] text-center">{props.datas.updated_at}</p>
          </div>
          <div className="flex cursor-pointer items-center gap-1"><p className="w-[6px] h-[6px] bg-[#4ADE80] rounded-full"></p><p className="text-[16px]">{props.datas.state ? 'LIVE' : 'DRAFT'}</p></div>
        </div>
      </div>
    </div>
  );
};

export default AIPrompt;