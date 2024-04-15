'use client'
import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Edge,
} from 'reactflow';

import CustomNode from './customNode';
import CustomEdge from './customEdge'
import SlideBar from './slidebar';
import OutputBar from './outsidebar'
import ExcuteBar from './excutebar';
import { getWorkflow, createWorkflow, updateWorkflow, nodeRun, publicWorkFlow } from '@/app/(dashboard)/dashboard/editor/api';

import 'reactflow/dist/style.css';
import '@/styles/overview.css';
import { FaBolt, FaExpand } from "react-icons/fa";


const initialNodes = [
  {
    id: '1',
    type: 'input',
    style: {
      background: '#232939',
      color: '#96ADF2',
      border: '1px solid #7183B6'
    },
    data: {
      label: 'Entrypoint',
    },
    position: { x: 250, y: 10 },
  },
  {
    id: '2',
    type: 'output',
    style: {
      background: '#232939',
      color: '#96ADF2',
      border: '1px solid #7183B6'
    },
    data: {
      label: 'Outpoint',
      workflow_outputs: {
        "2-0": {
          id: "2-0",
          key: "output",
          value: "wdw"
        }
      } // Added closing brace here
    },
    position: { x: 300, y: 60 },
  }
];


const edges: Edge<any>[] = [];

const myNodeTypes = {
  customNode: CustomNode,
};

const myEdgeTypes = {
  customEdge: CustomEdge
}

const minimapStyle = {
  height: 120,
};

let id = 2;
const getId = () => `dndnode_${id++}`;
let flag = false

let change_input_id: any = '';
let change_node_index: any = 0;

const OverviewFlow: React.FC = () => {

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edgesEle, setEdges, onEdgesChange] = useEdgesState(edges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [title, setTitle] = useState('UNTITLED')
  const [questions, setQeustions] = useState<any>([])
  const [msgText, setMsgText] = useState('')
  const [msgDlgFlag, setMsgDlgFlag] = useState(true)
  const [msgTitle, setMsgTitle] = useState('')
  const [outResult, setOutResult] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const fetchData = async () => {

    const storedWorkflowId = localStorage.getItem('workflow_id');

    if (storedWorkflowId == '0') {

    } else {

      await getWorkflow(storedWorkflowId)
        .then(res => {

          res.data.nodes.forEach((element: any) => {

            if (element.id === '1') {
              element.type = 'input'

            } else if (element.id === '2') {

              element.type = 'output'
            } else {

              element.type = 'customNode'
            }
          })

         
          id = res.data.nodes.length - 1
          setEdges(res.data.edges)
          setTitle(res.data.name)
          const inputs: any = []
          const noode_flag = localStorage.getItem('nodeCall')

          if (noode_flag && noode_flag!.startsWith('t')) {
            console.log(nodes)
            console.log(noode_flag.slice(2))
            const prompt: any | null = localStorage.getItem('prompt_data')
            const promptdata = JSON.parse(prompt)
            console.log(promptdata)
            res.data.nodes.forEach((element:any) => {
              if (element.id === noode_flag.slice(2)) {
                element.data = promptdata
              }

            });

            localStorage.removeItem('prompt_data')
            localStorage.removeItem('prompt_id')
            localStorage.removeItem('nodeCall')
          }

          setNodes(res.data.nodes)

          res.data.nodes.forEach((one: any, index: number) => {
            if (one.id != '1' && one.id != '2') {
              console.log('heree', one)
              const data = { id: index, param: one.data.supported_inputs }
              inputs.push(data)
            }
          })
          setQeustions(inputs)


        })
        .catch(err => {
          console.log('Error :', err)
        });
    }
  };

  useEffect(() => {
    //alert('e')
    if (!flag) {

      flag = true
      fetchData();
    }

    return () => {

      if (window.location.pathname != '/dashboard/editor/workflow') {

        saveWorkFlow()
        flag = false
      }
    }
  }, [nodes]);

  const jsonStructData = [
    { "template": "I want to make funny story to hear my young sister\n{{ character1 }}{{ character2 }}\nrelationship\n{{ relationship }}\nmake funny story", "model_id": 1, "model": { "name": "llama-2-70b", "providers": { "id": 1, "name": "openai" }, "config_steps": { "stop": { "max": 4, "min": 0 }, "top_k": { "max": 100, "min": 1, "step": 1 }, "top_p": { "max": 1, "min": 0, "step": 0.01 }, "truncate": { "max": null, "min": 0 }, "typical_p": { "max": 1, "min": 0.01, "step": 0.01 }, "max_tokens": { "max": 4096, "min": 1, "step": 1 }, "temperature": { "max": 2, "min": 0, "step": 0.05 }, "presence_penalty": { "max": 2, "min": -2, "step": 0.01 }, "frequency_penalty": { "max": 2, "min": -2, "step": 0.01 } } }, "default_config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": null, "do_sample": false, "typical_p": null, "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": null, "frequency_penalty": null }, "config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": null, "do_sample": false, "typical_p": null, "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": true, "frequency_penalty": 0 }, "supported_inputs": { "character1": "val", "character2": "lucky", "relationship": "friend" }, "system_template": "You are a helpful assistant.", "id": "6294", "userId": 1 },
    { "template": "Context: {{ informations }}\n\nQuestion: {{ question }}", "model_id": 1, "model": { "name": "llama-2-70b", "providers": { "id": 1, "name": "openai" }, "config_steps": { "stop": { "max": 4, "min": 0 }, "top_k": { "max": 100, "min": 1, "step": 1 }, "top_p": { "max": 1, "min": 0, "step": 0.01 }, "truncate": { "max": null, "min": 0 }, "typical_p": { "max": 1, "min": 0.01, "step": 0.01 }, "max_tokens": { "max": 4096, "min": 1, "step": 1 }, "temperature": { "max": 2, "min": 0, "step": 0.05 }, "presence_penalty": { "max": 2, "min": -2, "step": 0.01 }, "frequency_penalty": { "max": 2, "min": -2, "step": 0.01 } } }, "default_config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "supported_inputs": { "informations": "lucky", "question": "who are you" }, "system_template": "You are a chatbot. Your task is to answer questions based on the context. If the answer is not in the context, respond with &quot;I have no information on that&quot; and nothing more than that.", "id": "6278", "userId": 1 },
    { "template": "Read this article and forsee which 3 popular search terms might bring the article up in a Google search. Provide a numbered list of these search terms.\n\nArticle: {{ article }} \n\nOutput:", "model_id": 1, "model": { "name": "llama-2-70b", "providers": { "id": 1, "name": "openai" }, "config_steps": { "stop": { "max": 4, "min": 0 }, "top_k": { "max": 100, "min": 1, "step": 1 }, "top_p": { "max": 1, "min": 0, "step": 0.01 }, "truncate": { "max": null, "min": 0 }, "typical_p": { "max": 1, "min": 0.01, "step": 0.01 }, "max_tokens": { "max": 4096, "min": 1, "step": 1 }, "temperature": { "max": 2, "min": 0, "step": 0.05 }, "presence_penalty": { "max": 2, "min": -2, "step": 0.01 }, "frequency_penalty": { "max": 2, "min": -2, "step": 0.01 } } }, "default_config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "supported_inputs": { "article": "about drawing" }, "system_template": "You are an SEO expert", "id": "6280", "userId": 1 },
    { "template": "Rewrite &quot;{{ answer }}&quot; into the style of a cute puppy managing a pet store. Do not add new information.", "model_id": 1, "model": { "name": "llama-2-70b", "providers": { "id": 1, "name": "openai" }, "config_steps": { "stop": { "max": 4, "min": 0 }, "top_k": { "max": 100, "min": 1, "step": 1 }, "top_p": { "max": 1, "min": 0, "step": 0.01 }, "truncate": { "max": null, "min": 0 }, "typical_p": { "max": 1, "min": 0.01, "step": 0.01 }, "max_tokens": { "max": 4096, "min": 1, "step": 1 }, "temperature": { "max": 2, "min": 0, "step": 0.05 }, "presence_penalty": { "max": 2, "min": -2, "step": 0.01 }, "frequency_penalty": { "max": 2, "min": -2, "step": 0.01 } } }, "default_config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "supported_inputs": { "answer": "I am not bot" }, "system_template": "You are a chat bot.", "id": "6279", "userId": 1 }
  ];

  const saveWorkFlow = async () => {

    const work_id : any = localStorage.getItem("workflow_id")
    const copynodes = nodes.map(one => one)

    copynodes.forEach(element => {
      console.log(element.type)
      if (element.id === "1") {
        element.type = 'workflow_input'

      } else if (element.id === "2") {
        element.type = 'workflow_output'
      } else {
        element.type = 'workflow_prompt'
      }
    })

    console.log('wef', copynodes)
    console.log('ang', nodes)
    const data : any = {
      "name": title,
      "nodes": copynodes,
      "edges": edgesEle,
      "created_at": new Date(),
      "updated_at": new Date(),
      // "user_id": 1,
      "sequence": []
    }

    console.log(data)

    if (work_id === '0') {

      await createWorkflow(data).
        then(res => {
          if (res.status === 200) {

            localStorage.setItem("workflow_id", res.data.id.toString())
          }
        })
        .catch(err => {
          console.log("Error!")
        })

    } else {

      data['id'] = parseInt(work_id)
      await updateWorkflow(data, work_id).
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

  const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event: any) => {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {

      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      if (reactFlowInstance === null) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const prompt = jsonStructData[type]
      const inputs = prompt.supported_inputs
      const newNode = {
        id: getId(),
        type: 'customNode',
        position,
        data: prompt
      };
      setNodes((nds) => nds.concat(newNode));
      const data = { id: id, param: inputs }
      setQeustions((prevQuestions: any) => [...prevQuestions, data])
    },
    [reactFlowInstance, setNodes],
  );

  const publicwork = async () => {

    const work_id: any = localStorage.getItem("workflow_id")
    const copynodes = nodes.map(one => one)

    copynodes.forEach(element => {
      if (element.id === '1') {
        element.type = 'workflow_input'
      } else if (element.id === '2') {
        element.type = 'workflow_output'
      } else {
        element.type = 'workflow_prompt'
      }
    })

    const data = {
      id: parseInt(work_id),
      name: title,
      nodes: copynodes,
      edges: edgesEle,
      created_at: new Date(),
      updated_at: new Date(),
      status: true,
      // user_id: 1,
      sequence: []
    }

    await publicWorkFlow(data, work_id)

    nodes.forEach(element => {
      if (element.id === '1') {
        element.type = 'input'
      } else if (element.id === '2') {
        element.type = 'output'
      } else {
        element.type = 'custom'
      }
    })
  }

  const handleRunPromp = async () => {
    
    setIsRunning(true)
    edgesEle.forEach((oneEdge: any, index) => {

      if (oneEdge.targetHandle === null || oneEdge.targetHandle === "0") {
        // const value = oneEdge.target + '-' + oneEdge.source;
        const value = oneEdge.target + '-' + '0';
        edgesEle[index].targetHandle = value;
      }

      if (oneEdge.sourceHandle === null) {
        const value = oneEdge.source + '-' + oneEdge.target;
        edgesEle[index].sourceHandle = value;
      }

    });

    const data: any = {}
    console.log(edgesEle)
    questions.forEach((oneQue: any) => {
      if (oneQue.param) {
        Object.entries(oneQue.param).forEach(([key, value]: [string, any]) => {
          data[key] = value;
        });
      }
    });

     await saveWorkFlow()
     await publicwork()

    const jsonArray = JSON.stringify(data);
    const comitData = {
      input: data
    }
    const workflow_id = localStorage.getItem('workflow_id');
    await nodeRun(comitData, workflow_id)
    .then((result:any) => {
      console.log(result)
      setOutResult(result.data.output)
    })
    .catch((err:any) => {
      console.log("runErr :" , err)
      setIsRunning(false)
    })
   
    setIsRunning(false)
    // nodes.forEach(async oneNode => {
    //   if (oneNode.type != 'input') {
    //     const requestData = {
    //       "template": oneNode.data.template,
    //       "model_id": oneNode.data.model_id,
    //       "model": oneNode.data.model,
    //       "input": oneNode.data.input,
    //       "system_template": oneNode.data.sys_template,
    //       "id": oneNode.id,
    //       "userId": "0ca9a6e2-cc92-44a3-9862-199b4aaf3efa"
    //     }

    //     const response: AxiosResponse<any, any> = await nodeRun(requestData)
    //     const one_result = response.data.content

    //     const replace_nodes: { target_node: string; handle: string | null | undefined; }[] = [];
    //     edgesEle.forEach(oneEdge => {
    //       if (oneEdge.source === oneNode.id) {
    //         const data = { target_node: oneEdge.target, handle: oneEdge.targetHandle }
    //         replace_nodes.push(data)
    //       }
    //     })

    //     replace_nodes.forEach(oneReplace => {
    //       nodes.forEach(targetNode => {
    //         if (oneReplace.target_node === targetNode.id && oneReplace.handle) {
    //           const handle_index = parseInt(oneReplace.handle)
    //           targetNode.data.input = Object.fromEntries(
    //             Object.entries(targetNode.data.input).map((entry, index) => {
    //               return index === handle_index ? [entry[handle_index], one_result] : entry;
    //             })
    //           );
    //         }
    //       })
    //     })
    //   }
    // });
  }

  const handleTitleChange = (e: any) => {

    setTitle(e.target.value)
  }

  const outputResult = () => {

    setMsgText(outResult)
    setMsgDlgFlag(false);
    setMsgTitle('Result')

  }

  const handleInputChange = (id: any, index: any, text: string, title: string) => {
    change_input_id = id;
    change_node_index = index
    setMsgText(text)
    setMsgDlgFlag(false);
    setMsgTitle(title)
  };


  const handleMsgBox = (e: any) => {

    setMsgText(e.target.value)
  }

  const handleMsgClose = () => {

    if(msgTitle === 'Result')
    {
      setMsgDlgFlag(true)
      return
    }

    const string = msgText;
    const indexes = change_input_id.split("-");

    const updatedNodes = nodes.map((node, i) => {
      if (i === change_node_index) {
        console.log(node.data)
        const updatedInput = {
          ...node.data.supported_inputs,
          [Object.keys(node.data.supported_inputs)[indexes[2]]]: string
        };

        return {
          ...node,
          data: {
            ...node.data,
            supported_inputs: updatedInput
          }
        };
      } else {
        return node;
      }
    });

    setNodes(updatedNodes)

    const inputs: any = []
    updatedNodes.forEach((one: any, index: number) => {
      if (one.type != 'input') {
        const data = { id: index, param: one.data.supported_inputs }
        inputs.push(data)
      }
    })
    setQeustions(inputs)
    setMsgDlgFlag(true)
  }

  console.log()

  return (
    <>
      {/* <Prompt/> */}
      <div className='dndflow'>
        <div className={`${msgDlgFlag ? 'hidden' : 'absolute'} absolute w-full h-full z-20 flex items-center justify-center`}>
          <div className='bg-[#18181C] w-full h-full max-w-[700px] max-h-[500px] z-50 border border-[#9CA3AF] hover:border-[#4F4F54] p-6 rounded-[16px]'>
            <div className='bg-[#2B3654] border border-[#B4C4F9] text-[white] flex items-center px-2 pt-1 pb-1 font-bold justify-between'>
              <div className='flex items-center gap-1'><FaBolt className='text-[yellow]' /> {msgTitle}</div>
              <FaExpand className='cursor-pointer' onClick={handleMsgClose} />
            </div>
            <textarea
              placeholder="Enter your description"
              value={msgText}
              className="w-full h-[85%] text-[18px] text-[white] bg-[transparent] mt-4"
              onChange={handleMsgBox}
            />
          </div>
          <div className='absolute inset-0 backdrop-blur-sm  w-full h-full opacity-75 bg-[#1A1A1D]'></div>
        </div>
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edgesEle}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              attributionPosition="top-right"
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={myNodeTypes}
              edgeTypes={myEdgeTypes}
              fitView
            >
              <MiniMap style={minimapStyle} zoomable pannable />
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
            <SlideBar workflow={title} titleChange={handleTitleChange} />
            <OutputBar question={questions} queChange={handleInputChange} output={outResult} showResult={outputResult}/>
            <ExcuteBar run={handleRunPromp} runState={isRunning} />
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;