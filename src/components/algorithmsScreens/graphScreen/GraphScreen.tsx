import React, { useState, useEffect, useRef, useCallback } from "react";
import graphicon from "/src/assets/graph_logo.png";
import axios from "axios";
import "../../../css/GraphScreenStyle.css";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { DropDown } from "../DropDown";
import { GraphData } from "./GraphData";
import { GraphTypeSwitch } from "./GraphTypeSwitch";
import { GraphVisualization } from "./GraphVisualization";

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

interface AdjacencyList {
  [key: string]: { node: string; weight: number }[];
}

const generateTreeGraph = (nodeCount: number, graphType: string): { nodes: any[], edges: any[], adjacencyList: AdjacencyList } => {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({ id: i + 1, label: `${i + 1}` }));
  const edges: { from: number, to: number, weight: number, label: string }[] = [];
  const adjacencyList: AdjacencyList = {};

  for (let i = 1; i < nodeCount; i++) {
    const parent = Math.floor((i - 1) / 2) + 1;
    const child = i + 1;
    const weight = graphType === "Dijkstra" ? Math.floor(Math.random() * 10) + 1 : 1; // Edge weight based on algorithm type

    edges.push({ from: parent, to: child, weight, label: weight.toString() }); // Add label here
    edges.push({ 
      from: parent, 
      to: child, 
      weight, 
      label: graphType === "Dijkstra" ? weight.toString() : ""  // Show label only for Dijkstra
    });

    if (!adjacencyList[parent]) adjacencyList[parent] = [];
    if (!adjacencyList[child]) adjacencyList[child] = [];

    adjacencyList[parent].push({ node: child.toString(), weight });
    adjacencyList[child].push({ node: parent.toString(), weight });
  }

  return { nodes, edges, adjacencyList };
};


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
    <div className='nodes'>
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
    <div className='nodes'>
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
  const [selectedGraphNode, setSelectedGraphNode] = useState<string>("Choose Node");
  const [selectedEndNode, setSelectedEndNode] = useState<string>("Choose Node");
  const [startNodes, setStartNodes] = useState<string[]>([]);
  const [isDirected, setIsDirected] = useState(true);
  const [nodeDistances, setNodeDistances] = useState({});
  const [randomGraph, setRandomGraph] = useState<{ nodes: any[], edges: any[], adjacencyList: AdjacencyList } | null>(null);

  const snapshotIndexRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);
  const graphs: string[] = ["BFS", "DFS", "Dijkstra"];

  const graphsProps = {
    text: "Graph",
    icon: graphicon,
  };

  const MemoizedGraph = React.memo(GraphVisualization);

  const handleGraphTypeChange = (isDirected: boolean) => {
    setIsDirected(isDirected);
  };

  const handleSelectChange = useCallback((sortType: string) => {
    setSelectedGraphType(sortType);
  }, []);

  const handleStartChange = useCallback((startNode: string) => {
    setSelectedGraphNode(startNode);
  }, []);

  const handleEndChange = useCallback((endNode: string) => {
    setSelectedEndNode(endNode);
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

      if (value.trim() === '') {
        const nodeCount = Math.floor(Math.random() * 25) + 5; // Random between 5 and 20
        const { nodes, edges, adjacencyList } = generateTreeGraph(nodeCount,selectedGraphType);
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
        });

        const uniqueStartNodes = Object.keys(adjacencyList);
        setStartNodes(uniqueStartNodes);

        localStorage.setItem("graphInput", JSON.stringify(adjacencyList));

        const { nodes, edges: graphEdges } = GraphData();
        setNewNodes(nodes);
        setNewEdges(graphEdges);
      }
    },
    [isDirected]
  );

  const handleVisualizeClick = useCallback(async () => {
    if (isAnimating) return;

    const storedAdjacencyList = localStorage.getItem("graphInput");
    const adjacencyList: AdjacencyList = storedAdjacencyList
      ? JSON.parse(storedAdjacencyList)
      : (randomGraph ? randomGraph.adjacencyList : {});

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
  }, [isAnimating, randomGraph, selectedGraphType, selectedGraphNode, selectedEndNode, startNodes]);

  const animateSnapshots = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      if (snapshotIndexRef.current < snapshots.length) {
        const currentNode = snapshots[snapshotIndexRef.current];

        if (!isPaused) {
          setNodeColors((prevColors) => {
            const updatedColors: { [key: number]: string } = { ...prevColors };

            // Convert currentNode to a number
            const currentNodeId = Number(currentNode);

            // Check if this is the first snapshot
            const isFirstNode = snapshotIndexRef.current === 1;

            // Set color for the current node
            updatedColors[currentNodeId] = isFirstNode
              ? "#00FF00" // Green for the first node
              : "#818188"; // Default color for other nodes

            // If the node is the end node, override color
            if (currentNode.toString() === selectedEndNode || snapshotIndexRef.current === snapshots.length) {
              updatedColors[currentNodeId] = "#6f4685"; // End node color
            }

            return updatedColors;
          });

          // Increment snapshot index after updating colors
          snapshotIndexRef.current += 1;
        }
      } else {
        // Clear interval and reset states after animation
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

  useEffect(() => {
    // Generate a random node count between 5 and 20
    const nodeCount = Math.floor(Math.random() * 15) + 5;

    // Generate a tree graph with the random node count
    const { nodes, edges, adjacencyList } = generateTreeGraph(nodeCount, selectedGraphType);

    // Set the generated random graph and update the state
    setRandomGraph({ nodes, edges, adjacencyList });
    setNewNodes(nodes);
    setNewEdges(edges);
    setStartNodes(Object.keys(adjacencyList));

    // Store the generated adjacency list in localStorage
    localStorage.setItem("graphInput", JSON.stringify(adjacencyList));
  }, [selectedGraphType]);


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
        //  inputValue=""
        ArrayGenerator={() => (
          <>
            <div className="startEndNodes">
              <GraphFuncionality
                startNodes={startNodes}
                onStartChange={handleStartChange}
              />
              <GraphEndNodeFunctionality
                endNodes={startNodes}
                onEndChange={handleEndChange}
              /></div>
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
          isDirected={isDirected}
        />
      </div>
    </>
  );
};

export { GraphScreen };
