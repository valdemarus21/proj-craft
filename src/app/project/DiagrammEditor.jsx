import React, { useState, useEffect } from 'react';
import ReactFlow, {
	addEdge,
	Background,
	Controls,
	MiniMap,
	useNodesState,
	useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const nodeTypes = {
	textNode: TextNode,
};

function TextNode({ data }) {
	const [text, setText] = useState(data.label);

	const handleChange = (e) => {
		setText(e.target.value);
		data.label = e.target.value;
	};

	return (
		<div style={{ padding: '10px', width: '100%', height: '100%' }}>
			<textarea
				value={text}
				onChange={handleChange}
				placeholder="Enter something here ..."
				style={{
					width: '100%',
					height: '100%',
					border: 'none',
					backgroundColor: 'transparent',
					resize: 'none',
					outline: 'none',
				}}
			/>
		</div>
	);
}

export default function DiagramEditor({ onSave }) {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const [selectedTool, setSelectedTool] = useState('pointer');
	const [lastAddedNode, setLastAddedNode] = useState(null);
	const [isToolActive, setIsToolActive] = useState(false);
	const [cursorStyle, setCursorStyle] = useState('default');
	const [selectedColor, setSelectedColor] = useState('#3758F9'); 
	const [borderWidth, setBorderWidth] = useState(2); 

	const saveToHistory = (newNodes, newEdges) => {
		const validatedNodes = newNodes.map((node) => ({
			...node,
			type: node.type || 'default', 
		}));
		setNodes(validatedNodes);
		setEdges(newEdges);
	};

	const addNode = (type, position) => {
		const id = `${type}-${Date.now()}`;
		let newNode = {
			id,
			position,
			data: { label: '' },
			type: type === 'text' ? 'textNode' : 'default',
			style: {
				width: 150,
				height: 100,
				backgroundColor: type.includes('hollow') ? 'transparent' : '#e0e0e0',
				border: borderWidth > 0 ? `${borderWidth}px solid ${selectedColor}` : 'none', 
			},
		};

		
		if (type === 'hexagon') {
			newNode.style = {
				width: '150px',
				height: '100px',
				backgroundColor: type.includes('hollow') ? 'transparent' : '#e0e0e0',
				border: borderWidth > 0 ? `${borderWidth}px solid ${selectedColor}` : 'none',
				clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', 
			};
		}

		const updatedNodes = [...nodes, newNode];
		setLastAddedNode(newNode);
		saveToHistory(updatedNodes, edges);
		setIsToolActive(false);
		setCursorStyle('default');
	};

	const handleCanvasClick = (event) => {
		if (isToolActive && reactFlowInstance && selectedTool !== 'pointer') {
			const position = reactFlowInstance.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			addNode(selectedTool, position);
			setSelectedTool('pointer');
		}
	};

	const updateNodeStyles = () => {
		const updatedNodes = nodes.map((node) => ({
			...node,
			style: {
				...node.style,
				border: borderWidth > 0 ? `${borderWidth}px solid ${selectedColor}` : 'none',
			},
		}));
		setNodes(updatedNodes);
	};

	const clearCanvas = () => {
		setNodes([]);
		setEdges([]);
	};

	useEffect(() => {
		updateNodeStyles();
	}, [selectedColor, borderWidth]);

	return (
		<div>
			<div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
				
				{[
					'pointer',
					'rectangle',
					'hollowRectangle',
					'circle',
					'hollowCircle',
					'text',
					'hexagon',
				].map((tool) => (
					<button
						key={tool}
						className={`tool-button px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${
							selectedTool === tool ? 'active' : ''
						}`}
						onClick={() => {
							setSelectedTool(tool);
							setCursorStyle(tool === 'pointer' ? 'default' : 'crosshair');
							setIsToolActive(tool !== 'pointer');
						}}>
						{tool.charAt(0).toUpperCase() + tool.slice(1)}
					</button>
				))}
			</div>

			
			<div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
				<div>
					<label style={{ marginRight: '10px' }}>Choose Border Color:</label>
					<input
						type="color"
						value={selectedColor}
						onChange={(e) => setSelectedColor(e.target.value)}
						style={{ cursor: 'pointer' }}
					/>
				</div>
				<div>
					<label style={{ marginRight: '10px' }}>Border Width:</label>
					<input
						type="number"
						value={borderWidth}
						min="0"
						max="10"
						step="1"
						onChange={(e) => setBorderWidth(Number(e.target.value))}
						style={{ width: '50px' }}
					/>
				</div>
			</div>

			<div
				style={{
					height: 500,
					border: '1px solid #ccc',
					position: 'relative',
					cursor: cursorStyle,
				}}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={(params) => {
						const updatedEdges = addEdge(params, edges);
						saveToHistory(nodes, updatedEdges);
						setEdges(updatedEdges);
					}}
					onInit={setReactFlowInstance}
					onClick={handleCanvasClick}
					nodeTypes={nodeTypes}>
					<MiniMap />
					<Controls />
					<Background color="#aaa" gap={16} />
				</ReactFlow>
			</div>

			<div style={{ marginTop: '10px' }}>
				<button
					className="bg-blue-500 text-white px-4 py-2 rounded"
					onClick={() =>
						onSave({
							nodes: nodes.map((node) => ({
								...node,
								position: { ...node.position }, 
								data: { ...node.data },
								type: node.type || 'default', 
								style: node.style || {}, 
							})),
							edges: edges.map((edge) => ({
								...edge,
								source: edge.source,
								target: edge.target,
								type: edge.type || 'default',
							})),
						})
					}>
					Save Diagram
				</button>
				<button className="bg-red-500 text-white px-4 py-2 rounded ml-4" onClick={clearCanvas}>
					Clear Canvas
				</button>
			</div>
		</div>
	);
}
