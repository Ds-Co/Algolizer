import React, { useState, useEffect } from 'react';
import Graph from 'react-vis-network-graph';
import _ from 'lodash'; // Ensure lodash is installed

export default function GraphVisualization({nodes,edges}) {
  // State to hold nodes and edges
  // const [graphData, setGraphData] = useState({ nodes: [], edges: [] });


  // // Function to generate nodes and edges from localStorage
  // const generateGraphData = () => {
  //   const storedAdjacencyList = localStorage.getItem("graphInput");
  //   const adjacencyList = storedAdjacencyList ? JSON.parse(storedAdjacencyList) : {};


  //   console.log(" data:", adjacencyList);

  //   // Generate nodes and edges
  //   const nodes = Object.keys(adjacencyList).map(id => ({
  //     id: Number(id),
  //     label: `Node ${id}`
  //   }));

  //   const edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
  //     neighbors.map(neighbor => ({
  //       from: Number(node1),
  //       to: Number(neighbor)
  //     }))
  //   );

  //   console.log("Generated graph data:", { nodes, edges });

  //   return { nodes, edges };
  // };

  // useEffect(() => {
  //   const updateGraphData = () => {
  //     const data = generateGraphData();
  //     console.log("Processed graph data:", data); // Check here
  //     setGraphData(data); // Update with new data
  //   };
  
  //   updateGraphData(); // Initial data load
  
  //   window.addEventListener('storage', updateGraphData);
  
  //   return () => {
  //     window.removeEventListener('storage', updateGraphData);
  //   };
  // }, []);

  const options = {
    nodes: {
      shape: 'dot',
      size: 15,
      color: {
        background: '#000000',
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
      dragView: true,
      zoomView: true,
    },
  };

  var data={nodes:nodes,edges:edges}

  return (
    <Graph
      graph={data}
      options={options}
    />
  );
}

export { GraphVisualization };