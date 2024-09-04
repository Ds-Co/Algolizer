function BreadthFirstSearch(adjList , StartNody)
{
    console.log(adjList);
    let snapshots=[];
    let visited=new Set();
    let queueLike = [StartNody];

    visited.add(StartNody);
    snapshots.push(StartNody);

    while(queueLike.length > 0){
        let nody=queueLike.shift();
        for(let child of adjList[nody] || []){
            if(!visited.has(child)){
                visited.add(child);
                snapshots.push(child);
                queueLike.push(child);
            }
        }
    }
    return {snapshots};
}

function DepthFirstSearch(adjList , StartNody)
{   
    let snapshots=[];
    let visited=new Set();

    function DFS(nody)
    {
        visited.add(nody);
        snapshots.push(nody);

        for(let child of adjList[nody] || [])
        {
            if(!visited.has(child))
                DFS(child);
        }
    }

    DFS(StartNody);

    return {snapshots};
}

module.exports={DepthFirstSearch,BreadthFirstSearch};