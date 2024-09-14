import React, { useEffect, useState, useRef } from "react";
import Graph from "react-vis-network-graph";

export default function GraphVisualization({
  nodes,
  edges,
  nodeColors,
  disablePhysics,
  distances = {}, // Default to empty object if not provided
  isDirected,
}) {
  const [layoutDirection, setLayoutDirection] = useState("UD");
  const [dynamicLayout, setDynamicLayout] = useState(false);
  const networkRef = useRef(null); // To store the graph instance

  useEffect(() => {
    if (disablePhysics) {
      setLayoutDirection('UD');
      setDynamicLayout(false);
    } else {
      setLayoutDirection('dynamic');
      setDynamicLayout(true);
    }
  }, [disablePhysics]);

  // Function to focus the graph on a specific node or area
  const focusGraph = () => {
    if (networkRef.current) {
      const network = networkRef.current;
      network.fit({ animation: { duration: 500, easingFunction: "easeInOutQuad" } });
    }
  };

  // Key binding for focusing the graph (e.g., press 'F' to focus)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'f' || event.key === 'F') {
        focusGraph(); // Focus the graph when 'F' is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      //navigationButtons: true,
      dragNodes: true,
      dragView: true,
      zoomView: true,
      keyboard: {
        enabled: true,
        speed: { x: 7, y: 7, zoom: 0.03 },
      },
    },
    layout: {
      improvedLayout: true,
      hierarchical: layoutDirection === 'UD' ? {
        direction: 'UD', // Top to Bottom
        sortMethod: 'directed',
        levelSeparation: 110, // Increase vertical space between levels
        nodeSpacing: 90, // Increase space between nodes at the same level
      } : false, // Disable hierarchical layout if not animating
      randomSeed: 50,
    },
    autoResize: true,
  };

  const data = { nodes: coloredNodes, edges };

  return (
    <Graph
      key={isDirected ? "directed" : "undirected"}
      graph={data}
      options={options}
      getNetwork={(network) => {
        networkRef.current = network; // Store the network instance for future reference
      }}
    />
  );
}
export {GraphVisualization}