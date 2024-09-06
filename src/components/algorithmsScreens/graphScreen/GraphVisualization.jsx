import React from "react";
import Graph from "react-vis-network-graph";

export default function GraphVisualization({
  nodes,
  edges,
  nodeColors,
  disablePhysics,
}) {
  const coloredNodes = nodes.map((node) => ({
    ...node,
    color: nodeColors[node.id] || "#000000",
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
      improvedLayout: true, // Enable improved layout for better spacing
      randomSeed: 15, // Optional: Use a fixed seed for reproducibility
    },
  };

  const data = { nodes: coloredNodes, edges: edges };

  return <Graph graph={data} options={options} />;
}

export { GraphVisualization };