import React from 'react'

const data = () => {

const storedAdjacencyList = localStorage.getItem("graphInput");
const adjacencyList = storedAdjacencyList ? JSON.parse(storedAdjacencyList) : {};
// Generate nodes and edges
var nodes = Object.keys(adjacencyList).map(id => ({
  id: Number(id),
  label: `Node ${id}`
}));

var edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
  neighbors.map(neighbor => ({
    from: Number(node1),
    to: Number(neighbor)
  }))
);

// Export or use the nodes and edges
console.log("Nodes:", nodes);
console.log("Edges:", edges);
}

export {data} 