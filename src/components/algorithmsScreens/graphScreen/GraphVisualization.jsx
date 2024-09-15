import React, { useEffect, useState, useRef } from "react";
import Graph from "react-vis-network-graph";
import "vis-network/styles/vis-network.css";

export default function GraphVisualization({
  nodes,
  edges,
  nodeColors,
  disablePhysics,
  distances = {}, // Default to empty object if not provided
  isDirected,
  selectedGraphType,
}) {
  const [layoutDirection, setLayoutDirection] = useState("UD");
  const [dynamicLayout, setDynamicLayout] = useState(false);
  const [showDistances, setShowDistances] = useState(true); // State to control distance labels
  const networkRef = useRef(null); // To store the graph instance

  useEffect(() => {
    if (disablePhysics) {
      setLayoutDirection('UD');
      setDynamicLayout(false);
      setShowDistances(true); // Show distances while physics is enabled (during animation)
    } else {
      setLayoutDirection('dynamic');
      setDynamicLayout(true);
      setShowDistances(false); // Remove distances when animation ends (disablePhysics = false)
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

  const coloredNodes = nodes.map((node) => {
    const distance = distances[node.id];
  
    // Only show the tooltip if the selected algorithm is Dijkstra
    const showTooltip = selectedGraphType === "Dijkstra" && distance !== undefined;
  
    return {
      ...node,
      color: nodeColors[node.id] || "#000000",
  
      // Only color the value of the distance in red
      title: showTooltip ? `Distance: <span style="color:red;">${distance}</span>` : undefined,
  
      label: `Node ${node.id}`,
      font: {
        color: "#000000",
        size: 14,
      },
    };
  });
  
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
      //tooltip: false,
    },
    layout: {
      improvedLayout: true,
      // hierarchical: layoutDirection === 'UD' ? {
      //   direction: 'UD', // Top to Bottom
      //   sortMethod: 'directed',
      //   levelSeparation: 110, // Increase vertical space between levels
      //   nodeSpacing: 90, // Increase space between nodes at the same level
      // } : false, // Disable hierarchical layout if not animating
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