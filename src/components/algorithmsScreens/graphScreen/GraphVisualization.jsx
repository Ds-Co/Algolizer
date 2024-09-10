import React from "react";
import Graph from "react-vis-network-graph";

export default function GraphVisualization({
  nodes,
  edges,
  nodeColors,
  disablePhysics,
  distances = {}, // Default to empty object if not provided
}) {
  const coloredNodes = nodes.map((node) => ({
    ...node,
    color: nodeColors[node.id] || "#000000",
    label: distances[node.id] !== undefined
      ? `Node ${node.id}: ${distances[node.id]}`
      : `Node ${node.id}`,
  }));

  const options = {
    nodes: {
      shape: "dot",
      size: 25,
      color: {
        border: "#FFFFFF",
        highlight: {
          border: "orange",
          background: "#FFD700",
        },
      },
      font: {
        color: "#000000",
      },
    },
    edges: {
      width: 2,
      color: {
        inherit: "from",
        highlight: "#FFD700",
      },
      smooth: {
        type: "continuous",
      },
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.5,
        },
      },
      font: {
        align: "top", // Align the weight label on top of the edge
      },
    },
    physics: {
      enabled: !disablePhysics, // Toggle physics based on disablePhysics prop
    },
    interaction: {
      navigationButtons: true,
      dragNodes: true,
      dragView: true,
      zoomView: true,
    },
    layout: {
      improvedLayout: true,
      randomSeed: 15,
    },
  };

  const data = { nodes: coloredNodes, edges };

  return <Graph graph={data} options={options} />;
}

export { GraphVisualization };
