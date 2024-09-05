import React from "react";

const GraphData = () => {
  const storedAdjacencyList = localStorage.getItem("graphInput");
  const adjacencyList = storedAdjacencyList
    ? JSON.parse(storedAdjacencyList)
    : {};

  var nodes = Object.keys(adjacencyList).map((id) => ({
    id: Number(id),
    label: `Node ${id}`,
  }));

  var edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
    neighbors.map((neighbor) => ({
      from: Number(node1),
      to: Number(neighbor),
    }))
  );

  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  return { nodes, edges };
};

export { GraphData };
