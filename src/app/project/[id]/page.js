'use client';
import { useState, useEffect } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import DiagramEditor from '../DiagrammEditor';
import 'reactflow/dist/style.css';

const textNode = ({ data }) => {
  return (
    <div
      style={{
        width: '150px',
        height: '100px',
        backgroundColor: '#e0e0e0',
        border: '2px solid #3758F9',
      }}>
      <p>{data.label}</p>
    </div>
  );
};

const hexagonNode = ({ data }) => {
  return (
    <div
      style={{
        width: '150px',
        height: '100px',
        backgroundColor: '#e0e0e0',
        border: '2px solid #3758F9',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      }}>
      <p>{data.label}</p>
    </div>
  );
};

const nodeTypes = {
  textNode: textNode,
};

export default function ProjectPage({ params }) {
  const [id, setId] = useState(null);
  const [artifacts, setArtifacts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [openFileId, setOpenFileId] = useState(null);
  const [openFileContent, setOpenFileContent] = useState(null);
  const [newDocName, setNewDocName] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [isDocEditable, setIsDocEditable] = useState(false);
  const [isDiagramEditable, setIsDiagramEditable] = useState(false);
  const [diagramContent, setDiagramContent] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    if (params) {
      const fetchId = async () => {
        const resolvedParams = await params;
        setId(resolvedParams.id);
      };
      fetchId();
    }
  }, [params]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsFileUploaded(true);
    }
  };

  const addArtifact = () => {
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      let type = '';
      if (fileExtension === 'txt') {
        type = 'documentation';
      } else if (fileExtension === 'json') {
        type = 'diagram';
      }

      if (type) {
        const newArtifact = {
          id: Date.now(),
          name: selectedFile.name,
          type,
          file: selectedFile,
        };
        setArtifacts([...artifacts, newArtifact]);
      } else {
        alert('Unsupported file type');
      }

      setSelectedFile(null);
      setIsFileUploaded(false);
    }
  };

  const openArtifact = (artifact) => {
    if (openFileId === artifact.id) {
      setOpenFileContent(null);
      setOpenFileId(null);
    } else {
      setOpenFileId(artifact.id);

      const reader = new FileReader();

      reader.onload = () => {
        if (artifact.type === 'diagram') {
          // If it's a diagram (JSON), try parsing it as JSON
          try {
            const content = JSON.parse(reader.result);
            if (content.nodes && content.edges) {
              const validatedNodes = content.nodes.map((node) => ({
                ...node,
                type: node.type || 'textNode',
              }));
              setOpenFileContent({ nodes: validatedNodes, edges: content.edges });
            } else {
              console.error('Invalid diagram format');
              alert('The diagram data format is incorrect.');
            }
          } catch (error) {
            console.error('Error parsing diagram JSON:', error);
            alert('Failed to load the diagram. Invalid JSON format.');
            setOpenFileContent(null); // Reset content on error
          }
        } else if (artifact.type === 'documentation') {
          // If it's a document (TXT), display the text content
          setOpenFileContent(reader.result);
        }
      };

      reader.readAsText(artifact.file);
    }
  };

  const deleteArtifact = (artifactId) => {
    if (artifactId === openFileId) {
      setOpenFileContent(null);
      setOpenFileId(null);
    }
    setArtifacts(artifacts.filter((artifact) => artifact.id !== artifactId));
  };

  const createNewDoc = () => {
    setNewDocName('');
    setNewDocContent('');
    setIsDocEditable(true);
  };

  const saveDocLocally = () => {
    const blob = new Blob([newDocContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${newDocName}.txt`;
    link.click();

    const newArtifact = {
      id: Date.now(),
      name: `${newDocName}.txt`,
      type: 'documentation',
      file: new Blob([newDocContent], { type: 'text/plain' }),
    };
    setArtifacts([...artifacts, newArtifact]);
    setIsDocEditable(false);
  };

  const createNewDiagram = () => {
    setIsDiagramEditable(true);
    setDiagramContent({ nodes: [], edges: [] });
  };

  const saveDiagram = (diagramData) => {
    try {
      const diagramJSON = JSON.stringify(diagramData, null, 2);
      const diagramBlob = new Blob([diagramJSON], { type: 'application/json' });
      const fileName = `diagram-${Date.now()}.json`;

      const link = document.createElement('a');
      link.href = URL.createObjectURL(diagramBlob);
      link.download = fileName;
      link.click();

      const newArtifact = {
        id: Date.now(),
        name: fileName,
        type: 'diagram',
        file: diagramBlob,
      };

      setArtifacts([...artifacts, newArtifact]);
      setIsDiagramEditable(false);
    } catch (error) {
      console.error('Error saving diagram:', error);
      alert('Failed to save the diagram. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 content">
      {id ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Project {id}</h1>
          <div className="mb-4 content__upload">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
            <button
              onClick={addArtifact}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              disabled={!isFileUploaded}>
              Add File
            </button>
            {selectedFile && (
              <p className="text-sm mt-2">
                Selected file: {selectedFile.name} ({selectedFile.type})
              </p>
            )}
          </div>
          <ul>
            {artifacts.map((artifact) => (
              <li key={artifact.id} className="mb-2 flex justify-between items-center">
                <span>
                  {artifact.name} ({artifact.type})
                </span>
                <button
                  onClick={() => openArtifact(artifact)}
                  className={`${
                    openFileId === artifact.id ? 'bg-red-500' : 'bg-green-500'
                  } text-white px-4 py-2 rounded ml-2`}>
                  {openFileId === artifact.id ? 'Close' : 'Open'}
                </button>
                <button
                  onClick={() => deleteArtifact(artifact.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="content__options">
            <button onClick={createNewDoc} className="bg-blue-500 text-white px-4 py-2 rounded">
              Create new documentation
            </button>
            <button
              onClick={createNewDiagram}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
              Create new Diagram
            </button>
          </div>

          {isDocEditable && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter document name"
                className="border p-2 mb-2 w-full"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
              />
              <textarea
                className="border p-2 mb-2 w-full"
                placeholder="Enter document content"
                value={newDocContent}
                onChange={(e) => setNewDocContent(e.target.value)}></textarea>
              <div>
                <button
                  onClick={saveDocLocally}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                  Save Locally
                </button>
              </div>
            </div>
          )}

          {isDiagramEditable && <DiagramEditor onSave={saveDiagram} />}

          {/* Render content based on file type */}
          {openFileContent ? (
            openFileContent.nodes && openFileContent.edges ? (
              <div className="react-flow-container" style={{ width: '100%', height: '500px' }}>
                <ReactFlow
                  nodes={openFileContent.nodes}
                  edges={openFileContent.edges}
                  nodeTypes={nodeTypes}>
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>
            ) : (
              <pre>{openFileContent}</pre> // For text files, show raw content
            )
          ) : (
            <p>No file selected or invalid format.</p>
          )}
        </>
      ) : (
        <p>Loading project...</p>
      )}
    </div>
  );
}
