import React from 'react';
import { FaHourglass,FaPlay  } from "react-icons/fa";

type ExcuteProps = {
  run:() => void,
  runState: any
}

const ExcuteBar : React.FC<ExcuteProps> = ({run, runState}) => {

  return (
    <div className=' absolute z-2 bottom-side'>
      <div className="flex bg-[#121218] px-6 pt-3 pb-3 gap-10 rounded-[10px] bg-opacity-95">
        <div className='flex gap-3'>
          <div className='cursor-pointer hover:bg-[#24242A] text-[#8D8C8C] hover:text-[white]  rounded-[8px] gap-3 items-center px-6 pt-2 pb-2'>
            <div className=' text-[20px] font-bold'>Editor</div>
          </div>
          <div className='cursor-pointer hover:bg-[#24242A] text-[#8D8C8C] hover:text-[white] rounded-[8px] gap-3 items-center px-6 pt-2 pb-2'>
            <div className=' text-[20px] font-bold'>Stats</div>
          </div>
          <div className='cursor-pointer hover:bg-[#24242A] text-[#8D8C8C] hover:text-[white] rounded-[8px] gap-3 items-center px-6 pt-2 pb-2'>
            <div className=' text-[20px] font-bold'>Settings</div>
          </div>
        </div>

        <div className='cursor-pointer hover:bg-[white] rounded-[8px] gap-3 items-center px-10 bg-[#97AEF3] pt-2  pb-2' onClick={run}>
          <div className='flex text-[black] text-[20px] font-bold items-center gap-3'>{runState?(<FaHourglass />) : (<FaPlay />)}  {runState?'Running...':'Run'}</div>
        </div>
      </div>
    </div>
  );
};


export default ExcuteBar;