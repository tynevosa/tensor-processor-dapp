'use client'
import AIPrompt from "@/components/editor/model-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Page() {

  const [kind, setKind] = useState<string>('prompt')

  const tempDatas = [{ title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values", count: 9, date: '15 Mar', type: 'Live' },
  { title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 3, date: '23 Mar', type: 'Live' },
  { title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 7, date: '12 Mar', type: 'Live' },
  { title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 4, date: '10 Mar', type: 'Live' },
  { title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 12, date: '9 Mar', type: 'Live' }]

  const handleKind = (value:string) =>
  {
    setKind(value)
  }


  return (
    <ScrollArea className="w-full h-full pr-5">
      <div className="flex flex-col gap-6 items-stretch p-8">
        <div className="flex flex-row justify-between px-4 mt-8">
          <div className="flex gap-3 text-white text-[24px] font-bold">
            <div className={`${kind === 'prompt' ? 'text-white':'text-[#999999]'}  text-[24px] font-bold cursor-pointer`} onClick={()=> handleKind('prompt')}>Prompt</div>
            |
            <div className={`${kind === 'workflow' ? 'text-white':'text-[#999999]'} text-[24px] font-bold cursor-pointer`}  onClick={() => handleKind('workflow')}>Workflows</div>
          </div>
          <div>
            <Button className="w-full text-[#2B3144] font-bold rounded-[3px]  w-[200px] bg-[#97AEF3]  text-[16px] hover:text-white"><a href={kind === 'prompt'?'/dashboard/editor/#': `/dashboard/editor/workflow`} className="flex gap-3">
              <p>+</p> <p>{kind === 'prompt' ? 'Create Prompt': 'Create Workflow'}</p>
            </a>

            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full mt-5">
          {tempDatas && tempDatas.map((oneRecord, index) => (
            <AIPrompt key={index} datas={oneRecord} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}


export default Page