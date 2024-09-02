const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { bubbleSort, quickSort } = require('./sortingAlgorithms');

//
const { DepthFirstSearch, BreadthFirstSearch } = require('./GraphAlgorithms');
//

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js backend!');
});

// Sorting route
app.post('/api/sort', (req, res) => {

   // console.log("hello");

    const { array, sortType } = req.body;

    if (!Array.isArray(array) || typeof sortType !== 'string') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    let result;

    switch (sortType) 
    {
        case "Bubble Sort":
            result = bubbleSort([...array]);
            break;
        case "Quick Sort":
            result = quickSort([...array]);
            break;
        default:
            return res.status(400).json({ error: 'Invalid sort type' });
    }

    res.json(result);
});


// Graph route
app.post('/api/graph', (req, res) => {
    const { array, GraphAlgo } = req.body;
    if (typeof array !== 'object' || typeof GraphAlgo !== 'string') {
        return res.status(400).json({ error: 'Invalid input format' });
    }
    let result;

    try {

        switch (GraphAlgo) {
            case "DFS":
                result = DepthFirstSearch(array, '1');
                break;
            case "BFS":
                result = BreadthFirstSearch(array, '1');
                break;
            default:
                return res.status(400).json({ error: 'Invalid graph type' });
        }

        res.json(result);
    } catch (error) {
        console.error('Error processing graph algorithm:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

  


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});