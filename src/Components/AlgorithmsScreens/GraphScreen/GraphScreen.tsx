import React, { useState } from "react";
import graphicon from "/src/assets/sort_icon.png";
import { TopBar } from "../TopBar";
import { SideBar } from "../SideBar";
import axios from "axios";
import { GraphVisualization } from "./GraphVisualization";
import "../../../css/GraphScreenStyle.css";
import { GraphData } from "./GraphData";

interface GraphResponse {
  VisitedNodes: number[];
  snapshots: number[];
}


const graphfuncionality: React.FC = () => {
  return <></>;
};

const GraphScreen = () => {
  const [newNodes, setNewNodes] = useState<any[]>([]);
  const [newEdges, setNewEdges] = useState<any[]>([]);
  const [nodeColors, setNodeColors] = useState<{ [key: number]: string }>({});
  const [disablePhysics, setDisablePhysics] = useState<boolean>(false);

  const [selectedGraphType, setSelectedGraphType] = useState<string>("BFS");
  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];
  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const MemoizedGraph = React.memo(GraphVisualization);

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

  const handleGraphInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const edge = value
      .split("\n")
      .map((line) => {
        const [node1, node2] = line.split(",").map((item) => item.trim());
        return { node1, node2 };
      })
      .filter((edge) => edge.node1 && edge.node2);


    const adjacencyList: Record<string, string[]> = {};

    edge.forEach((edge) => {
      if (!adjacencyList[edge.node1]) {
        adjacencyList[edge.node1] = [];
      }
      if (!adjacencyList[edge.node2]) {
        adjacencyList[edge.node2] = [];
      }
      adjacencyList[edge.node1].push(edge.node2);
      // adjacencyList[edge.node2].push(edge.node1); // Assuming an undirected graph
    });

    console.log("graphscreen:", adjacencyList);

    localStorage.setItem("graphInput", JSON.stringify(adjacencyList));

    const { nodes, edges } = GraphData();
    setNewNodes(nodes);
    setNewEdges(edges);
  };

  const handleVisualizeClick = async () => {
    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList = storedAdjacencyList
      ? JSON.parse(storedAdjacencyList)
      : [];
    console.log("selectedGraphType:", selectedGraphType);
    console.log("Adjacency List:", adjacencyList);


    setDisablePhysics(true);

    try {
      const response = await axios.post<GraphResponse>("http://localhost:5000/api/graph", {
        array: adjacencyList,
        GraphAlgo: selectedGraphType,
      });

      console.log("Visited Array:", response.data.VisitedNodes);
      console.log("Snapshots:", response.data.snapshots);

      const snapshots = response.data.snapshots;


      snapshots.forEach((snapshot: number, index: number) => {
        setTimeout(() => {
          setNodeColors((prevColors: { [key: number]: string }) => ({
            ...prevColors,
            [snapshot]: `#818188`, // Use a fixed color (e.g., orange-red)
          }));
        }, index * 1000); // Increase the delay to slow down the animation (1000ms = 1 second)
      });

      // Reset colors and re-enable physics after the animation
      setTimeout(() => {
        setNodeColors({});
        setDisablePhysics(false);
      }, (snapshots.length + 1) * 1000); // Adjust delay based on animation duration

    } catch (error) {
      console.error("Error during path finding:", error);
      setDisablePhysics(false);
    }
  };


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
        <MemoizedGraph nodes={newNodes} edges={newEdges} nodeColors={nodeColors} disablePhysics={disablePhysics} />
      </div>
    </>
  );
};

export { GraphScreen };
