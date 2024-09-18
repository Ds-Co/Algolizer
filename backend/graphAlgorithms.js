function BreadthFirstSearch(adjList, startNody, endNode) {
  let snapshots = [];
  let visited = new Set();
  let queueLike = [startNody];
  let parentArray = {};
  visited.add(startNody);
  snapshots.push(startNody);
  parentArray[startNody] = null;
  let longestNode=-1;
  if(startNody!=endNode)
  {
    while (queueLike.length > 0) {
    let nody = queueLike.shift();
    for (let child of adjList[nody] || []) {
      if (!visited.has(child.node)) {
        visited.add(child.node);
        snapshots.push(child.node);
        queueLike.push(child.node);
        parentArray[child.node] = nody;
        longestNode=child.node;
        if (endNode == child.node) {
          return {
            snapshots,
            parentArray,
            shortestPath: reconstructPath(parentArray, startNody, endNode),
          };
        }
      }
    }
  }
  }
  
  if(endNode==-1)
  {
    return {
      snapshots,
      parentArray,
      shortestPath: reconstructPath(parentArray, startNody, longestNode),
    };
  }
  else
    return { snapshots, parentArray, shortestPath: [] };
}

function DepthFirstSearch(adjList, startNody, endNode) {
  let snapshots = [];
  let visited = new Set();
  let parentArray = {};
  let found = false;
  let longestNode = -1;

  function DFS(nody, parent = null) {
    if (found) return;
    visited.add(nody);
    snapshots.push(nody);
    
    longestNode = nody;
    parentArray[nody] = parent;
    if (nody === endNode) {
      found = true;
      return;
    }
    

    for (let child of adjList[nody] || []) {
      if (!visited.has(child.node)) {
        DFS(child.node, nody);
      }
    }
    
  }
  DFS(startNody);

  // If endNode is -1, return the path to the last node visited
  if (endNode === -1) {
    return {
      snapshots,
      parentArray,
      shortestPath: reconstructPath(parentArray, startNody, longestNode),
    };
  }
  // If we found the endNode, return the shortest path to it
  if (found) {
    return {
      snapshots,
      parentArray,
      shortestPath: reconstructPath(parentArray, startNody, endNode),
    };
  }
  // If endNode was provided but not reachable, return an empty path
  return {
    snapshots,
    parentArray,
    shortestPath: [],
  };
}

// Want to remove the endNode choice for this algorithm not logical to have it at all
function Dijkstra(adjList, startNody, endNode) {
  let snapshots = [];
  let distance = {};
  let visited = new Set();
  let priorityQueue = new Map();
  let parentArray = {};
  let longestNode = -1;

  // Initialize distances and parent array
  for (let nody in adjList) {
    distance[nody] = Infinity;
  }
  distance[startNody] = 0;
  parentArray[startNody] = null;
  priorityQueue.set(startNody, 0);

  while (priorityQueue.size > 0) {
    // Find the node with the smallest distance
    let currentNody = [...priorityQueue.entries()].reduce((a, b) =>
      a[1] < b[1] ? a : b
    )[0];

    priorityQueue.delete(currentNody);
    visited.add(currentNody);
    snapshots.push(currentNody);
    longestNode = currentNody; // Update the last visited node
    if(currentNody===endNode)
    {
      break;
    }
    // Traverse all adjacent nodes
    for (let { node: child, weight } of adjList[currentNody] || []) {
      if (!visited.has(child)) {
        if (distance[child] > distance[currentNody] + weight) {
          distance[child] = distance[currentNody] + weight;
          priorityQueue.set(child, distance[child]);
          parentArray[child] = currentNody;
        }
      }
    }
  }
  // Handle the three cases
  if (endNode === -1) {
    // Case 2: No endNode selected, return path to the last visited node
    return {
      snapshots,
      distance,
      parentArray,
      shortestPath: reconstructPath(parentArray, startNody, longestNode)
    };
  } else if (distance[endNode] !== Infinity) {
    // Case 1: endNode is reachable, return path to it
    return {
      snapshots,
      distance,
      parentArray,
      shortestPath: reconstructPath(parentArray, startNody, endNode)
    };
  } else {
    // Case 3: endNode is not reachable
    return {
      snapshots,
      distance,
      parentArray,
      shortestPath: []
    };
  }
}

function reconstructPath(parentArray, startNody, endNode) {
  let path = [];
  let current = endNode;

  while (current !== null && current !== startNody) {
    path.push(current);
    current = parentArray[current];

    if (current === undefined) {
      break;
    }
  }

  if (current === startNody) {
    path.push(startNody);
  }

  return path.reverse();
}

module.exports = { DepthFirstSearch, BreadthFirstSearch, Dijkstra };