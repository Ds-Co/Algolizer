import React from "react";
import { ParticleSystem } from "../landPage/BackGroundAnimation";
import "../../css/ComplexityScreen.css";
function ComplexityScreen() {
  return (
    <div className="ComplexityScreenContainer">
      <div className="ComplexityScreenPlexusEffect">
        <ParticleSystem />
      </div>
      <div className="ComplexityScreenTextContainer">
        <h1 className="ComplexityScreenTitle">What is Complexity?</h1>
        <div className="ComplexityScreenMainBody">
          <p>
            <b>Algorithm complexity</b> refers to the efficiency of an algorithm
            in terms of the resources it consumes, primarily time and space, as
            the input size grows.
          </p>
          <p>
            <b>Time complexity</b> describes how the execution time of an
            algorithm increases with the size of the input, while{" "}
            <b>space complexity</b> refers to the amount of memory required.
          </p>
          <p>
            <b>The Big O </b>
            notation is commonly used to express this complexity. It provides an
            upper bound on the growth rate of an algorithm's time or space
            requirements, helping to classify algorithms based on their
            worst-case performance.
          </p>
          <ul>
            <li>
              <b>O(1) </b> (Constant Time) These algorithms have a runtime that
              does not change with the input size. Accessing an element in an
              array or hash table: Retrieving an element by index or key is a
              constant-time operation. Inserting an element into a hash table:
              On average, inserting an element into a well-designed hash table
              is O(1). Pushing or popping from a stack: These operations are
              done in constant time.
            </li>
            <li>
              <b>O(n) </b> (Linear Time) These algorithms have a runtime that
              grows linearly with the input size. Linear Search: Searching for a
              value in an unsorted array by checking each element one by one.
              Counting elements in a list: Traversing the list and counting the
              elements takes O(n). Breadth-First Search (BFS): Traversing all
              the nodes and edges of a graph, where n is the number of nodes.
            </li>
            <li>
              <b>O(n²) </b> (Quadratic Time) These algorithms have a runtime
              that grows quadratically with the input size, often involving
              nested loops. Bubble Sort: Compares each pair of adjacent elements
              and swaps them if they are in the wrong order. Selection Sort:
              Finds the minimum element and places it in its correct position,
              repeatedly for all elements. Insertion Sort: Inserts each element
              into its correct position by shifting larger elements to the
              right.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { ComplexityScreen };
