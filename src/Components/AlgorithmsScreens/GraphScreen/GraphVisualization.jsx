import React from 'react';
import Graph from 'react-vis-network-graph';

export default function GraphVisualization({ nodes, edges, nodeColors, physicsEnabled }) {

  // Apply colors from nodeColors to the nodes array
  const coloredNodes = nodes.map(node => ({
    ...node,
    color: nodeColors[node.id] || '#000000', // Default to black if no color is provided
    fixed: { x: true, y: true }
  }));

  const options = {
    nodes: {
      shape: 'dot',
      size: 25,
      color: {
        border: '#FFFFFF',
        highlight: {
          border: 'orange',
          background: '#FFD700',
        },
      },
      font: {
        color: '#000000',
      },
    },
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
          scaleFactor: 0.5,
        },
      },
    },
    physics: {
      enabled: physicsEnabled,
      solver: 'barnesHut',
      stabilization: {
        enabled: true,
        iterations: 100,
      },
    },
    interaction: {
      navigationButtons: true,
      dragNodes: true,
      dragView: true,
      zoomView: true,
    },
    layout: {
      improvedLayout: false // Disable layout adjustments
    }
    
  };

  const data = { nodes: coloredNodes, edges: edges };

  return (
    <Graph
      graph={data}
      options={options}
    />
  );
}

export { GraphVisualization };