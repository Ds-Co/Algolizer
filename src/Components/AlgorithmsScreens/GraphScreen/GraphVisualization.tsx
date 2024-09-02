import React from 'react';
import Graph from 'react-vis-network-graph';
import { nodes, edges} from './data'; // Adjusted imports

// Define the types for the graph data

const GraphVisualization: React.FC = () => {
  const options = {
    // General appearance
    width: 300,
    height: 400,
    backgroundColor: '#F5F5F5',
    font: {
      size: 14,
      face: 'Arial',
      color: '#333',
    },
  
    // Nodes configuration
    nodes: {
      shape: 'dot',
      size: 10,
      color: {
        background: '#89CFF0',
        border: '#FFFFFF',
        highlight: {
          border: 'orange',
          background: '#FFD700',
        },
      },
      font: {
        color: '#FFFFFF',
      },
    },
  
    // Edges configuration
    edges: {
      width: 2,
      color: {
        inherit: 'from',
        highlight: '#FFD700',
      },
      smooth: {
        type: 'continuous',
      },
      arrows: {
        to: {
          enabled: true,
          scale: 0.5,
        },
      },
    },
  
    // Interaction configuration
    physics: {
      enabled: true,
      solver: 'barnesHut',
      stabilization: {
        enabled: true,
        iterations: 100,
      },
    },
    interaction: {
      navigationButtons: true,
      dragNodes: true,
      dragVertices: true,
      zoomView: true,
      navigation: true,
    },
  
    // Legend configuration
    legend: {
      enabled: true,
      position: 'bottom',
      orientation: 'horizontal',
      nodeShape: 'circle',
    },
  };

  const data = { nodes, edges };

  return (
    <div className="container">
      <Graph graph={data} options={options} />
    </div>
  );
};

export default GraphVisualization;
