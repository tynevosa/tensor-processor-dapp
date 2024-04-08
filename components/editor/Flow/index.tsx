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
import { getWorkflow, createWorkflow, updateWorkflow, nodeRun } from '@/app/(dashboard)/dashboard/editor/api';

import 'reactflow/dist/style.css';
import '@/styles/overview.css';
import { AxiosResponse } from 'axios';
import {FaBolt,FaExpand} from "react-icons/fa";

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
    },
    position: { x: 300, y: 60 },
  }
];

type PromptModel = {
  id: number;
  template: string;
  generated_prompt: string;
  result: string;
  title: string;
  model_id: number;
  config: any;
  system_template: string;
  published_template: string;
  published_system_template: string;
  published_config: any;
  tiptap_output: any;
  tiptap_system_output: any;
  title_tsvector: string;
  models: any;
  vectors: any;
  supported_inputs: any;
  supported_system_inputs: any;
  created_at: string;
  updated_at: string;
  published_at: string;
  user_id: number;
}

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

let change_input_id:any = '';
let change_node_index:any = 0;

const OverviewFlow: React.FC = () => {

  // const router = useRouter();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edgesEle, setEdges, onEdgesChange] = useEdgesState(edges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [title, setTitle] = useState('UNTITLED')
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [questions, setQeustions] = useState<any>([])
  const [msgText, setMsgText] = useState('')
  const [msgDlgFlag, setMsgDlgFlag] = useState(true)
  const [msgTitle, setMsgTitle] = useState('')

  const fetchData = async () => {

    const storedWorkflowId = localStorage.getItem('workflow_id');
    setWorkflowId(storedWorkflowId);

    if (storedWorkflowId == '0') {

    } else {

      await getWorkflow(storedWorkflowId)
        .then(res => {

          setNodes(res.data.nodes)
          id = res.data.nodes.length - 1
          setEdges(res.data.edges)
          setTitle(res.data.name)
          const inputs: any = []
          res.data.nodes.forEach((one: any, index: number) => {
            if (one.type != 'input') {
              const data = { id: index, param: one.data.input }
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
    { "template": "I want to make funny story to hear my young sister\n{{ character1 }}{{ character2 }}\nrelationship\n{{ relationship }}\nmake funny story", "model_id": 9, "model": "mistral-7b-instruct", "default_config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": null, "do_sample": false, "typical_p": null, "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": null, "frequency_penalty": null }, "config": { "stop": [], "top_k": 40, "top_p": 0.95, "truncate": null, "do_sample": false, "typical_p": null, "watermark": false, "max_tokens": 4096, "temperature": 0.7, "return_full_text": true, "frequency_penalty": 0 }, "input": { "character1": "val", "character2": "lucky", "relationship": "friend" }, "system_template": "You are a helpful assistant.", "id": "6294", "userId": "0ca9a6e2-cc92-44a3-9862-199b4aaf3efa" },
    { "template": "Context: {{ informations }}\n\nQuestion: {{ question }}", "model_id": 2, "model": "gpt-3.5-turbo-1106", "default_config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "input": { "informations": "lucky", "question": "who are you" }, "system_template": "You are a chatbot. Your task is to answer questions based on the context. If the answer is not in the context, respond with &quot;I have no information on that&quot; and nothing more than that.", "id": "6278", "userId": "0ca9a6e2-cc92-44a3-9862-199b4aaf3efa" },
    { "template": "Read this article and forsee which 3 popular search terms might bring the article up in a Google search. Provide a numbered list of these search terms.\n\nArticle: {{ article }} \n\nOutput:", "model_id": 2, "model": "gpt-3.5-turbo-1106", "default_config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "input": { "article": "about drawing" }, "system_template": "You are an SEO expert", "id": "6280", "userId": "0ca9a6e2-cc92-44a3-9862-199b4aaf3efa" },
    { "template": "Rewrite &quot;{{ answer }}&quot; into the style of a cute puppy managing a pet store. Do not add new information.", "model_id": 2, "model": "gpt-3.5-turbo-1106", "default_config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "config": { "stop": [], "top_k": 40, "top_p": 1, "max_tokens": 4096, "temperature": 0.7, "presence_penalty": 0, "frequency_penalty": 0 }, "input": { "answer": "I am not bot" }, "system_template": "You are a chat bot.", "id": "6279", "userId": "0ca9a6e2-cc92-44a3-9862-199b4aaf3efa" }
  ];

  const saveWorkFlow = () => {

    const work_id = localStorage.getItem("workflow_id")

    if (work_id === '0') {

      const data = {
        "name": title,
        "nodes": nodes,
        "edges": edgesEle,
        "created_at": new Date(),
        "updated_at": new Date(),
        "user_id": "7fcc92e1-03cf-4834-a6d2-924bc81c797f",
        "sequence": []
      }

      createWorkflow(data).
        then(res => {
          if (res.status === 200) {

            localStorage.setItem("workflow_id", res.data.id.toString())
          }
        })
        .catch(err => {
          console.log("Error!")
        })

    } else {

      const data = {
        "name": title,
        "nodes": nodes,
        "edges": edgesEle,
        "created_at": new Date(),
        "updated_at": new Date(),
        "sequence": [],
      }

      updateWorkflow(data, work_id).
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
      const inputs = prompt.input
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

  const handleRunPromp = async () => {
    
    await saveWorkFlow()

    edgesEle.forEach((oneEdge:any, index) => {
    
      if (oneEdge.targetHandle === null) {
        const value = oneEdge.target + '-' + oneEdge.source;
        edgesEle[index].targetHandle = value;
      }

      if (oneEdge.sourceHandle === null) {
        const value = oneEdge.source + '-' + oneEdge.target;
        edgesEle[index].sourceHandle = value;
      }

    });

    const data:any = {}
    console.log(edgesEle)
    questions.forEach((oneQue: any) => {
      if (oneQue.param) {
        Object.entries(oneQue.param).forEach(([key, value]: [string, any]) => {
          data[key] = value;
        });
      }
    });

    const jsonArray = JSON.stringify(data);
    const comitData = {
      input:data
    }
    const workflow_id = localStorage.getItem('workflow_id');
    const result = await nodeRun(comitData, workflow_id)
    console.log(result)
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



  const handleInputChange = (id: any, index: any , text:string, title:string) => {
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

    const string = msgText;
    const indexes = change_input_id.split("-");
    
    const updatedNodes = nodes.map((node, i) => {
      if (i === change_node_index) {
        console.log(node.data)
        const updatedInput = {
          ...node.data.input,
          [Object.keys(node.data.input)[indexes[2]]]: string 
        };
        
        return {
          ...node,
          data: {
            ...node.data,
            input: updatedInput
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
        const data = { id: index, param: one.data.input }
        inputs.push(data)
      }
    })
    setQeustions(inputs)
    setMsgDlgFlag(true)
  }

  return (
    <div className='dndflow'>
      <div className={`${msgDlgFlag ? 'hidden' :'absolute' } absolute w-full h-full z-20 flex items-center justify-center`}>
        <div className='bg-[#18181C] w-full h-full max-w-[700px] max-h-[500px] z-50 border border-[#9CA3AF] hover:border-[#4F4F54] p-6 rounded-[16px]'>
          <div className='bg-[#2B3654] border border-[#B4C4F9] text-[white] flex items-center px-2 pt-1 pb-1 font-bold justify-between'>
            <div className='flex items-center gap-1'><FaBolt className='text-[yellow]'/> {msgTitle}</div>
            <FaExpand className='cursor-pointer' onClick={handleMsgClose}/>
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
          <OutputBar question={questions} queChange={handleInputChange} />
          <ExcuteBar run={handleRunPromp} />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default OverviewFlow;
