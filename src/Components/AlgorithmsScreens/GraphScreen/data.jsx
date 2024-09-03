

//     // Process the input value
//     const edges = value
//       .split("\n") // Split the input by new lines to get each edge
//       .map((line) => {
//         const [node1, node2] = line.split(",").map((item) => item.trim());
//         return { node1, node2 }; // Create an edge object with node1 and node2
//       })
//       .filter((edge) => edge.node1 && edge.node2); // Filter out any invalid edges

//     // Optionally, convert edges to an adjacency list or other graph representation if needed
//     const adjacencyList: Record<string, string[]> = {};

//     edges.forEach((edge) => {
//       if (!adjacencyList[edge.node1]) {
//         adjacencyList[edge.node1] = [];
//       }
//       if (!adjacencyList[edge.node2]) {
//         adjacencyList[edge.node2] = [];
//       }
//       adjacencyList[edge.node1].push(edge.node2);
//       adjacencyList[edge.node2].push(edge.node1); // Assuming an undirected graph
//     });

//     localStorage.setItem("graphInput", JSON.stringify(adjacencyList)); // Store the graph representation in localStorage
 
// const storedAdjacencyList = localStorage.getItem("graphInput");
// const adjacencyList = storedAdjacencyList? JSON.parse(storedAdjacencyList)  : [];
// console.log("Adjacency List:", adjacencyList);

export var nodes = [
  {
    id: 1,
    label: "Node 1",
    
  },
  {
    id: 2,
    label: "Node 2",
    
  },
  {
    id: 3,
    label: "Node 3",
    
  },
  {
    id: 4,
    label: "Node 4",
    
  },
  {
    id: 5,
    label: "Node 5",
    
  },
  {
    id: 6,
    label: "Node 6",
    
  },
  {
    id: 7,
    label: "Node 7",
    
  },
  {
    id: 8,
    label: "Node 8",
    
  },
  {
    id: 9,
    label: "Node 9",
    
  },
  {
    id: 10,
    label: "Node 10",
    
  },
  {
    id: 11,
    label: "Node 11",
    
  }
];
export var edges = [
  { from: 1, to: 1 },
  { from: 2, to: 7 },
  { from: 3, to: 8 },
  { from: 4, to: 3 },
  { from: 5, to: 5 },
  { from: 6, to: 2 },
  { from: 7, to: 5 },
  { from: 8, to: 3 },
  { from: 9, to: 9 },

];