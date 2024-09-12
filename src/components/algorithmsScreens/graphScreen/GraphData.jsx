import React from "react";

const GraphData = (graphType) => {
  const storedAdjacencyList = localStorage.getItem("graphInput");
  const adjacencyList = storedAdjacencyList
    ? JSON.parse(storedAdjacencyList)
    : {};

  const nodes = Object.keys(adjacencyList).map((id) => ({
    id: id, // Keep ID as a string if needed
    label: `Node ${id}`,
  }));

  const edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
    neighbors.map(({ node: node2, weight }) => ({
      from: node1, // Ensure these are strings if node IDs are strings
      to: node2,
      label: graphType === "Dijkstra" && weight ? weight.toString() : "", // Conditionally add label
    }))
  );

  return { nodes, edges };
};

export { GraphData };
