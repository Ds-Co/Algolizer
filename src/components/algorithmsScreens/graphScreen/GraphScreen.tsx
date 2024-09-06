import React, { useState, useEffect, useRef, useCallback } from "react";
import graphicon from "/src/assets/sort_icon.png";
import axios from "axios";
import "../../../css/GraphScreenStyle.css";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { GraphData } from "./GraphData";
import { GraphVisualization } from "./GraphVisualization";

interface GraphResponse {
  VisitedNodes: number[];
  snapshots: number[];
}

const graphfuncionality: React.FC = () => <></>;

const GraphScreen: React.FC = () => {
  const [newNodes, setNewNodes] = useState<any[]>([]);
  const [newEdges, setNewEdges] = useState<any[]>([]);
  const [nodeColors, setNodeColors] = useState<{ [key: number]: string }>({});
  const [disablePhysics, setDisablePhysics] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false); 
  const [speed, setSpeed] = useState<number>(1);
  const [selectedGraphType, setSelectedGraphType] = useState<string>("BFS");
  const [snapshots, setSnapshots] = useState<number[]>([]);
  const snapshotIndexRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];
  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const MemoizedGraph = React.memo(GraphVisualization);

  const handleSelectChange = useCallback((sortType: string) => {
    setSelectedGraphType(sortType);
  }, []);

  const getComplexity = useCallback((sortType: string): string => {
    switch (sortType) {
      case "BFS":
      case "DFS":
        return "O(nodes + edges)";
      case "Dijkstra":
        return "O((nodes + edges)*log(nodes + edges))";
      default:
        return "Unknown Complexity";
    }
  }, []);

  const handleGraphInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      const edges = value
        .split("\n")
        .map((line) => {
          const [node1, node2] = line.split(",").map((item) => item.trim());
          return { node1, node2 };
        })
        .filter((edge) => edge.node1 && edge.node2);

      const adjacencyList: Record<string, string[]> = {};

      edges.forEach((edge) => {
        if (!adjacencyList[edge.node1]) {
          adjacencyList[edge.node1] = [];
        }
        if (!adjacencyList[edge.node2]) {
          adjacencyList[edge.node2] = [];
        }
        adjacencyList[edge.node1].push(edge.node2);
      });

      localStorage.setItem("graphInput", JSON.stringify(adjacencyList));

      const { nodes, edges: graphEdges } = GraphData();
      setNewNodes(nodes);
      setNewEdges(graphEdges);
    },
    []
  );

  const handleVisualizeClick = useCallback(async () => {

    if(isAnimating)return;
    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList = storedAdjacencyList ? JSON.parse(storedAdjacencyList) : [];
    // console.log("selectedGraphType:", selectedGraphType);
    // console.log("Adjacency List:", adjacencyList);

    try {
      const response = await axios.post<GraphResponse>("http://localhost:5000/api/graph", {
        array: adjacencyList,
        GraphAlgo: selectedGraphType,
      });
      setDisablePhysics(true);
      setIsAnimating(true);
      setIsPaused(false);
      setSnapshots(response.data.snapshots);
      snapshotIndexRef.current = 0;
    } catch (error) {
      console.error("Error during path finding:", error);
      setDisablePhysics(false);
      setIsAnimating(false);
    }
  }, [selectedGraphType]);

  const animateSnapshots = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current); 

   
    setNodeColors((prevColors) => {
      const initialColors = { ...prevColors };
      if (snapshots.length > 0) {
        initialColors[snapshots[0]] = "#818188"; 
      }
      return initialColors;
    });

    intervalRef.current = window.setInterval(() => {
      if (snapshotIndexRef.current < snapshots.length) {
        if (!isPaused) { 
          setNodeColors((prevColors) => ({
            ...prevColors,
            [snapshots[snapshotIndexRef.current]]: "#818188",
          }));
          snapshotIndexRef.current += 1;
        }
      } else {
        clearInterval(intervalRef.current as number);
        intervalRef.current = null;
        setDisablePhysics(false);
        setIsAnimating(false);
        setNodeColors({});
        setSnapshots([]);
      }
    }, 1000 / speed); 
  }, [snapshots, speed, isPaused]);

  useEffect(() => {
    if (isAnimating) {
      animateSnapshots();
    } else {
      setSpeed(1);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAnimating, animateSnapshots]);

  const handleResetClick = useCallback(() => {
    if (isAnimating) {
      // console.log("Reset button clicked during animation");
      setIsAnimating(false);
      setNodeColors({});
      setSnapshots([]);
      setSpeed(1);
      snapshotIndexRef.current = 0;
      setIsPaused(false);
      handleVisualizeClick();
    }
  }, [isAnimating, handleVisualizeClick]);

  const handlePauseClick = useCallback(() => {
    if (isAnimating) {
      setIsPaused((prev) => !prev);
      if (!isPaused) {
        // console.log("Pause button clicked during animation");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        // console.log("Resume button clicked during animation");
        animateSnapshots();
      }
    }
  }, [isAnimating, isPaused, animateSnapshots]);

  const handleSpeedUpClick = useCallback(() => {
    if (isAnimating) {
      setSpeed((prevSpeed) => (prevSpeed % 3) + 1);
      // console.log("Speed increased to:", (speed % 3) + 1);
    }
  }, [isAnimating, speed]);

  return (
    <>
      <TopBar
        dropdownmenu={graphs}
        sortingsProps={graphsProps}
        handleVisualizeClick={handleVisualizeClick}
        onSelectChange={handleSelectChange}
        handlePauseClick={handlePauseClick}
        handleResetClick={handleResetClick}
        handleSpeedUpClick={handleSpeedUpClick}
      />

      <SideBar
        ArrayGenerator={graphfuncionality}
        selectedSortType={selectedGraphType}
        getComplexity={getComplexity}
        handleInputChange={handleGraphInputChange}
      />

      <div className="visualization">
        <MemoizedGraph
          nodes={newNodes}
          edges={newEdges}
          nodeColors={nodeColors}
          disablePhysics={disablePhysics}
        />
      </div>
    </>
  );
};

export { GraphScreen };
