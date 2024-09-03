import React, { useState } from "react";
import graphicon from "/assets/sort_icon.png";
import { TopBar } from "../TopBar";
import { SideBar } from "../SideBar";
import axios from "axios";
import { GraphVisualization } from "./GraphVisualization"; 
import "../../../Css/GraphScreenStyle.css";

// Define interfaces for nodes and edges
interface Node {
  id: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
}

const graphfuncionality: React.FC = () => {
  return <></>;
};

const GraphScreen = () => {
  const [selectedGraphType, setSelectedGraphType] = useState<string>("BFS");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];
  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const handleSelectChange = (sortType: string) => {
    setSelectedGraphType(sortType);
  };

  const getComplexity = (sortType: string): string => {
    switch (sortType) {
      case "BFS":
        return "O(nodes + edges)";
      case "DFS":
        return "O(nodes + edges)";
      case "Dijkstra":
        return "O((nodes + edges)*log(nodes + edges))";
      default:
        return "Unknown Complexity";
    }
  };

  const updateGraphData = (adjacencyList: Record<string, string[]>) => {
    console.log("Received adjacency list:", adjacencyList);
  
    // To track unique node IDs and avoid duplicates
    const nodeIds = new Set<number>();
    const updatedNodes: Node[] = [];
    
    // Map over the adjacency list to create nodes
    Object.keys(adjacencyList).forEach(id => {
      const nodeId = Number(id);
      
      // Check if node ID is already added
      if (nodeIds.has(nodeId)) {
        console.warn(`Duplicate node ID detected: ${nodeId}`);
      } else {
        nodeIds.add(nodeId);
        updatedNodes.push({
          id: nodeId,
          label: `Node ${id}`,
        });
      }
    });
  
    console.log("Unique nodes:", updatedNodes);
  
    // Create edges from adjacency list
    const updatedEdges: Edge[] = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
      neighbors.map(neighbor => ({
        from: Number(node1),
        to: Number(neighbor),
      }))
    );
  
    console.log("Edges:", updatedEdges);
  
    // Update state with new nodes and edges
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };
  

  const handleGraphInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
  
    const edges = value
      .split("\n") // Split the input by new lines to get each edge
      .map((line) => {
        const [node1, node2] = line.split(",").map((item) => item.trim());
        return { node1, node2 }; // Create an edge object with node1 and node2
      })
      .filter((edge) => edge.node1 && edge.node2); // Filter out any invalid edges
  
    // Initialize an empty adjacency list
    const adjacencyList: Record<string, string[]> = {};
  
    edges.forEach((edge) => {
      if (!adjacencyList[edge.node1]) {
        adjacencyList[edge.node1] = [];
      }
      if (edge.node2 && !adjacencyList[edge.node2]) {
        adjacencyList[edge.node2] = [];
      }
      if (edge.node2) {
        adjacencyList[edge.node1].push(edge.node2);
      }
    });
  
    console.log("Processed adjacency list:", adjacencyList);
    
    // Update the graph data
    updateGraphData(adjacencyList);
  };
  

  const handleVisualizeClick = async () => {
    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList = storedAdjacencyList
      ? JSON.parse(storedAdjacencyList)
      : {};

    try {
      const response = await axios.post("http://localhost:5000/api/graph", {
        array: adjacencyList,
        GraphAlgo: selectedGraphType,
      });
      console.log("Visited Array:", response.data.VisitedNodes);
      console.log("Snapshots:", response.data.snapshots);
    } catch (error) {
      console.error("Error during path finding:", error);
    }
  };
  const MemoizedGraph = React.memo(GraphVisualization);

   
  return (
    <>      
      <TopBar
        dropdownmenu={graphs}
        sortingsProps={graphsProps}
        handleVisualizeClick={handleVisualizeClick}
        onSelectChange={handleSelectChange}
      ></TopBar>
      
      <SideBar
        ArrayGenerator={graphfuncionality}
        selectedSortType={selectedGraphType}
        getComplexity={getComplexity}
        handleInputChange={handleGraphInputChange}
      ></SideBar>

      <div className="visualization">
      <MemoizedGraph nodes={nodes} edges={edges} />
      </div>
    </>
  );
};

export { GraphScreen };
