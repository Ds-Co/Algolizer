import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../../../css/SortingVisualization.css"; // Importing CSS

interface SortingVisualizationProps {
  width: number;
  height: number;
}

type Snapshot = {
  index1: number;
  index2: number;
};

export const SortingVisualization: React.FC<SortingVisualizationProps> = ({
  width,
  height,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [sortingCompleted, setSortingCompleted] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    const margin = { top: 50, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

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
      .attr("y", innerHeight) // Start at the bottom
      .attr("height", 0) // Start with height 0
      .attr("fill", "steelblue") // Default color
      .merge(bars) // Merge enter and update selections
      .transition()
      .duration(600) // Apply size transition duration
      .ease(d3.easeCubicInOut)
      .attr("x", (_, i) => xScale(i.toString()) ?? 0)
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d) ?? 0)
      .attr("height", (d) => innerHeight - (yScale(d) ?? 0))
      .attr("fill", (_, i) =>
        highlightedIndices.includes(i) ? "orange" : sortingCompleted ? "green" : "steelblue"
      ) // Update color during transition
      .on("end", function () {
        if (sortingCompleted) {
          d3.select(this).attr("fill", "green");
        } else if (highlightedIndices.length > 0) {
          d3.select(this).attr("fill", "orange");
        } else {
          d3.select(this).attr("fill", "steelblue");
        }
      });

    // Exit phase
    bars
      .exit()
      .transition()
      .duration(300)
      .attr("height", 0)
      .attr("y", innerHeight)
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
      .attr("y", (d) => yScale(d) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .merge(texts)
      .text((d) => d.toString())
      .attr(
        "x",
        (_, i) => (xScale(i.toString()) ?? 0) + (xScale.bandwidth() ?? 0) / 2
      )
      .attr("y", (d) => yScale(d) - 5);

    // Exit phase for text
    texts.exit().remove();
  }, [data, width, height, highlightedIndices, sortingCompleted]);

  const applySnapshots = (snapshots: Snapshot[], delay: number) => {
    snapshots.forEach((snapshot, index) => {
      const preSwapDelay = delay / 2;

      setTimeout(() => {
        setHighlightedIndices([snapshot.index1, snapshot.index2]);
      }, index * delay);

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
      }, index * delay + preSwapDelay);
    });

    // After all snapshots are applied, mark sorting as completed
    setTimeout(() => {
      setSortingCompleted(true);
      setData((prevData) => [...prevData]); // Trigger a re-render
      setTimeout(() => {
        setSortingCompleted(false);
        setData((prevData) => [...prevData]); // Trigger a re-render to revert color
      }, 1000); // Revert color after 1 second
    }, snapshots.length * delay + delay / 2);
  };

  const startSorting = () => {
    const storedSnapshots = localStorage.getItem("Snapshots");
    if (storedSnapshots) {
      const snapshots: Snapshot[] = JSON.parse(storedSnapshots);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsSorting(true);
      setSortingCompleted(false);
      applySnapshots(snapshots, 1000);
    }
  };

  return (
    <div className="TryingMyBest">
      <button onClick={startSorting} disabled={isSorting}>
        {isSorting ? "Sorting..." : "Start Sorting"}
      </button>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};
