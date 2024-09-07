function BreadthFirstSearch(adjList, startNody ,endNode) {
    let snapshots = [];
    let visited = new Set();
    let queueLike = [startNody];

    visited.add(startNody);
    snapshots.push(startNody);

    while (queueLike.length > 0) {
        let nody = queueLike.shift();
        for (let child of adjList[nody] || []) {
            if (!visited.has(child)) {
                visited.add(child);
                snapshots.push(child);
                queueLike.push(child);
                
                if(endNode==child){
                    return {snapshots};
                }
            }
        }
    }
    return { snapshots };
}

function DepthFirstSearch(adjList, startNody ,endNode) {
    let snapshots = [];
    let visited = new Set();
    let found=false;
    function DFS(nody) {
        if(found)
            return;

        visited.add(nody);
        snapshots.push(nody);
        
        if(nody === endNode){
            found=true;
            return;
        }

        for (let child of adjList[nody] || []) {
            if (!visited.has(child))
                DFS(child);
        }
    }

    DFS(startNody);
   
    return { snapshots };
}

module.exports = { DepthFirstSearch, BreadthFirstSearch };
