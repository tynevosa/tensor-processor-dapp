'use client'
import React, { useState, ChangeEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from "next/image";
import starIcon from "@/public/images/star.png"
import {FaExpandArrowsAlt, FaBolt} from "react-icons/fa";

type SlideProps = {
  workflow:string;
  titleChange: (event: ChangeEvent<any>) => void  
}

const SlideBar: React.FC<SlideProps> = ({workflow , titleChange}) => {

  const [searchTxt, setSearchTxt] = useState()
  
  const tempPrompts = [
    { name: '(Context) Character Generator', desc: 'Context-TPU' },
    { name: 'Character Generator', desc: 'ChatGpt-3.5-TPU' },
    { name: 'Story Generator', desc: 'ChatGpt-4.0-TPU' },
    { name: 'Homework helper Generator', desc: 'Context-TPU' },
  ]

  const [prompts, setPrompts] = useState(tempPrompts)
  const [tmpPrompts, setTmpPrompts] = useState(tempPrompts)
  
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSearch = (e: any) => {
    setSearchTxt(e.target.value);
    if (e.target.value === '') {
      setPrompts(tmpPrompts)
    } else {
      const tempList = prompts.map(one => one)
      const updatedlist = tempList.filter(one => one.name.toUpperCase().includes(e.target.value.toUpperCase()))
      setPrompts(updatedlist)
    }
  }
  
  return (
    <aside className='absolute z-2 items-center justify-center mx-6 mt-6 '>

      <div className="flex  m-4 p-2 bg-[#121218]">
        <div className='text-[#535358] text-[16px] font-bold'>Editor / WorkFlow / </div>
        <input type='edit' className='bg-[#121218] text-[16px] font-bold text-white border border-[#121218]' value={workflow} onChange={titleChange}/>
      </div>
      <div className=" mt-8 max-w-[330px]">
        <div className='border border-[#1D1F29] bg-[#121218]'>
          <div className='text-white border border-[#1D1F29] px-6 pt-3 pb-3 font-bold flex'><FaBolt  className='text-[24px] text-[yellow] pr-2' />All Prompts</div>
          <div className='p-6'>
            <div><input placeholder='Search' className='bg-[#121218] border border-[#24242A] pl-2 w-full text-white' value={searchTxt} onChange={(e) => handleSearch(e)} /></div>
            <ScrollArea className='max-h-[300px] overflow-y-auto'>
              {prompts && prompts.map((one, index) => (
                <div key={index} className='flex mt-3 cursor-pointer hover:bg-[#24242A] pt-2 pb-2 px-2 rounded-[3px] gap-3 items-center' onDragStart={(event:any) => onDragStart(event, index.toString())} draggable>
                  <Image alt='star-icon' src={starIcon} className='w-8 h-8' />
                  <div>
                    <div className='text-white text-[14px]'>{one.name}</div>
                    <div className='text-[#535358]'>{one.desc}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className='border border-[#1D1F29] mt-8 bg-[#121218]'>
          <div className='text-white border border-[#1D1F29] px-6 pt-3 pb-3 font-bold'>API</div>
          <div className='p-6 text-white text-[12px]'>
            {'cURL -cURL'} 
            {'1. curl -- location https://pms.cho'}
            {'2. --header Content - tpu:// application h'}
            {'3. --header -- location https://pms.cho'}
            {'4. --data input()'}
          </div>
        </div>
      </div>
    </aside>
  );
};


export default SlideBar;