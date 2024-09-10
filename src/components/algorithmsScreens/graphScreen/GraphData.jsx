import React from "react";

const GraphData = () => {
  const storedAdjacencyList = localStorage.getItem("graphInput");
  const adjacencyList = storedAdjacencyList
    ? JSON.parse(storedAdjacencyList)
    : {};

  const nodes = Object.keys(adjacencyList).map((id) => ({
    id: Number(id),
    label: `Node ${id}`,
  }));

  const edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
    neighbors.map(({ node: node2, weight }) => ({
      from: Number(node1),
      to: Number(node2),
      label: weight ? weight.toString() : "",
    }))
  );


  // console.log("Nodes:", nodes);
  // console.log("Edges:", edges);

  return { nodes, edges };
};

export { GraphData };