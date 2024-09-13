import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../Css/InfoModalStyle.css'

interface AlgorithmInfo {
  description: string;
  pseudocode: string;
  reference: string;
  moreInfo: string;
}

// Dictionary to hold details for each algorithm
const algorithmDetails: Record<string, AlgorithmInfo> = {
  "Selection Sort": {
    description: "Selection sort is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list.",
    pseudocode: `selectionSort(array, size)
      for i from 0 to size - 1 do
        set i as the index of the current minimum
        for j from i + 1 to size - 1 do
          if array[j] < array[current minimum]
            set j as the new current minimum index
        if current minimum is not i
          swap array[i] with array[current minimum]
      end selectionSort`,
    reference: "https://www.programiz.com/dsa/selection-sort",
    moreInfo: "https://www.geeksforgeeks.org/selection-sort-algorithm-2/"
  },
  "Bubble Sort": {
    description: "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted.",
    pseudocode: `bubbleSort(array)
      for i <- 1 to sizeOfArray - 1
        for j <- 1 to sizeOfArray - 1 - i
          if leftElement > rightElement
            swap leftElement and rightElement
      end bubbleSort`,
    reference: "https://www.programiz.com/dsa/bubble-sort",
    moreInfo: "https://www.geeksforgeeks.org/bubble-sort-algorithm/"
  },
  "Quick Sort": {
    description: "Quick sort is a divide-and-conquer algorithm that selects a pivot element, partitions the list into elements less than and greater than the pivot, and recursively sorts the sublists.",
    pseudocode: `quickSort(array, leftmostIndex, rightmostIndex)
      if (leftmostIndex < rightmostIndex)
        pivotIndex <- partition(array, leftmostIndex, rightmostIndex)
        quickSort(array, leftmostIndex, pivotIndex - 1)
        quickSort(array, pivotIndex, rightmostIndex)

      partition(array, leftmostIndex, rightmostIndex)
        set rightmostIndex as pivotIndex
        storeIndex <- leftmostIndex - 1
        for i <- leftmostIndex + 1 to rightmostIndex
          if element[i] < pivotElement
            swap element[i] and element[storeIndex]
            storeIndex++
        swap pivotElement and element[storeIndex+1]
      return storeIndex + 1`,
    reference: "https://www.programiz.com/dsa/quick-sort",
    moreInfo: "https://www.geeksforgeeks.org/quick-sort-algorithm/"
  },
  "Insertion Sort": {
    description: "Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It picks elements from the unsorted portion and inserts them into their correct position in the sorted portion.",
    pseudocode: `insertionSort(array, size)
      for i from 1 to size - 1 do
        key = array[i]
        j = i - 1
        while j >= 0 and array[j] > key do
          array[j + 1] = array[j]
          j = j - 1
        array[j + 1] = key
      end insertionSort`,
    reference: "https://www.programiz.com/dsa/insertion-sort",
    moreInfo: "https://www.geeksforgeeks.org/insertion-sort-algorithm/"
  },
  "Bogo Sort": {
    description: "Bogo sort is a highly ineffective sorting algorithm that randomly permutes the list until it finds a sorted permutation.",
    pseudocode: `bogoSort(array, size)
      while not isSorted(array) do
        shuffle(array)
      end bogoSort

      isSorted(array)
        for i from 1 to size - 1 do
          if array[i] < array[i - 1]
            return false
        return true

      shuffle(array)
        for i from size - 1 down to 1 do
          j = random(0, i)
          swap array[i] with array[j]
      end shuffle`,
    reference: "https://www.geeksforgeeks.org/bogosort-permutation-sort/",
    moreInfo: "https://sortingalgos.miraheze.org/wiki/Bogosort"
  },
  "Heap Sort": {
    description: "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap and then repeatedly extracts the maximum element from the heap and reconstructs the heap.",
    pseudocode: `heapSort(array, size)
      buildMaxHeap(array, size)
      for i from size - 1 down to 1 do
        swap array[0] with array[i]
        heapify(array, 0, i)
      end heapSort

      buildMaxHeap(array, size)
        for i from floor(size / 2) - 1 down to 0 do
          heapify(array, i, size)
      end buildMaxHeap

      heapify(array, i, size)
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        if left < size and array[left] > array[largest]
          largest = left
        if right < size and array[right] > array[largest]
          largest = right
        if largest != i
          swap array[i] with array[largest]
          heapify(array, largest, size)
      end heapify`,
    reference: "https://www.programiz.com/dsa/heap-sort",
    moreInfo: "https://www.geeksforgeeks.org/c-program-for-heap-sort/"
  },
  "Merge Sort": {
    description: "Merge sort is a divide-and-conquer sorting algorithm that divides the list into smaller sublists, recursively sorts each sublist, and then merges the sorted sublists to produce the sorted list.",
    pseudocode: `mergeSort(array, left, right)
      if left < right
        mid = floor((left + right) / 2)
        mergeSort(array, left, mid)
        mergeSort(array, mid + 1, right)
        merge(array, left, mid, right)

      merge(array, left, mid, right)
        n1 = mid - left + 1
        n2 = right - mid
        leftArray = array[left..mid]
        rightArray = array[mid + 1..right]
        i = 0, j = 0, k = left
        while i < n1 and j < n2 do
          if leftArray[i] <= rightArray[j]
            array[k] = leftArray[i]
            i = i + 1
          else
            array[k] = rightArray[j]
            j = j + 1
          k = k + 1
        while i < n1 do
          array[k] = leftArray[i]
          i = i + 1
          k = k + 1
        while j < n2 do
          array[k] = rightArray[j]
          j = j + 1
          k = k + 1
      end merge`,
    reference: "https://www.programiz.com/dsa/merge-sort",
    moreInfo: "https://www.geeksforgeeks.org/merge-sort/"
  },
  "BFS": {
    description: "BFS is a graph traversal algorithm that explores vertices in the order of their distance from the starting vertex. It uses a queue to keep track of vertices to be explored.",
    pseudocode: `bfs(graph, startVertex)
      let queue = new Queue()
      let visited = new Set()
      queue.enqueue(startVertex)
      visited.add(startVertex)

      while not queue.isEmpty() do
        vertex = queue.dequeue()
        process(vertex)  
        for each neighbor of vertex do
          if neighbor not in visited
            queue.enqueue(neighbor)
            visited.add(neighbor)
      end bfs`,
    reference: "https://www.programiz.com/dsa/graph-bfs",
    moreInfo: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"
  },

  "DFS": {
    description: "DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion) to keep track of vertices to be explored.",
    pseudocode: `dfs(graph, startVertex)
      let stack = new Stack()
      let visited = new Set()
      stack.push(startVertex)

      while not stack.isEmpty() do
        vertex = stack.pop()
        if vertex not in visited
          process(vertex)  
          visited.add(vertex)
          for each neighbor of vertex do
            if neighbor not in visited
              stack.push(neighbor)
      end dfs`,
    reference: "https://www.programiz.com/dsa/graph-dfs",
    moreInfo: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/"
  },

  "Dijkstra": {
    description: "Dijkstra's algorithm finds the shortest path from a starting vertex to all other vertices in a weighted graph with non-negative weights. It uses a priority queue to explore the closest vertex.",
    pseudocode: `dijkstra(graph, startVertex)
      let distances = map with default value Infinity
      let previous = map with default value undefined
      let priorityQueue = new PriorityQueue()
      distances[startVertex] = 0
      priorityQueue.enqueue(startVertex, 0)

      while not priorityQueue.isEmpty() do
        currentVertex = priorityQueue.dequeue()
        for each neighbor of currentVertex do
          distance = distances[currentVertex] + weight(currentVertex, neighbor)
          if distance < distances[neighbor]
            distances[neighbor] = distance
            previous[neighbor] = currentVertex
            priorityQueue.enqueue(neighbor, distance)
      end dijkstra`,
    reference: "https://www.programiz.com/dsa/dijkstra-algorithm",
    moreInfo: "https://www.geeksforgeeks.org/introduction-to-dijkstras-shortest-path-algorithm/"
  },
};

interface Props {
  show: boolean;
  onClose: () => void;
  selectedAlgorithm: string;
}

const AlgorithmInfoModal: React.FC<Props> = ({ show, onClose, selectedAlgorithm }) => {
  const details = algorithmDetails[selectedAlgorithm] || {
    description: "No information available",
    pseudocode: "N/A",
    reference: "#",
    moreInfo: "#"
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{selectedAlgorithm}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{details.description}</p>
        <h5>Pseudocode</h5>
        <pre>{details.pseudocode}</pre>
        <p><a href={details.reference} target="_blank" rel="noopener noreferrer">Reference</a></p>
        <p><a href={details.moreInfo} target="_blank" rel="noopener noreferrer">For more information click here!</a></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlgorithmInfoModal;
