import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import Image from "next/image";
import starIcon from "@/public/images/star.png"
import checkedIcon from "@/public/images/checked.png"
import { useRouter } from 'next/navigation'
import { FaCaretRight,FaClone, FaExpand , FaTrashAlt} from "react-icons/fa";
import { AxiosResponse } from 'axios';
import { nodeRun } from '@/app/(dashboard)/dashboard/editor/api';

const CustomNode = (data: any, isConnectable: any) => {

  const [iCollapse, setICollapse] = useState(true)
  const [oCollapse, setOCollapse] = useState(true)
  const [active, setActive] = useState(false)
  const [result , setResult] = useState('')
  const router = useRouter()

  const jsonArray = Object.entries(data.data.supported_inputs);

  const handleCollapseClikced = () => {

    if (iCollapse) {
      setICollapse(false)
    } else {
      setICollapse(true)
    }

  }

  const handleOCollapseClikced = () => {

    if (oCollapse) {
      setOCollapse(false)
    } else {
      setOCollapse(true)
    }

  }

  const handlelink = () => {

    localStorage.setItem("nodeCall", 't-'+ data.id)
    localStorage.setItem("prompt_data", JSON.stringify(data.data))
    router.push('/dashboard/editor/prompt')
  }

  const handleInputChange = () => {

  }

  const handleClone = () => {

  }

  const handleDelete = () => {

  }


  const handleActive = () =>
  {
    setActive(true)
  }

  const handleRun = async () => {
    const requestData = {
      "template":data.data.template,
      "model_id":data.data.model_id,
      "model":data.data.model,
      "supported_inputs":data.data.supported_inputs,
      "system_template":data.data.sys_template,
      "id":data.id,
      "userId":"0ca9a6e2-cc92-44a3-9862-199b4aaf3efa"
    }

    const response: AxiosResponse<any, any> = await nodeRun(requestData, data.id)
    const one_result = response.data.content
    setResult(one_result)
  }

  const handleMouseout = () => {
    setActive(false)
  };

  return (
    <>
      <Handle
          id={`${0}`}
          type="target"
          position={Position.Left}
          style={{ top: 40 , background: '#97AEF3', border: 'none', width: '10px', height: '10px' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}

        />
      {jsonArray && jsonArray.map((one: any, i) => (
        <Handle
          key={i +1}
          id={`${i +1}`}
          type="target"
          position={Position.Left}
          style={{ top: 29 * (i + 1) + 80, background: '#97AEF3', border: 'none', width: '10px', height: '10px' }}
          onConnect={(params) => console.log('handle onConnect', params)}
          isConnectable={isConnectable}
        />
      ))
      }

      <div onClick={handleActive} >
        <div className={` ${ active ?'flex':'hidden'} bg-[#24242A] border border-[#464F6F] gap-5 mx-10 rounded-[4px] items-center px-3`}>
          <div className='flex text-[#60A5FA] hover:text-[#385B86]' onClick={handleRun}><FaCaretRight /><p className='text-[12px] font-bold'> Run this prompt</p></div>
          <div className='text-[white] hover:text-[#7A7A7D]' onClick={handleClone}> <FaClone /></div>
          <div className='text-[white] hover:text-[#7A7A7D]' onClick={handleDelete}><FaTrashAlt /></div>
        </div>
        <div className={`w-[270px] flex flex-col border ${active?'border-[#464F6F]':'border-[#24242A]'} ml-1 rounded-[3px] pt-1 bg-[#24242A] mt-2`}>
          <div className="flex">
            <div className='flex cursor-pointer bg-[#24242A] pt-1 pb-1 gap-1 px-2 justify-between w-full'>
              <div className='flex'>
                <Image alt='star-icon' src={starIcon} className='w-3 h-4 mt-1' />
                <div>
                  <div className='text-white text-[12px] text-left'>{'Character Generator'}</div>
                  <div className='text-[#535358]'>{'ChatGpt-3.5-TPU'}</div>
                </div>
              </div>

              <div>
                <button className='text-[white]' onClick={handlelink}><FaExpand/></button>
              </div>
            </div>
          </div>

          <div className="bg-[#121218] p-2">
            <div className="w-full">
              <div onClick={handleCollapseClikced} className='flex justify-between'>
                <Image alt='star-icon' src={checkedIcon} className={`w-3 h-2 mt-1 ${iCollapse ? ' rotate-0 ' : ' rotate-180 '}`} />
                <div className='text-white text-[14px]'>INPUT <span className='rounded-2 bg-[#1F212E] text-[#8599D6]'>0/{jsonArray.length}</span></div>
              </div>
              <div className={iCollapse ? '' : 'hidden'}>
                {jsonArray && jsonArray.map((one: any, index: number) => (
                  <div className='mt-1' key={index}> {/* Add key={index} here */}
                    <input
                      id={`handle-${index}`}
                      className="w-full bg-[#121218] rounded-[3px] border border-size-1 border-[#464F6F] text-[#97AEF3] pl-1 text-[12px]"
                      type="editor"
                      value={one[0]}
                      onChange={handleInputChange}
                      key={index}
                      readOnly
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <div onClick={handleOCollapseClikced} className='flex justify-between'>
                <Image alt='star-icon' src={checkedIcon} className={`w-3 h-2 mt-1 ${oCollapse ? ' rotate-0 ' : ' rotate-180 '}`} />
                <div className='text-white text-[14px]'>OUTPUT</div>
              </div>
              <div className={oCollapse ? '' : 'hidden'}>
                <div >
                  <input className="w-full bg-[#121218] rounded-[3px] border border-size-1 border-[#464F6F] text-[#97AEF3] mt-1 pl-1  text-[12px]" type="editor" value={result} readOnly/>
                </div>
                <div className='mt-1 text-[#505056] text-[14px]'>
                  Input: 178 tokens
                  <input className="w-full bg-[#121218] rounded-[3px] border border-size-1 border-[#464F6F] text-[#97AEF3] mt-1 pl-1  text-[12px]" type="editor" placeholder='Last run: --' readOnly/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`handle-out`}
        style={{ bottom: 20, top: 'auto', background: '#97AEF3', border: 'none', width: '10px', height: '10px', right: '-12px' }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(CustomNode)