import React, { useEffect, useState, useRef } from "react";
import Graph from "react-vis-network-graph";
// import "vis-network/styles/vis-network.css";

export default function GraphVisualization({
  nodes,
  edges,
  nodeColors,
  disablePhysics,
  distances = {}, 
  isDirected,
  selectedGraphType,
}) {
  const [layoutDirection, setLayoutDirection] = useState("UD");
  const [dynamicLayout, setDynamicLayout] = useState(false);
  const [showDistances, setShowDistances] = useState(true); 
  const networkRef = useRef(null); 

  useEffect(() => {
    if (disablePhysics) {
      setLayoutDirection('UD');
      setDynamicLayout(false);
      setShowDistances(true);
    } else {
      setLayoutDirection('dynamic');
      setDynamicLayout(true);
      setShowDistances(false); 
    }
  }, [disablePhysics]);

  const focusGraph = () => {
    if (networkRef.current) {
      const network = networkRef.current;
      network.fit({ animation: { duration: 500, easingFunction: "easeInOutQuad" } });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'f' || event.key === 'F') {
        focusGraph();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const coloredNodes = nodes.map((node) => {
    const distance = distances[node.id];
  
    const showTooltip = selectedGraphType === "Dijkstra" && distance !== undefined;
  
    return {
      ...node,
      color: nodeColors[node.id] || "#000000",
  
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
          enabled: true,
          scaleFactor: 0.5,
        },
        from: {
          enabled: !isDirected,
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
      // hierarchical: layoutDirection === 'UD' ? {
      //   direction: 'UD',
      //   sortMethod: 'directed',
      //   levelSeparation: 110,
      //   nodeSpacing: 90,
      // } : false,
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
        networkRef.current = network;
      }}
    />
  );
}
export {GraphVisualization}