const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { bubbleSort, quickSort, insertionSort, selectionSort, bogoSort, heapSort } = require('./sortingAlgorithms');
const { DepthFirstSearch, BreadthFirstSearch, Dijkstra } = require('./graphAlgorithms');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js backend!');
});

// Sorting route
app.post('/api/sort', (req, res) => {
  const { array, sortType } = req.body;

  if (!Array.isArray(array) || typeof sortType !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  let result;

  switch (sortType) {
    case "Bubble Sort":
      result = bubbleSort([...array]);
      break;
    case "Quick Sort":
      result = quickSort([...array]);
      break;
    case "Insertion Sort":
      result = insertionSort([...array]);
      break;
    case "Selection Sort":
      result = selectionSort([...array]);
      break;
    case "Bogo Sort":
      result = bogoSort([...array]);
      break;
    case "Heap Sort":
      result = heapSort([...array]);
      break;
    default:
      return res.status(400).json({ error: 'Invalid sort type' });
  }

  res.json(result);
});

// Graph route
app.post('/api/graph', (req, res) => {
  const { array, GraphAlgo, startNody, endNode } = req.body;

  if (typeof array !== 'object' || typeof GraphAlgo !== 'string') {
    return res.status(400).json({ error: 'Invalid input format' });
  }

  try {
    let result, parentArray;

    switch (GraphAlgo) {
      case "DFS":
        result = DepthFirstSearch(array, startNody, endNode);
        parentArray = result.parentArray;
        break;
      case "BFS":
        result = BreadthFirstSearch(array, startNody, endNode);
        parentArray = result.parentArray;
        break;
      case "Dijkstra":
        result = Dijkstra(array, startNody,endNode);
        parentArray = result.parentArray;
        break;
      default:
        return res.status(400).json({ error: 'Invalid graph type' });
    }

    // No need to return EndNodeStart anymore
    res.json({ ...result, parentArray });

  } catch (error) {
    console.error('Error processing graph algorithm:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
