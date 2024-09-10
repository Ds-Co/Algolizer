// const { map } = await import("d3");
function BreadthFirstSearch(adjList, startNody, endNode) {
    let snapshots = [];
    let visited = new Set();
    let queueLike = [startNody];
  
    visited.add(startNody);
    snapshots.push(startNody);
  
    while (queueLike.length > 0) {
      let nody = queueLike.shift();
      for (let child of adjList[nody] || []) {
        if (!visited.has(child.node)) {
          visited.add(child.node);
          snapshots.push(child.node);
          queueLike.push(child.node);
  
          if (endNode == child.node) {
            return { snapshots };
          }
        }
      }
    }
    return { snapshots };
}
  

function DepthFirstSearch(adjList, startNody, endNode) {
    let snapshots = [];
    let visited = new Set();
    let found = false;
  
    function DFS(nody) {
      if (found) return;
  
      visited.add(nody);
      snapshots.push(nody);
  
      if (nody === endNode) {
        found = true;
        return;
      }
  
      for (let child of adjList[nody] || []) {
        if (!visited.has(child.node)) DFS(child.node);
      }
    }
  
    DFS(startNody);
  
    return { snapshots };
}
  
// Want to remove the endNode choice for this algorithm not logical to have it at all
function Dijkstra(adjList, startNody, endNode) {
    let snapshots = [];
    let distance = {};
    let visited = new Set();
    let priorityQueue = new Map();
  
    for (let nody in adjList) {
      distance[nody] = Infinity;
    }
    distance[startNody] = 0;
  
    priorityQueue.set(startNody, 0);
  
    while (priorityQueue.size > 0) {
      let currentNody = [...priorityQueue.entries()].reduce((a, b) =>
        a[1] < b[1] ? a : b
      )[0];
  
      priorityQueue.delete(currentNody);
      visited.add(currentNody);
      snapshots.push(currentNody);
  
      for (let { node: child, weight } of adjList[currentNody] || []) {
        if (!visited.has(child)) {
          if (distance[child] > distance[currentNody] + weight) {
            distance[child] = distance[currentNody] + weight;
            priorityQueue.set(child, distance[child]);
          }
        }
      }
    }
  
    return { snapshots, distance };
}
  
module.exports = { DepthFirstSearch, BreadthFirstSearch ,Dijkstra};
