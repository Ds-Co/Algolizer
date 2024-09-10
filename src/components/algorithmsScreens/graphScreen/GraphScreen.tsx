import React, { useState, useEffect, useRef, useCallback } from "react";
import graphicon from "/src/assets/graph_logo.png";
import axios from "axios";
import "../../../css/GraphScreenStyle.css";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { DropDown } from "../DropDown";
import { GraphData } from "./GraphData";
import { GraphTypeSwitch } from "./GraphTypeSwitch";
import GraphVisualization from "./GraphVisualization";

interface GraphResponse {
  VisitedNodes: number[];
  snapshots: number[];

  distance?: { [key: string]: number };
}

interface GraphFunctionalityProps {
  startNodes: string[];
  onStartChange: (selectedNode: string) => void;
}

interface GraphEndNodeFunctionalityProps {
  endNodes: string[];
  onEndChange: (selectedNode: string) => void;
}

const GraphEndNodeFunctionality: React.FC<GraphEndNodeFunctionalityProps> = ({
  endNodes,
  onEndChange,
}) => {
  const handleNodeChange = (selectedNode: string) => {
    if (selectedNode !== "Choose Node") {
      onEndChange(selectedNode);
    }
  };

  return (
    <div>
      <div style={{ color: "#ffffff" }}>Select End Node</div>
      <DropDown
        sorts={["Choose Node", ...endNodes]}
        onSelectChange={handleNodeChange}
      />
    </div>
  );
};

const GraphFuncionality: React.FC<GraphFunctionalityProps> = ({
  startNodes,
  onStartChange,
}) => {
  const handleNodeChange = (selectedNode: string) => {
    if (selectedNode !== "Choose Node") {
      onStartChange(selectedNode);
    }
  };

  return (
    <div>
      <div style={{ color: "#ffffff" }}>Select Start Node</div>
      <DropDown
        sorts={["Choose Node", ...startNodes]}
        onSelectChange={handleNodeChange}
      />
    </div>
  );
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

  const [selectedGraphNode, setSelectedGraphNode] =
    useState<string>("Choose Node"); // Default "Choose Node"
  const [selectedEndNode, setSelectedEndNode] = useState<string>("Choose Node");
  const [startNodes, setStartNodes] = useState<string[]>([]); // Array to hold valid start nodes
  const [isDirected, setIsDirected] = useState(true);
  const snapshotIndexRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];

  const [nodeDistances, setNodeDistances] = useState({});

  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const MemoizedGraph = React.memo(GraphVisualization);
  // State to keep track of graph type

  const handleGraphTypeChange = (isDirected: boolean) => {
    setIsDirected(isDirected);
  };

  const handleSelectChange = useCallback((sortType: string) => {
    setSelectedGraphType(sortType);
  }, []);

  const handleStartChange = useCallback((startNode: string) => {
    setSelectedGraphNode(startNode); // Update selected start node
  }, []);

  const handleEndChange = useCallback((endNode: string) => {
    setSelectedEndNode(endNode); // Update selected end node
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

      const adjacencyList: Record<string, { node: string; weight: number }[]> =
        {};

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
          //We can Save them somewhere and if he changes his mind about it being directed we iterate and delete them
          //and vise versa if he re-enables it we iterate and add them.
          adjacencyList[edge.node2].push({
            node: edge.node1,
            weight: edge.weight,
          });
        }
      });

      const uniqueStartNodes = Object.keys(adjacencyList);
      setStartNodes(uniqueStartNodes);

      localStorage.setItem("graphInput", JSON.stringify(adjacencyList));

      const { nodes, edges: graphEdges } = GraphData();
      setNewNodes(nodes);
      setNewEdges(graphEdges);
    },
    [isDirected]
  );

  const handleVisualizeClick = useCallback(async () => {
    if (isAnimating) return;
    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList = storedAdjacencyList
      ? JSON.parse(storedAdjacencyList)
      : {};

    try {
      const response = await axios.post<GraphResponse>(
        "http://localhost:5000/api/graph",
        {
          array: adjacencyList,
          GraphAlgo: selectedGraphType,
          startNody:
            selectedGraphNode === "Choose Node" && startNodes.length > 0
              ? startNodes[0]
              : selectedGraphNode,
          endNode:
            selectedEndNode === "Choose Node" && startNodes.length > 0
              ? -1
              : selectedEndNode,
        }
      );

      setDisablePhysics(true);
      setIsAnimating(true);
      setIsPaused(false);
      setSnapshots(response.data.snapshots);
      snapshotIndexRef.current = 0;

      if (selectedGraphType === "Dijkstra") {
        setNodeDistances(response.data.distance || {});
      }
    } catch (error) {
      console.error("Error during path finding:", error);
      setDisablePhysics(false);
      setIsAnimating(false);
    }
  }, [selectedGraphType, selectedGraphNode, selectedEndNode, startNodes]);

  const animateSnapshots = useCallback(() => {
    console.log(snapshots);

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
        const currentNode = snapshots[snapshotIndexRef.current];

        // Check if the current snapshot is the end node
        if (!isPaused) {
          setNodeColors((prevColors) => ({
            ...prevColors,
            [currentNode]:
              currentNode.toString() === selectedEndNode
                ? "#6f4685"
                : "#818188",
          }));
          snapshotIndexRef.current += 1;
        }
      } else {
        // Reset all colors after finishing
        clearInterval(intervalRef.current as number);
        intervalRef.current = null;
        setDisablePhysics(false);
        setIsAnimating(false);
        setNodeColors({}); // Clear all colors
        setSnapshots([]); // Clear snapshots to prevent reanimation
      }
    }, 1000 / speed);
  }, [snapshots, speed, isPaused, selectedEndNode]);

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
        ArrayGenerator={() => (
          <>
            <GraphFuncionality
              startNodes={startNodes}
              onStartChange={handleStartChange}
            />
            <GraphEndNodeFunctionality
              endNodes={startNodes}
              onEndChange={handleEndChange}
            />
            <GraphTypeSwitch
              onTypeChange={handleGraphTypeChange}
              isDirected={isDirected}
            />
          </>
        )}
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
          distances={selectedGraphType === "Dijkstra" ? nodeDistances : {}}
        />
      </div>
    </>
  );
};

export { GraphScreen };
