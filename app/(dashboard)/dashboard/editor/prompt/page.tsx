'use client'
import { useEffect, useState } from 'react'
import Split from "react-split";
import { createPrompt, getModelList, getPrompt, updatePrompt } from '../api';
import { FaHome, FaCloudUploadAlt, FaCaretRight, FaInfoCircle, FaExpand, FaCompressAlt, } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { Switch} from "@nextui-org/react";

let sel_input_id = 0;

export default function Prompt() {

  const [hideLLM, setHideLLM] = useState(false)
  const [attach, setAttach] = useState('')
  const [selPrompt,setSelPrompt] = useState<any>()
  const [modelId, setModelId] = useState<any>(0)
  const [modelList, setModelList] = useState<any>([])
  const [selectedModel, setSelectedModel] = useState<any>()
  const [syspromHide, setSyspromHide] = useState<boolean>(true)
  const [stop, setStop] = useState(2)
  const [topK, setTopk] = useState(40)
  const [topP, setTopP] = useState(0.95)
  const [doSample, setDoSample] = useState()
  const [typeP, setTypeP] = useState()
  const [watermark, setWatermark] = useState(false)
  const [maxToken, setMaxToken] = useState(4096)
  const [temperature, setTemperature] = useState(0.7)
  const [fullText, setFullText] = useState()
  const [frequency, setFrequency] = useState(1.85)
  const [tempPrmptText, setTempPrmtText] = useState("You can create custom inputs by entering {{}} and specify their values under 'Input' Here's an example: Write me an article that's word_count words long about article_content ")
  const [sysPrmptText, setSysPrmtText] = useState("You are a helpful assistant.")
  const [outputText, setOutputText] = useState()
  const [msgDlgFlag, setMsgDlgFlag] = useState(false)
  const [msgText, setMsgText] = useState<string>('')
  const [inputs, setInputs] = useState<any[]>([])
  const router = useRouter()
  const [prePenalty, setPrePenalty] = useState()
  const [nodeCall, setNodeCall] = useState<string | null>('false')

  let flag = false
  const fetchData = async () => {

    const storedWorkflowId = localStorage.getItem('prompt_id');
    if (storedWorkflowId == '0') {

    } else {

      await getPrompt(storedWorkflowId)
        .then(res => {

          // setNodes(res.data.nodes)
          // id = res.data.nodes.length - 1
          // setEdges(res.data.edges)
          // setTitle(res.data.name)
          // const inputs: any = []
          // res.data.nodes.forEach((one: any, index: number) => {
          //   if (one.type != 'input') {
          //     const data = { id: index, param: one.data.input }
          //     inputs.push(data)
          //   }
          // })
          // setQeustions(inputs)

        })
        .catch(err => {
          console.log('Error :', err)
        });
    }
  };

  useEffect(() => {

    const node_call = localStorage.getItem('nodeCall')
    setNodeCall(node_call)

    if (!flag) {

      getModelList()
        .then(res => {
          setModelList(res.data)
          console.log("model ::", res.data)
        })
        .catch((err) => {
          console.log("Err :", err)
        })

      flag = true
      if (nodeCall && node_call!.startsWith('t')) {
        setContent()

      } else {

        fetchData();
      }
    }

    return () => {

      if (window.location.pathname != '/dashboard/editor/prompt') {

        savePrompt()
        flag = false
      }
    }
  }, []);

  const savePrompt = () => {

    const prompt_id = localStorage.getItem("prompt_id")
    const data = {
      "template": tempPrmptText,
      "model_id": modelId,
      "model": modelList[modelId],
      "default_config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": 'null', "do_sample": false, "typical_p": 'null', "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": 'null', "frequency_penalty": 'null' },
      "config": { "stop": stop, "top_k": topK, "top_p": topP, "truncate": '', "do_sample": doSample, "typical_p": typeP, "watermark": watermark, "max_tokens": maxToken, "temperature": temperature, "return_full_text": prePenalty, "frequency_penalty": frequency },
      "supported_inputs": { "character1": "val", "character2": "lucky", "relationship": "friend" },
      "created_at": new Date(),
      "updated_at": new Date(),
      // "user_id": 1
    }

    if (prompt_id === '0') {

      createPrompt(data).
        then((res: any) => {
          if (res.status === 200) {

            localStorage.setItem("prompt_id", res.data.id.toString())
          }
        })
        .catch(err => {
          console.log("Error!", err)
        })

    } else {

      updatePrompt(data, prompt_id).
        then(res => {
          if (res.status === 200) {
            console.log("Success!")
          }
        })
        .catch(err => {
          console.log("Error!", err)
        })
    }
  }

  const handlePromptHide = () => {
    if (syspromHide) {
      setSyspromHide(false)
    } else {
      setSyspromHide(true)
    }

  }

  const setContent = () => {

    const strData = localStorage.getItem('prompt_data')
    
    if (strData) {

      const data = JSON.parse(strData)
      setSelPrompt(data)
      data.userId = data.userId
      setAttach('')
      localStorage.setItem( "prompt_id",data.id)
      setModelId(data.model_id)
      setStop(data.config.stop)
      setTopk(data.config.top_k)
      setTopP(data.config.top_p)
      setDoSample(data.config.do_sample)
      setTypeP(data.config.typical_p)
      setWatermark(data.config.watermark)
      setMaxToken(data.config.max_tokens)
      setTemperature(data.config.temperature)
      setFullText(data.config.return_full_text)
      setFrequency(data.config.frequency_penalty)
      setTempPrmtText(data.template)
      setSysPrmtText(data.system_template)
      setInputs(data.input)

      const regex = /\{\{\s+[\w\s]+\s+\}\}/g;

    const matches = data.template.match(regex);
    if (matches) {
      const newState: any = {};
      matches.forEach((element: any) => {
        const inputKey = element.substring(2, element.length - 2);;

        newState[inputKey] = '';
      });
      setInputs(newState);
    }
  }
  }
  const handleInput = (index: any, text: any) => {
    sel_input_id = index
    setMsgText(text)
    setMsgDlgFlag(true)
  }

  const handleLLM = () => {
    hideLLM ? setHideLLM(false) : setHideLLM(true)
  }

  const handleTmpPrmp = (e: any) => {
    setTempPrmtText(e.target.value);
    const regex = /\{\{\s+[\w\s]+\s+\}\}/g;

    const matches = e.target.value.match(regex);
    if (matches) {
      const newState: any = {};
      matches.forEach((element: any) => {
        const inputKey = element.substring(2, element.length - 2);;

        newState[inputKey] = '';
      });
      setInputs(newState);
    } else {
      if (e.target.value.includes('{{')) {
        setInputs([])
      }
    }
  };

  const handleSysPrmp = (e: any) => {
    setSysPrmtText(e.target.value)
  }

  const handleMsgClose = () => {


    setMsgDlgFlag(false)
    const sel_input = inputs[sel_input_id];
    const data = {
      "template": tempPrmptText,
      "model_id": modelId,
      "model": modelList[modelId],
      "default_config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": 'null', "do_sample": false, "typical_p": 'null', "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": 'null', "frequency_penalty": 'null' },
      "config": { "stop": stop, "top_k": topK, "top_p": topP, "truncate": '', "do_sample": doSample, "typical_p": typeP, "watermark": watermark, "max_tokens": maxToken, "temperature": temperature, "return_full_text": prePenalty, "frequency_penalty": frequency },
      "supported_inputs": { "character1": "val", "character2": "lucky", "relationship": "friend" },
      "created_at": new Date(),
      "updated_at": new Date(),
      // "user_id": 1
    }
    // sel_input.someProperty = msgText;

  }

  const handleMsgBox = (e: any) => {
    setMsgText(e)
  }

  const handleHome = () => {

    savePrompt()
    router.push('/dashboard/editor')

  }

  const handleStop = (e: any) => {
    setStop(e.target.value)
  }

  const handleTopK = (e: any) => {
    setTopk(e.target.value)
  }

  const handleTopP = (e: any) => {
    setTopP(e.target.value)
  }

  const handleMaxToken = (e: any) => {
    setMaxToken(e.target.value)
  }

  const handleTempr = (e: any) => {
    setTemperature(e.target.value)
  }

  const handlePrePenalty = (e: any) => {
    setPrePenalty(e.target.value)
  }

  const handleFreqPenal = (e: any) => {
    setFrequency(e.target.value)
  }

  const handleWaterMark = () => {
    if (watermark) {
      setWatermark(false)
    } else {
      setWatermark(true)
    }

  }

  const handleRunPrompt = () => {

  }

  const handleSelectChange = (e:any) => {

    const foundModel = modelList.find((one:any, index:number) => {
      return one.name === e.target.value;
    });
    
    if (foundModel) {
      const index = modelList.indexOf(foundModel);
      setModelId(index);
      setSelectedModel(foundModel);
    }
       
  }

  const handleClose = () => {
    console.log('here', selPrompt.model)
    
    const data = {
      "template": tempPrmptText,
      "model_id": selPrompt.model_id,
      "model": selPrompt.model,
      "default_config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": 'null', "do_sample": false, "typical_p": 'null', "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": 'null', "frequency_penalty": 'null' },
      "config": { "stop": stop, "top_k": topK, "top_p": topP, "truncate": '', "do_sample": doSample, "typical_p": typeP, "watermark": watermark, "max_tokens": maxToken, "temperature": temperature, "return_full_text": prePenalty, "frequency_penalty": frequency },
      "supported_inputs": inputs,
      "system_template":sysPrmptText,
      "created_at": selPrompt.created_at,
      "updated_at": new Date(),
    }

    localStorage.setItem('prompt_data', JSON.stringify(data))
    console.log(data)
    router.back()
  }

  console.log(modelList)
  return (
    <>
      {
        nodeCall && nodeCall!.startsWith('t') && (
          <div>
            <button className='text-white bg-[#3F3F46] rounded-[8px] w-[80px] h-[40px] mx-4 mt-2 mb-2' onClick={handleClose}>Close</button>
          </div>
        )

      }

      <div className="text-white bg-[#222224] px-4 h-full">
        {msgDlgFlag && (
          <div className={`${msgDlgFlag ? 'absolute' : 'hidden'} absolute w-full h-full z-20 flex items-center justify-center`}>
            <div className='bg-[#18181C] w-full h-full max-w-[700px] max-h-[500px] z-50 border border-[#9CA3AF] hover:border-[#4F4F54] p-6 rounded-[16px]'>
              <div className='text-[white] flex items-center px-2 pt-1 pb-1 font-bold justify-end'>
                <FaExpand className='cursor-pointer' onClick={handleMsgClose} />
              </div>
              <textarea
                placeholder="Enter your description"
                className="w-full h-[85%]  text-[18px] text-[white] bg-[transparent] mt-4 outline-none border-none focus:border-none resize-none"
                style={{ height: "100%!important" }}
                value={msgText}
                onChange={(e) => handleMsgBox(e.target.value)}
              />
            </div>
            <div className='absolute inset-0 backdrop-blur-sm  w-full h-full opacity-75 bg-[#1A1A1D]'></div>
          </div>
        )}
        <div className="flex justify-between text-[16px] pt-5">
          <div className="flex gap-8 items-center">
            <p className="text-[#95F0DF] bg-[#09090B] px-6 pt-2 pb-2 rounded-[8px] font-bold cursor-pointer">Editor</p>
            <p className="hover:bg-[#19191B] px-6 pt-2 pb-2 rounded-[8px] font-bold cursor-pointer">Stats</p>
            <p className="hover:bg-[#19191B] px-6 pt-2 pb-2 rounded-[8px] font-bold cursor-pointer">Settings</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#09090B] px-3 pt-2 pb-2 rounded-[8px]" onClick={handleHome}><FaHome className='text-[white] text-[18px]' /></button>
            <input className="bg-[#09090B] px-5 pt-2 pb-2 rounded-[8px] font-bold outline-none border-none focus:border-none" value={`[Demo] Story`} />
            <div className="bg-[#09090B] px-3 pt-2 pb-2 rounded-[8px] text-[#747476] font-bold flex items-center gap-2 cursor-pointer"><FaCloudUploadAlt className='text-[white]' />Published</div>
            <div className="bg-[#09090B] px-2 rounded-[8px] text-[12px] font-bold border border-[#747476] flex items-center gap-1">
              <div className='w-[6px] h-[6px] bg-[#4ADE80] rounded-full' />LIVE
            </div>
          </div>
          <div onClick={handleRunPrompt}>
            <p className="w-[75px] h-[40px] bg-[#FAFAFA] text-[black] flex justify-center  items-center font-bold rounded-[8px]"> <FaCaretRight className='' />Run</p>
          </div>
        </div>
        <div className="flex text-[14px] pt-5 gap-4">
          <div id="main_content" className='w-full pt-4 pb-4'>
            <Split direction="vertical" className='h-full'>
              <div className='flex gap-4'>
                <div className='w-full'>
                  <div className='flex'><div className='text-[16px] font-bold text-[#747476] flex items-center gap-1'>User Prompt <FaInfoCircle className='text-[#747476]' /></div></div>
                  <div className='mt-2'>
                    <textarea
                      placeholder="Enter your description"
                      value={tempPrmptText}
                      className="w-full  h-[370px] text-[18px] bg-[transparent] outline-none border-none focus:border-none resize-none"
                      onChange={handleTmpPrmp}
                    />
                  </div>
                </div>
                {
                  syspromHide && (
                    <div className='w-full'>
                      <div className=' flex gap-1 items-center'><p className='text-[16px] font-bold text-[#747476]'>System Prompt</p> <FaInfoCircle className='text-[#747476]' /></div>
                      <div className='mt-2'>
                        <textarea
                          placeholder="Enter your description"
                          value={sysPrmptText}
                          className="w-full  h-[370px] text-[18px] bg-[transparent] outline-none border-none focus:border-none resize-none"
                          onChange={handleSysPrmp}
                        />
                      </div>
                    </div>
                  )
                }

              </div>
              <div className='w-full'>
                <div className='bg-[#09090B] p-4 rounded-[8px]'>
                  <div className='font-bold'>OUTPUT</div>
                  <textarea
                    placeholder="To test your prompt, click 'Run'.\ once you are ready, make your API go live with 'Publish'!"
                    className="w-full bg-[transparent] p-2  h-[370px] outline-none border-none focus:border-none resize-none"
                    value={outputText}
                    readOnly
                  />
                </div>

              </div>
            </Split>
          </div>
          <div id="sidebar" className='max-w-[250px]'>
            <div className="bg-[#09090B] text-[#747476] px-4 pt-2 pb-3 rounded-[8px]">
              <div className="flex justify-between text-white text-bold">
                <div className='flex items-center gap-1 text-[14px] font-bold'>L L M <FaInfoCircle className='text-[#747476]' /></div>
                <button onClick={handleLLM} className={`${hideLLM ? 'none' : 'hidden'}`}><FaCompressAlt /></button>
              </div>
              <div className="flex justify-between text-bold pt-4">
                <p>Model</p>
                <select className='bg-transparent border border-none text-white focus:outline-none text-right' value={ selectedModel && selectedModel.name} onChange={handleSelectChange}>
                  {modelList && modelList.map((one: any, index: any) => (
                    <option key={one.name} value={modelList[index].name} className='bg-[black]' id={index}>{modelList[index].name}</option>
                  ))}
                </select>


              </div>
              <div className="flex justify-between">
                <p>System Prompt</p>
                <div className="text-[#95F0DF] cursor-pointer" onClick={handlePromptHide}>Hide</div>
              </div>
              <div className="flex justify-between">
                <p>Stop</p>
                <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={stop} onChange={handleStop} />
              </div>
              <div className="flex justify-between">
                <p>Top K</p>
                <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={topK} onChange={handleTopK} />
              </div>
              <div className="flex justify-between">
                <p>Top P</p>
                <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={topP} onChange={handleTopP} />
              </div>
              <div className="flex justify-between">
                <p>Watermark</p>
                <Switch isSelected={watermark} type='error' onValueChange={handleWaterMark} className={''} />
              </div>
              <div className="flex justify-between">
                <p>Max Tokens</p>
                <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={maxToken} onChange={handleMaxToken} />
              </div>
              <div className={`${hideLLM ? 'hidden' : 'flex'}  items-center justify-center cursor-pointer`} onClick={handleLLM}>
                <p className='text-white'>^</p>
              </div>
              {hideLLM ? (<div>
                <div className="flex justify-between">
                  <p>Temperature</p>
                  <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={temperature} onChange={handleTempr} />
                </div>
                <div className="flex justify-between">
                  <p>Presence Penalty</p>
                  <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={prePenalty} onChange={handlePrePenalty} />
                </div>
                <div className="flex justify-between">
                  <p>Frequency Penalty</p>
                  <input className='text-white w-[35px] bg-[transparent] text-[white]' dir="rtl" value={frequency} onChange={handleFreqPenal} />
                </div>
              </div>) : ('')}
            </div>
            <div className="bg-[#09090B] mt-3 px-4 pt-2 pb-3 rounded-[8px]">
              Input
              <div className='pt-3'>
                {inputs && Object.entries(inputs).map((one, index) => (
                  <div className='flex justify-between pt-2'>
                    <p className=' text-[#95F0DF] border border-[#324444] bg-[#262F2F] px-1 rounded-[4px]'>{one[0]}</p>
                    <div className='cursor-pointer' onClick={() => handleInput(index, one[1])}><FaExpand /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#09090B] mt-3 px-4 pt-2 pb-3 rounded-[8px]">
              <div className='flex justify-between'>
                <p>Datasets</p>
                <p className='text-[#95F0DF] cursor-pointer'>Add</p>
              </div>
              <div className='text-[#747476] pt-3'>Supports .txt or text-based .pdf files. Max 1.5 MB</div>
            </div>
            <div className="bg-[#09090B] mt-3 px-4 pt-2 pb-3 rounded-[8px]">
              <p className=''>API</p>
              <p className='white-space: pre-wrap; pt-3'>{`curl --location 'https://pms.chasm.net/api/prompt
                --header 'Content-Type: application/json' }`}</p>
              <p>{`--header 'Authorization: Bearer {{ Your API Key }}' }
                --data '{"input":{"interaction":"","character_1":`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
