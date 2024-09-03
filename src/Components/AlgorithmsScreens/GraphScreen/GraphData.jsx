import React from 'react';

const GraphData = (adjacencyList) => {
  // Generate nodes and edges from the adjacency list
  console.log("checkpoint " , adjacencyList);
  const nodes = Object.keys(adjacencyList).map(id => ({
    id: Number(id),
    label: `Node ${id}`,
  }));

  const edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
    neighbors.map(neighbor => ({
      from: Number(node1),
      to: Number(neighbor),
    }))
  );

  // Return the graph data
  return { nodes, edges };
}

export { GraphData };
