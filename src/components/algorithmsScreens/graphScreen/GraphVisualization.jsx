import React, { useEffect, useState } from "react";
import Graph from "react-vis-network-graph";

export default function GraphVisualization({
  nodes,
  edges,
  nodeColors,
  disablePhysics,
  distances = {}, // Default to empty object if not provided
  isDirected, // Added to handle directed vs undirected graph
}) {
  const [layoutDirection, setLayoutDirection] = useState("UD");
  const [dynamicLayout, setDynamicLayout] = useState(false);

  useEffect(() => {
    if (disablePhysics) {
      // Set layout direction to 'UD' during animation
      setLayoutDirection("UD");
      setDynamicLayout(false);
    } else {
      // Set layout to dynamic and allow free movement when not animating
      setLayoutDirection("dynamic");
      setDynamicLayout(true);
    }
  }, [disablePhysics]);

  const coloredNodes = nodes.map((node) => ({
    ...node,
    color: nodeColors[node.id] || "#000000",
    label:
      distances[node.id] !== undefined
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
      hover: {
        borderWidth: 3,
        size: 30,
        background: "#F0A500",
      },
    },
    edges: {
      width: 1,
      color: {
        inherit: "from",
        highlight: "#FFD700",
      },
      smooth: {
        type: "continuous",
      },
      arrows: {
        to: {
          enabled: true, // Only enable arrows if directed
          scaleFactor: 0.5,
        },
        from: {
          enabled: !isDirected, // Only enable arrows if directed
          scaleFactor: 0.5,
        },
      },
      font: {
        align: "top",
      },
      hoverWidth: 3,
      selectionWidth: 4,
    },
    physics: {
      enabled: !disablePhysics,

      solver: "barnesHut",
      stabilization: {
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
      improvedLayout: true,
      hierarchical:
        layoutDirection === "UD"
          ? {
              direction: "UD", // Top to Bottom
              sortMethod: "directed",
              levelSeparation: 150, // Increase vertical space between levels
              nodeSpacing: 100, // Increase space between nodes at the same level
            }
          : false, // Disable hierarchical layout if not animating
      randomSeed: 50,
    },
    autoResize: true,
  };

  const data = { nodes: coloredNodes, edges };
  const Memo = React.memo(Graph);

  return <Memo graph={data} options={options} />;
}

export { GraphVisualization };
