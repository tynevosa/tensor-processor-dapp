'use client'
import axios from "axios";
import AIPrompt from "@/components/editor/model-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getWorkflowList, getPromptList } from "./api";
import { useRouter } from 'next/navigation'

function Page() {

  const [workflows, setWorkflows] = useState([]);
  // const [kind, setKind] = useState('prompt')
  const router = useRouter()

  const fetchData = async () => {
    
    // if(kind === 'prompt'){
      
    //    await getPromptList()
    //    .then(res => {
    //      setWorkflows(res.data)
    //    })
    //    .catch(err => {
    //      console.log('Error :', err)
    //    })

    // }else{
  
      await getWorkflowList()
      .then(res => {
      
        setWorkflows(res.data);
        
      })
      .catch(err => {
        console.log('Error :', err)
      });
    // }
    
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleclick = () => {

    const default_id = 0
    const str_val = default_id.toString()

    // if (kind != 'prompt') {

      localStorage.setItem('workflow_id', str_val)
      router.push('/dashboard/editor/workflow')

    // } else {

    //   localStorage.setItem('prompt_id', str_val)
    //   router.push('/dashboard/editor/prompt')
    // }

  }

  // const handleKind = (value: string) => {
  //   fetchData()
  //   setKind(value)
  // }

  return (
    <ScrollArea className="w-full h-full">
      <div className="flex flex-col gap-6 items-stretch p-8">
        <div className="flex flex-row justify-between px-4 mt-8">
          {/* <div className="flex gap-3 text-white text-[24px] font-bold">
            <div className={`${kind === 'prompt' ? 'text-white' : 'text-[#999999]'}  text-[24px] font-bold cursor-pointer`} onClick={() => handleKind('prompt')}>Prompt</div>
            |
            <div className={`${kind === 'workflow' ? 'text-white' : 'text-[#999999]'} text-[24px] font-bold cursor-pointer`} onClick={() => handleKind('workflow')}>Workflows</div>
          </div> */}
          <div>
            <Button className="w-full text-[#2B3144] font-bold rounded-[3px] bg-[#97AEF3]  text-[16px] hover:text-white"><a className="flex gap-3" onClick={handleclick}>
              <p>+</p> <p>Create Workflow</p>
            </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full mt-5">
          {workflows && workflows.map((oneRecord, index) => (
            <AIPrompt key={index} datas={oneRecord}/>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}


export default Page