import React, { useState, useEffect, useRef, useCallback } from "react";
import graphicon from "/src/assets/graph_logo.png";
import axios from "axios";
import "../../../css/GraphScreenStyle.css";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { GraphData } from "./GraphData";
import { GraphTypeSwitch } from "./GraphTypeSwitch";
import { GraphVisualization } from "./GraphVisualization";
import { SideBarDropDown } from "./SideBarDropDown";

interface GraphResponse {
  VisitedNodes: number[];
  snapshots: number[];
  distance?: { [key: string]: number };
  parentArray?: { [key: string]: string };
  shortestPath?: string[];
}

interface AdjacencyList {
  [key: string]: { node: string; weight: number }[];
}

const generateTreeGraph = (
  nodeCount: number,
  graphType: string,
  isDirected: boolean
): { nodes: any[]; edges: any[]; adjacencyList: AdjacencyList } => {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i + 1,
    label: `${i + 1}`,
  }));
  const edges: { from: number; to: number; weight: number; label: string }[] =
    [];
  const adjacencyList: AdjacencyList = {};

  for (let i = 1; i < nodeCount; i++) {
    const parent = Math.floor((i - 1) / 2) + 1;
    const child = i + 1;
    const weight =
      graphType === "Dijkstra" ? Math.floor(Math.random() * 10) + 1 : 1;

    edges.push({
      from: parent,
      to: child,
      weight,
      label: graphType === "Dijkstra" ? weight.toString() : "",
    });

    if (!adjacencyList[parent]) adjacencyList[parent] = [];
    if (!adjacencyList[child]) adjacencyList[child] = [];

    adjacencyList[parent].push({ node: child.toString(), weight });
    if (!isDirected)
      adjacencyList[child].push({ node: parent.toString(), weight });
  }

  return { nodes, edges, adjacencyList };
};

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
  const [selectedEndNode, setSelectedEndNode] = useState<string>("Choose Node");
  const [selectedStartNode, setSelectedStartNode] =
    useState<string>("Choose Node");
  const [startNodes, setStartNodes] = useState<string[]>([]);
  const [textArea, setTextArea] = useState("");
  const [isDirected, setIsDirected] = useState(true);
  const [nodeDistances, setNodeDistances] = useState({});
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const [randomGraph, setRandomGraph] = useState<{
    nodes: any[];
    edges: any[];
    adjacencyList: AdjacencyList;
  } | null>(null);

  const snapshotIndexRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];

  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const [path, setPath] = useState<string[]>([]);

  const MemoizedGraph = React.memo(GraphVisualization);

  const handleGraphTypeChange = (isDirected: boolean) => {
    if (!isAnimating) {
      setIsDirected(isDirected);
      setNodeDistances({});
    }
  };

  const handleSelectChange = useCallback((sortType: string) => {
    setSelectedGraphType(sortType);
    setNodeDistances({});
  }, []);

  const handleStartChange = useCallback((startNode: string) => {
    setSelectedStartNode(startNode);
  }, []);

  const handleEndChange = useCallback((endNode: string) => {
    setSelectedEndNode(endNode);
  }, []);

  const getComplexity = useCallback((sortType: string): string => {
    switch (sortType) {
      case "BFS":
      case "DFS":
        return "O(N + E)";
      case "Dijkstra":
        return "O((N + E)*log(N + E))";
      default:
        return "Unknown Complexity";
    }
  }, []);

  const handleGraphInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = event.target.value;
      setNodeDistances("")
      setTextArea(value);

      const validInput = /^[a-zA-Z0-9,\n\s]*$/;

      if (!validInput.test(value)) {
        alert("Invalid input! Please enter only numbers, commas, and spaces.");
        return;
      }

      setSelectedStartNode("Choose Node");
      setSelectedEndNode("Choose Node");

      if (value.trim() === "") {
        const nodeCount = Math.floor(Math.random() * 20) + 5; 
        const { nodes, edges, adjacencyList } = generateTreeGraph(
          nodeCount,
          selectedGraphType,
          isDirected
        );
        setRandomGraph({ nodes, edges, adjacencyList });
        setNewNodes(nodes);
        setNewEdges(edges);
        setStartNodes(Object.keys(adjacencyList));
        localStorage.setItem("graphInput", JSON.stringify(adjacencyList));
      } else {
        const edges = value
          .split("\n")
          .map((line) => {
            const [node1, node2, weight] = line
              .split(",")
              .map((item) => item.trim());
            return {
              node1,
              node2,
              weight: weight ? parseFloat(weight) : 1,
            };
          })
          .filter((edge) => edge.node1 && edge.node2);

        const adjacencyList: AdjacencyList = {};

        edges.forEach((edge) => {
          if (!adjacencyList[edge.node1]) {
            adjacencyList[edge.node1] = [];
          }
          if (!adjacencyList[edge.node2]) {
            adjacencyList[edge.node2] = [];
          }

          adjacencyList[edge.node1].push({
            node: edge.node2,
            weight: edge.weight,
          });

          if (!isDirected) {
            adjacencyList[edge.node2].push({
              node: edge.node1,
              weight: edge.weight,
            });
          }
        });

        const uniqueStartNodes = Object.keys(adjacencyList);
        setStartNodes(uniqueStartNodes);

        localStorage.setItem("graphInput", JSON.stringify(adjacencyList));

        const { nodes, edges: graphEdges } = GraphData(selectedGraphType);
        setNewNodes(nodes);
        setNewEdges(graphEdges);
        console.log(adjacencyList);
      }
    },
    [isDirected, selectedGraphType]
  );

  const handleVisualizeClick = useCallback(async () => {
    if (isAnimating) return;

    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList: AdjacencyList = storedAdjacencyList
      ? JSON.parse(storedAdjacencyList)
      : randomGraph
      ? randomGraph.adjacencyList
      : {};

    try {
      const response = await axios.post<GraphResponse>(
        "http://localhost:5000/api/graph",
        {
          array: adjacencyList,
          GraphAlgo: selectedGraphType,
          startNody:
            selectedStartNode === "Choose Node"
              ? startNodes[0]
              : selectedStartNode,
          endNode: selectedEndNode === "Choose Node" ? -1 : selectedEndNode,
        }
      );

      const shortestPath = response.data.shortestPath || [];
      setPath(shortestPath);

      setDisablePhysics(true);
      setIsAnimating(true); 
      setIsPaused(false);
      setSnapshots(response.data.snapshots); 
      console.log(snapshots);
      snapshotIndexRef.current = 0;

      if (selectedGraphType === "Dijkstra") {
        setNodeDistances(response.data.distance || {});
      }
    } catch (error) {
      console.error("Error during path finding:", error);
      setDisablePhysics(false);
      setIsAnimating(false);
    }
  }, [
    isAnimating,
    randomGraph,
    selectedGraphType,
    selectedStartNode,
    selectedEndNode,
    startNodes,
  ]);

  const animateSnapshots = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (snapshotIndexRef.current < snapshots.length) {
        const node = snapshots[snapshotIndexRef.current];

        if (!isPaused) {
          setNodeColors((prevColors) => {
            const updatedColors: { [key: number]: string } = { ...prevColors };

            updatedColors[Number(node)] =
              snapshotIndexRef.current === 1
                ? "#285EA4" 
                : "#D5CAD6"; 

            if (
              node.toString() === selectedEndNode ||
              snapshotIndexRef.current === snapshots.length
            ) {
              updatedColors[Number(node)] = "#E02929";
            }

            return updatedColors;
          });

          snapshotIndexRef.current += 1;
        }
      } else {
        clearInterval(intervalRef.current as number);
        intervalRef.current = null;
        animatePath(); 
      }
    }, 2000 / speed);
  }, [snapshots, speed, isPaused, selectedEndNode]);

  const animatePath = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  
    let pathIndex = 0; 
  
    intervalRef.current = window.setInterval(() => {
      if (pathIndex < path.length) {
        const node = path[pathIndex];
  
        if (!isPaused) {
          setNodeColors((prevColors) => {
            const updatedColors: { [key: number]: string } = { ...prevColors };
            updatedColors[Number(node)] = "#2DC8B0"; 
            return updatedColors;
          });
  
          pathIndex += 1;
        }
      } else {
        clearInterval(intervalRef.current as number);
        intervalRef.current = null;

        setTimeout(() => {
          setDisablePhysics(false);
          setIsAnimating(false);
          setNodeColors({});
          setSnapshots([]);   
        }, 3000);
      }
    }, 500 / speed);
  }, [path, speed, isPaused]);
  
  

  useEffect(() => {
    if (isAnimating) {
      animateSnapshots();
    } else {
      setSpeed(1);
      setIsPaused(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAnimating, animateSnapshots, snapshots]);

  useEffect(() => {
    if (isResetting) {
      
      handleVisualizeClick();
      setIsResetting(false);
    }
  }, [isResetting, handleVisualizeClick]);

  useEffect(() => {
    if (textArea.trim() === "") {
      const nodeCount = Math.floor(Math.random() * 20) + 5;

      const { nodes, edges, adjacencyList } = generateTreeGraph(
        nodeCount,
        selectedGraphType,
        isDirected
      );

      setRandomGraph({ nodes, edges, adjacencyList });
      setStartNodes(Object.keys(adjacencyList));

      localStorage.setItem("graphInput", JSON.stringify(adjacencyList));
    }

    const { nodes: updatedNodes, edges: updatedEdges } =
      GraphData(selectedGraphType);
    setNewNodes(updatedNodes);
    setNewEdges(updatedEdges);
  }, [selectedGraphType, isDirected, textArea]);

  const handleResetClick = useCallback(() => {
    if (isAnimating) {
      setIsAnimating(false);
      setNodeColors({});
      setSpeed(1);
      snapshotIndexRef.current = 0;
      setSnapshots([]);
      setIsPaused(false);
      setIsResetting(true);
    }
  }, [isAnimating]);

  const handlePauseClick = useCallback(() => {
    if (isAnimating) {
      setIsPaused((prev) => !prev);
      if (!isPaused) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        animateSnapshots();
      }
    }
  }, [isAnimating, isPaused, animateSnapshots]);

  const handleSpeedUpClick = useCallback(() => {
    if (isAnimating) {
      setSpeed((prevSpeed) => (prevSpeed % 3) + 1);
    }
  }, [isAnimating, speed]);

  return (
    <div className="graph-screen">
      <TopBar
        dropdownmenu={graphs}
        sortingsProps={graphsProps}
        handleVisualizeClick={handleVisualizeClick}
        onSelectChange={handleSelectChange}
        handlePauseClick={handlePauseClick}
        handleResetClick={handleResetClick}
        handleSpeedUpClick={handleSpeedUpClick}
        isAnimating={isAnimating}
        isPaused={isPaused}
      />
      <SideBar
        ArrayGenerator={() => (
          <>
            <div className="startEndNodes">
              <div className="dropdown-container">
                <label htmlFor="start-node" className="dropdown-label">
                  Start Node
                </label>
                <SideBarDropDown
                  id="start-node"
                  options={["Choose Node", ...startNodes]}
                  selectedValue={selectedStartNode}
                  onSelectChange={handleStartChange}
                  isAnimating={isAnimating}
                />
              </div>
              <div className="dropdown-container">
                <label htmlFor="end-node" className="dropdown-label">
                  End Node
                </label>
                <SideBarDropDown
                  id="end-node"
                  options={["Choose Node", ...startNodes]}
                  selectedValue={selectedEndNode}
                  onSelectChange={handleEndChange}
                  isAnimating={isAnimating}
                />
              </div>
            </div>
            <GraphTypeSwitch
              onTypeChange={handleGraphTypeChange}
              isDirected={isDirected}
            />
          </>
        )}
        selectedSortType={selectedGraphType}
        getComplexity={getComplexity}
        handleInputChange={handleGraphInputChange}
        isAnimating={isAnimating}
      />
      <div className="visualization">
        <MemoizedGraph
          nodes={newNodes}
          edges={newEdges}
          nodeColors={nodeColors}
          disablePhysics={disablePhysics}
          distances={selectedGraphType === "Dijkstra" ? nodeDistances : {}} 
          isDirected={isDirected}
          selectedGraphType={selectedGraphType} 
        />
      </div>
    </div>
  );
};

export { GraphScreen };
