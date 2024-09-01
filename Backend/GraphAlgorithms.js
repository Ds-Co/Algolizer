function BreadthFirstSearch(adjList , StartNody)
{
    console.log(adjList);
    let snapshots=[];
    let visited=new Set();
    let queueLike = [StartNody];

    visited.add(StartNody);

    while(queueLike.length > 0){
        let nody=queueLike.shift();
        let temp=new Set();
        for(let child of adjList[nody] || []){
            if(!visited.has(child)){
                visited.add(child);
                temp.add(child);
                queueLike.push(child);
            }
        }
       
        snapshots.push([temp]);
    }
    return {VisitedNodes : [...visited] ,snapshots};
}

function DepthFirstSearch(adjList , StartNody)
{   
    let snapshots=[];
    let visited=new Set();

    function DFS(nody)
    {
        visited.add(nody);
        snapshots.push([nody]);

        for(let child of adjList[nody] || [])
        {
            if(!visited.has(child))
                DFS(child);
        }
    }

    DFS(StartNody);

    return {VisitedNodes: [...visited] , snapshots};
}

module.exports={DepthFirstSearch,BreadthFirstSearch};