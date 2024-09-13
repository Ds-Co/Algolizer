function BreadthFirstSearch(adjList, startNody, endNode) {
  let snapshots = [];
  let visited = new Set();
  let queueLike = [startNody];
  let parentArray = {};
  visited.add(startNody);
  snapshots.push(startNody);
  parentArray[startNody] = null;
  let longestNode=-1;
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

function reconstructPath(parentArray, startNody, endNode) {
  let path = [];
  let current = endNode;
  while (current !== null) {
    path.push(current);
    current = parentArray[current];
  }
  return path.reverse();
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
    parentArray[nody] = parent;
    longestNode = nody;

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

  for (let nody in adjList) {
    distance[nody] = Infinity;
  }
  distance[startNody] = 0;
  parentArray[startNody] = null;
  priorityQueue.set(startNody, 0);

  while (priorityQueue.size > 0) {
    let currentNody = [...priorityQueue.entries()].reduce((a, b) =>
      a[1] < b[1] ? a : b
    )[0];
    longestNode = currentNody;
    priorityQueue.delete(currentNody);
    visited.add(currentNody);
    snapshots.push(currentNody);

    // If we reached the endNode, return the path
    if (currentNody === endNode) {
      return {
        snapshots,
        distance,
        parentArray,
        shortestPath: reconstructPath(parentArray, startNody, endNode),
      };
    }

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

  // If endNode is -1, return the path to the last node visited
  if (endNode === -1) {
    return {
      snapshots,
      distance,
      parentArray,
      shortestPath: reconstructPath(parentArray, startNody, longestNode),
    };
  }

  // If endNode was provided but not reachable, return an empty path
  return {
    snapshots,
    distance,
    parentArray,
    shortestPath: [],
  };
}

module.exports = { DepthFirstSearch, BreadthFirstSearch, Dijkstra };
