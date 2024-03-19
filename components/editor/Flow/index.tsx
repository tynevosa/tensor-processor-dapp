'use client'
import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';

import CustomNode from './customNode';
import CustomEdge from './customEdge'
import SlideBar from './slidebar';
import OutputBar from './outsidebar'
import ExcuteBar from './excutebar';

import 'reactflow/dist/style.css';
import '@/styles/overview.css';

const nodes = [
  {
    id: '1',
    type: 'input',
    style:{
      background:'#232939',
      color:'#96ADF2',
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
    data: {
      label: 'Output Node',
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '3',
    type: 'customNode',
    position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
      },
      id:1, 
      Ihandle:1, 
      Ohandle:2, 
      input:2
    },
  },
];

const edges = [
  { id: 'e1-2', type:'' , source: '1', target: '2', style:{Background:'232939',  color:'#96ADF2',
  border: '1px solid #7183B6'}},
  { id: 'e1-3', type:'' , source: '1', target: '3', animated: true },

];

const myNodeTypes = {
  customNode: CustomNode,
};

const myEdgeTypes = {
  customEdge:CustomEdge
}

const minimapStyle = {
  height: 120,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const OverviewFlow = () => {

  const reactFlowWrapper = useRef(null);
  const [nodeEle, setNodes, onNodesChange] = useNodesState<any>(nodes);
  const [edgesEle, setEdges, onEdgesChange] = useEdgesState(edges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  

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
      
      if(reactFlowInstance === null) return

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const jsonStructData = [
        {id:1, Ihandle:1, Ohandle:2, input:2},
        {id:2, Ihandle:2, Ohandle:1, input:3},
        {id:3, Ihandle:1, Ohandle:0, input:1},
        {id:4, Ihandle:1, Ohandle:1, input:1}
      ];
      
      const newNode = {
        id: getId(),
        type:'customNode',
        position,
        data: jsonStructData[type]
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <div className='dndflow'>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodeEle}
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
          <SlideBar />
          <OutputBar />
          <ExcuteBar />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default OverviewFlow;
