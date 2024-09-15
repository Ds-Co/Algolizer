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

  const edges = [];
  const addedEdges = new Set();

  Object.entries(adjacencyList).forEach(([node1, neighbors]) => {
    neighbors.forEach(({ node: node2, weight }) => {
      // Generate a unique edge identifier
      const edgeId = node1 < node2 ? `${node1}-${node2}` : `${node2}-${node1}`;

      // Check if the reverse edge is already added
      if (!addedEdges.has(edgeId)) {
        // Add this edge to the list and mark it as added
        edges.push({
          from: node1,
          to: node2,
          label:
            graphType === "Dijkstra"
              ? (weight ? weight.toString() : "1")
              : "",
        });
        addedEdges.add(edgeId);
      }
    });
  });

  return { nodes, edges };
};

export { GraphData };
