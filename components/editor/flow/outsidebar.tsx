import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from "next/image";
import resizeIcon from "@/public/images/resize.png"
import sparkIcon from "@/public/images/spark.png"

function OutputBar() {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const inputs = [
    { title: 'Question', desc: 'Enter the value for questions to prompt AI' },
    { title: 'Question', desc: 'Enter the value for questions to prompt AI' },
    { title: 'Question', desc: 'Enter the value for questions to prompt AI' },
    { title: 'Question', desc: 'Enter the value for questions to prompt AI' },
  ]

  return (
    <div className='absolute z-2  mt-24 right-side'>
      <div className=" mt-8 max-w-[330px]">
        <div className='border border-[#1D1F29] border-2 bg-[#101016]  bg-opacity-95'>
          <div className='text-white border border-[#1D1F29] border-2 px-6 pt-3 pb-3 font-bold'>Global Input</div>
          <div className='p-4'>
            <ScrollArea className='max-h-[250px]'>
              {inputs && inputs.map((one, index) => (
                <div key={index} className='cursor-pointer hover:bg-[#24242A] pt-2 pb-2 px-2 rounded-[3px] gap-3 items-center'>
                  <div className='flex justify-between'>
                    <div className='text-[#A0B9FF] text-[16px]'>{one.title}</div>
                    <Image alt='star-icon' src={resizeIcon} className='w-6 h-6 items-center' />
                  </div>
                  <div className='text-[#8D8C8C] text-[14px]'>{one.desc}</div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className='border border-[#1D1F29] border-2 mt-8 bg-[#101016] bg-opacity-95'>
          <div className='flex items-center text-white border border-[#1D1F29] border-2 px-6 pt-3 pb-3 font-bold gap-2'><Image src={sparkIcon} alt='spark-icon' className='w-8 h-8' /> Result</div>
          <div className='p-6 text-white text-[14px]'>
            Based on your readings, it is clear that<br />
            you are on the brink of a new adventure.<br />
            Your present situation urges you to embr..
          </div>
        </div>
      </div>
    </div>
  );
};


export default OutputBar;