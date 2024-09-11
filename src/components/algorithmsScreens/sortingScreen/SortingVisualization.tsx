import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as d3 from "d3";
import "../../../css/SortingVisualization.css";

interface SortingVisualizationProps {
  width: number;
  height: number;
}

type Snapshot = {
  index1: number;
  index2: number;
};

export const SortingVisualization = forwardRef(
  ({ width, height }: SortingVisualizationProps, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [data, setData] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
    const [sortingCompleted, setSortingCompleted] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const snapshotsRef = useRef<Snapshot[]>([]); // To hold snapshots
    const pausedIndexRef = useRef<number>(0); // To track the paused snapshot index
    const isPausedRef = useRef<boolean>(false); // To track the paused state in async code

    const fetchData = () => {
      const storedData = localStorage.getItem("arrayInput");
      if (storedData) {
        const parsedData: number[] = JSON.parse(storedData);
        if (parsedData.length !== data.length && isSorting) {
          setIsSorting(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(fetchData, 300);
        } else if (!isSorting) {
          setData(parsedData);
        }
      }
    };

    useEffect(() => {
      fetchData();
      intervalRef.current = setInterval(fetchData, 300);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [isSorting]);

    useEffect(() => {
      if (!svgRef.current || data.length === 0) return;

      const svg = d3.select(svgRef.current);
      const margin = { top: 50, right: 20, bottom: 30, left: 40 }; // Adjusted top margin
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Update the scales based on the new data
      const xScale = d3
        .scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data) || 0])
        .nice()
        .range([innerHeight, 0]);

      // Handle bars
      const bars = svg
        .selectAll<SVGRectElement, number>("rect")
        .data(data, (_, i) => i.toString());

      // Enter phase
      bars
        .enter()
        .append("rect")
        .attr("x", (_, i) => xScale(i.toString()) ?? 0)
        .attr("width", xScale.bandwidth())
        .attr("y", innerHeight + margin.top) // Adjust y position to account for top margin
        .attr("height", 0) // Start with height 0
        .attr("fill", "black") // Set bar color to black
        .attr("rx", 5) // Set rounded corner radius
        .attr("ry", 5) // Set rounded corner radius
        .merge(bars) // Merge enter and update selections
        .transition()
        .duration(300) // Reduced duration for faster animation
        .ease(d3.easeCubicInOut)
        .attr("x", (_, i) => xScale(i.toString()) ?? 0)
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d) + margin.top) // Adjust y position to account for top margin
        .attr("height", (d) => innerHeight - (yScale(d) ?? 0))
        .attr(
          "fill",
          (_, i) =>
            highlightedIndices.includes(i)
              ? "#FFD700" // Highlight color (gold)
              : sortingCompleted
                ? "green" // Color after sorting completes
                : "black" // Default color
        );

      // Exit phase
      bars
        .exit()
        .transition()
        .duration(200)
        .attr("height", 0)
        .attr("y", innerHeight + margin.top)
        .remove();

      // Handle texts
      const texts = svg
        .selectAll<SVGTextElement, number>("text")
        .data(data, (_, i) => i.toString());

      // Enter phase for text
      texts
        .enter()
        .append("text")
        .attr(
          "x",
          (_, i) => (xScale(i.toString()) ?? 0) + (xScale.bandwidth() ?? 0) / 2
        )
        .attr("y", innerHeight + margin.top) // Start at the bottom with the bars, adjusted for top margin
        .attr("text-anchor", "middle")
        .attr("fill", "black") // Set text color to black
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .merge(texts)
        .text((d) => d.toString()) // Update the text content
        .transition()
        .duration(300) // Same duration as bars
        .attr(
          "x",
          (_, i) => (xScale(i.toString()) ?? 0) + (xScale.bandwidth() ?? 0) / 2
        )
        .attr("y", (d) => Math.max(yScale(d) + margin.top - 20, margin.top)); // Adjust y position for top margin and space above the bar (with padding)

      // Exit phase for text
      texts.exit().remove();
    }, [data, width, height, highlightedIndices, sortingCompleted]);

    const executeSnapshotStep = (index: number, delay: number) => {
      if (index >= snapshotsRef.current.length) {
        setSortingCompleted(true);
        setData((prevData) => [...prevData]); // Trigger a re-render
        setTimeout(() => {
          setSortingCompleted(false);
          setData((prevData) => [...prevData]); // Trigger a re-render to revert color
        }, 1000); // Revert color after 1 second
        return;
      }

      if (isPausedRef.current) {
        // If paused, skip to the next snapshot step when resumed
        pausedIndexRef.current = index;
        console.log(
          "Visualization is paused, current snapshot index:",
          pausedIndexRef.current
        );
        return;
      }

      const snapshot = snapshotsRef.current[index];
      const preSwapDelay = delay / 2;

      setHighlightedIndices([snapshot.index1, snapshot.index2]);

      setTimeout(() => {
        setData((prevData) => {
          const newData = [...prevData];
          [newData[snapshot.index1], newData[snapshot.index2]] = [
            newData[snapshot.index2],
            newData[snapshot.index1],
          ];
          return newData;
        });

        setTimeout(() => setHighlightedIndices([]), delay);
      }, preSwapDelay);

      setTimeout(() => {
        if (isPausedRef.current) {
          // If paused, return to this snapshot
          pausedIndexRef.current = index;
          console.log(
            "Visualization is paused, current snapshot index:",
            pausedIndexRef.current
          );
        } else {
          // Continue to the next snapshot
          executeSnapshotStep(index + 1, delay);
        }
      }, delay);
    };

    const applySnapshots = (snapshots: Snapshot[], delay: number) => {
      snapshotsRef.current = snapshots; // Store snapshots for resuming
      pausedIndexRef.current = 0; // Reset paused index
      setIsSorting(true);
      setSortingCompleted(false);
      setIsPaused(false);
      isPausedRef.current = false; // Ensure the ref is updated
      executeSnapshotStep(0, delay);
    };

    const pauseVisualization = () => {
      setIsPaused(true);
      isPausedRef.current = true; // Update the ref
      console.log("Visualization paused, isPaused state:", isPaused);
    };

    const resumeVisualization = () => {
      setIsPaused(false);
      isPausedRef.current = false; // Update the ref
      console.log("Visualization resumed, isPaused state:", isPaused);
      // Resume from the next snapshot
      executeSnapshotStep(pausedIndexRef.current + 1, 1000);
    };

    const startSorting = () => {
      const storedSnapshots = localStorage.getItem("Snapshots");
      if (storedSnapshots) {
        const snapshots: Snapshot[] = JSON.parse(storedSnapshots);
        if (intervalRef.current) clearInterval(intervalRef.current);
        applySnapshots(snapshots, 1000);
      }
    };

    // Expose functions to parent components
    useImperativeHandle(ref, () => ({
      startSorting,
      isSorting,
      pauseVisualization,
      resumeVisualization,
      isPaused,
    }));

    return (
      <div className="TryingMyBest">
        <svg ref={svgRef} width={width} height={height} />
      </div>
    );
  }
);
