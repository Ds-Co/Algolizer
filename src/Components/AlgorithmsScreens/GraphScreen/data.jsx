// const storedAdjacencyList = localStorage.getItem("graphInput");
// const adjacencyList = storedAdjacencyList ? JSON.parse(storedAdjacencyList) : {};
// // Generate nodes and edges
// export var nodes = Object.keys(adjacencyList).map(id => ({
//   id: Number(id),
//   label: `Node ${id}`
// }));

// export var edges = Object.entries(adjacencyList).flatMap(([node1, neighbors]) =>
//   neighbors.map(neighbor => ({
//     from: Number(node1),
//     to: Number(neighbor)
//   }))
// );

// // Export or use the nodes and edges
// console.log("Nodes:", nodes);
// console.log("Edges:", edges);

// // export var nodes = [
// //   {
// //     id: 1,
// //     label: "Node 1",
    
// //   },
// //   {
// //     id: 2,
// //     label: "Node 2",
    
// //   },
// //   {
// //     id: 3,
// //     label: "Node 3",
    
// //   },
// //   {
// //     id: 4,
// //     label: "Node 4",
    
// //   },
// //   {
// //     id: 5,
// //     label: "Node 5",
    
// //   },
// //   {
// //     id: 6,
// //     label: "Node 6",
    
// //   },
// //   {
// //     id: 7,
// //     label: "Node 7",
    
// //   },
// //   {
// //     id: 8,
// //     label: "Node 8",
    
// //   },
// //   {
// //     id: 9,
// //     label: "Node 9",
    
// //   },
// //   {
// //     id: 10,
// //     label: "Node 10",
    
// //   },
// //   {
// //     id: 11,
// //     label: "Node 11",
    
// //   }
// // ];
// // export var edges = [
// //   { from: 1, to: 1 },
// //   { from: 2, to: 7 },
// //   { from: 3, to: 8 },
// //   { from: 4, to: 3 },
// //   { from: 5, to: 5 },
// //   { from: 6, to: 2 },
// //   { from: 7, to: 5 },
// //   { from: 8, to: 3 },
// //   { from: 9, to: 9 },

// // ];