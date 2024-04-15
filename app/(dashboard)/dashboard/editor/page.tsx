'use client'
import axios from "axios";
import AIPrompt from "@/components/editor/model-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getWorkflowList, getPromptList } from "./api";
import { useRouter } from 'next/navigation'

function Page() {

  const tempDatas = [{ id: 1, title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values", count: 9, date: '15 Mar', type: 'Live' },
  { id: 2, title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 3, date: '23 Mar', type: 'Live' },
  { id: 3, title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 7, date: '12 Mar', type: 'Live' },
  { id: 4, title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 4, date: '10 Mar', type: 'Live' },
  { id: 5, title: '', engin: 'OpenAi/GPT-3.5-Turbo-16k', desc: "Create custom variables by entering '/ ' and speciofy their values'", count: 12, date: '9 Mar', type: 'Live' }]

  const [workflows, setWorkflows] = useState([]);
  const [kind, setKind] = useState('prompt')
  const router = useRouter()


  const fetchData = async () => {
    
    if(kind === 'prompt'){
      
       await getPromptList()
       .then(res => {
         setWorkflows(res.data)
       })
       .catch(err => {
         console.log('Error :', err)
       })

    }else{
  
      await getWorkflowList()
      .then(res => {
      
        setWorkflows(res.data);
        
      })
      .catch(err => {
        console.log('Error :', err)
      });
    }
    
  };
  
  useEffect(() => {

    


    fetchData();
  }, [kind]);

  const handleclick = () => {

    const default_id = 0
    const str_val = default_id.toString()

    if (kind != 'prompt') {

      localStorage.setItem('workflow_id', str_val)
      router.push('/dashboard/editor/workflow')

    } else {

      localStorage.setItem('prompt_id', str_val)
      router.push('/dashboard/editor/prompt')
    }


  }

  const handleKind = (value: string) => {
    fetchData()
    setKind(value)
  }

  return (
    <ScrollArea className="w-full h-full pr-5">
      <div className="flex flex-col gap-6 items-stretch p-8">
        <div className="flex flex-row justify-between px-4 mt-8">
          <div className="flex gap-3 text-white text-[24px] font-bold">
            <div className={`${kind === 'prompt' ? 'text-white' : 'text-[#999999]'}  text-[24px] font-bold cursor-pointer`} onClick={() => handleKind('prompt')}>Prompt</div>
            |
            <div className={`${kind === 'workflow' ? 'text-white' : 'text-[#999999]'} text-[24px] font-bold cursor-pointer`} onClick={() => handleKind('workflow')}>Workflows</div>
          </div>
          <div>
            <Button className="w-full text-[#2B3144] font-bold rounded-[3px]  w-[200px] bg-[#97AEF3]  text-[16px] hover:text-white"><a className="flex gap-3" onClick={handleclick}>
              <p>+</p> <p>{kind === 'prompt' ? 'Create Prompt' : 'Create Workflow'}</p>
            </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full mt-5">
          {workflows && workflows.map((oneRecord, index) => (
            <AIPrompt key={index} datas={oneRecord} type={kind}/>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}


export default Page