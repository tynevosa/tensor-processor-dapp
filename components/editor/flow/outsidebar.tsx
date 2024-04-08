import React, { ChangeEvent } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

import { FaExpandArrowsAlt, FaBolt } from "react-icons/fa";

type OutputProps = {
  question: any;
  queChange: (id: any, index:any, text:any, title:any) => void
}

const OutputBar: React.FC<OutputProps> = ({ question, queChange }) => {

  const nodes = question === null ? [] : Object.values(question)

  return (
    <div className='absolute z-2  mt-24 right-side'>
      <div className=" mt-8 max-w-[330px]">
        <div className='border border-[#1D1F29] border-2 bg-[#101016]  bg-opacity-95'>
          <div className='flex text-white border border-[#1D1F29] border-2 px-6 pt-3 pb-3 font-bold'><FaBolt className='text-[24px] text-[yellow] pr-2' />   Global Input</div>
          <div className='p-4'>
            <ScrollArea className='max-h-[250px] overflow-y-auto'>
              {nodes && nodes.map((ones: any, index) => (
                 ones && Object.values(ones).map((one_inputs: any, s_index: number) => (
                  one_inputs && Object.values(one_inputs).map((one_input:any, d_index:number) =>(
                    <div key={`${index}-${s_index}-${d_index}`} className=' hover:bg-[#24242A] pt-2 pb-2 px-2 rounded-[3px] gap-3 items-center'>
                    <div className='flex justify-between'>
                      <div className='text-[#A0B9FF] text-[16px]'>{ Object.keys(one_inputs)[d_index]}</div>
                      <FaExpandArrowsAlt key={`${index}-${s_index}-${d_index}`} className="text-[white] cursor-pointer"  onClick={(e)=>queChange(index + '-' + s_index + '-' + d_index,ones.id,one_input, Object.keys(one_inputs)[d_index])} />
                    </div>
                    <input type="edit" className='text-[#8D8C8C] text-[14px] w-full bg-transparent' value={one_input} readOnly/>
                  </div>
                  )) 
                ))
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className='border border-[#1D1F29] border-2 mt-8 bg-[#101016] bg-opacity-95'>
          <div className='flex items-center text-white border border-[#1D1F29] border-2 px-6 pt-3 pb-3 font-bold gap-2'>
            <FaBolt className='text-[24px] text-[yellow]' /> Result</div>
          <div className='p-6 text-white text-[14px]'>
            Based on your readings, it is clear that
            you are on the brink of a new adventure.
            Your present situation urges you to embr..
          </div>
        </div>
      </div>
    </div>
  );
};


export default OutputBar;