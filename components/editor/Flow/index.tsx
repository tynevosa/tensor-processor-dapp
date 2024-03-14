'use client'
import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';

import CustomNode from './CustomNode';

import 'reactflow/dist/style.css';
import './overview.css';

import { MarkerType, Position } from 'reactflow';
import { Sidebar } from 'lucide-react';
import SlideBar from './slidebar';

const nodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Input Node',
    },
    position: { x: 250, y: 0 },
    dragHandle: '.custom-drag-handle',
  },
  {
    id: '2',
    data: {
      label: 'Default Node',
    },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: {
      label: 'Output Node',
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      selects: {
        'handle-0': 'smoothstep',
        'handle-1': 'smoothstep',
      },
    },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: 'custom style',
    },
    className: 'circle',
    style: {
      background: '#2B6CB0',
      color: 'white',
    },
    position: { x: 400, y: 200 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '6',
    type: 'output',
    style: {
      background: '#63B3ED',
      color: 'white',
      width: 100,
    },
    data: {
      label: 'Node',
    },
    position: { x: 400, y: 325 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    type: 'default',
    className: 'annotation',
    data: {
      label: (
        <>
          On the bottom left you see the <strong>Controls</strong> and the bottom right the{' '}
          <strong>MiniMap</strong>. This is also just a node 🥳
        </>
      ),
    },
    draggable: false,
    selectable: false,
    position: { x: 150, y: 400 },
  },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'smoothstep',
    sourceHandle: 'handle-0',
    data: {
      selectIndex: 0,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    type: 'smoothstep',
    sourceHandle: 'handle-1',
    data: {
      selectIndex: 1,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];


const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

 const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);

let id = 0;
const getId = () => `dndnode_${id++}`;

const OverviewFlow = () => {
  const [NodeEle, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesEle, setEdges, onEdgesChange] = useEdgesState(edges);
  
  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const edgesWithUpdatedTypes = edgesEle.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = NodeEle.find((node) => node.type === 'custom').data.selects[edge.sourceHandle];
      edge.type = edgeType;

      //edge.type = edgeType;
    }

    return edge;
  });


  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event:any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );


  return (
    <ReactFlowProvider>
      <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
    <SlideBar/>
    </ReactFlowProvider>
    
  );
};

export default OverviewFlow;
