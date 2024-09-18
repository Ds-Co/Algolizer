import {
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

const DEFAULT_DELAY = 1000;
const QUICK_DELAY = 500;

export const SortingVisualization = forwardRef(
  ({ width, height }: SortingVisualizationProps, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [data, setData] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
    const [sortingCompleted, setSortingCompleted] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [speed, setSpeed] = useState<"default" | "quick">("default");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const snapshotsRef = useRef<Snapshot[]>([]);
    const pausedIndexRef = useRef<number>(0);
    const isPausedRef = useRef<boolean>(false);

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

      const bars = svg
        .selectAll<SVGRectElement, number>("rect")
        .data(data, (_, i) => i.toString());

      bars
        .enter()
        .append("rect")
        .attr("x", (_, i) => xScale(i.toString()) ?? 0)
        .attr("width", xScale.bandwidth())
        .attr("y", innerHeight + margin.top)
        .attr("height", 0) 
        .attr("fill", "black")
        .attr("rx", 5) 
        .attr("ry", 5)
        .merge(bars)
        .transition()
        .duration(speed === "default" ? 300 : 150)
        .ease(d3.easeCubicInOut)
        .attr("x", (_, i) => xScale(i.toString()) ?? 0)
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d) + margin.top)
        .attr("height", (d) => innerHeight - (yScale(d) ?? 0))
        .attr(
          "fill",
          (_, i) =>
            highlightedIndices.includes(i)
              ? "#FFD700" 
              : sortingCompleted && !isSorting
              ? "green"
              : "black"
        );

      bars
        .exit()
        .transition()
        .duration(speed === "default" ? 200 : 100)
        .attr("height", 0)
        .attr("y", innerHeight + margin.top)
        .remove();

      const texts = svg
        .selectAll<SVGTextElement, number>("text")
        .data(data, (_, i) => i.toString());

      texts
        .enter()
        .append("text")
        .attr(
          "x",
          (_, i) => (xScale(i.toString()) ?? 0) + (xScale.bandwidth() ?? 0) / 2
        )
        .attr("y", innerHeight + margin.top)
        .attr("text-anchor", "middle")
        .attr("fill", "black") 
        .style("font-weight", "bold")
        .style("font-size", "12px")
        .merge(texts)
        .text((d) => d.toString())
        .transition()
        .duration(speed === "default" ? 300 : 150)
        .attr(
          "x",
          (_, i) => (xScale(i.toString()) ?? 0) + (xScale.bandwidth() ?? 0) / 2
        )
        .attr("y", (d) => Math.max(yScale(d) + margin.top - 20, margin.top));

      texts.exit().remove();
    }, [
      data,
      width,
      height,
      highlightedIndices,
      sortingCompleted,
      isSorting,
      speed,
    ]);

    const executeSnapshotStep = (index: number, delay: number) => {
      if (index >= snapshotsRef.current.length) {
        if (!isSorting) return;
        setSortingCompleted(true);
        setData((prevData) => [...prevData]); 
        setTimeout(() => {
          setSortingCompleted(false);
          setData((prevData) => [...prevData]);
        }, 1000);
        return;
      }

      if (isPausedRef.current) {
        pausedIndexRef.current = index;
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
          pausedIndexRef.current = index;
        } else {
          executeSnapshotStep(index + 1, delay);
        }
      }, delay);
    };

    const applySnapshots = (snapshots: Snapshot[], delay: number) => {
      snapshotsRef.current = snapshots;
      pausedIndexRef.current = 0;
      setIsSorting(true);
      setSortingCompleted(false);
      setIsPaused(false);
      isPausedRef.current = false;
      executeSnapshotStep(0, delay);
    };

    const pauseVisualization = () => {
      setIsPaused(true);
      isPausedRef.current = true;
    };

    const resumeVisualization = () => {
      setIsPaused(false);
      isPausedRef.current = false;
      executeSnapshotStep(
        pausedIndexRef.current + 1,
        speed === "default" ? DEFAULT_DELAY : QUICK_DELAY
      );
    };

    const startSorting = () => {
      const storedSnapshots = localStorage.getItem("Snapshots");
      if (storedSnapshots) {
        const snapshots: Snapshot[] = JSON.parse(storedSnapshots);
        if (intervalRef.current) clearInterval(intervalRef.current);
        applySnapshots(
          snapshots,
          speed === "default" ? DEFAULT_DELAY : QUICK_DELAY
        );
      }
    };

    const stopSorting = () => {
      setIsSorting(false);
      setIsPaused(false);
      setHighlightedIndices([]);
      isPausedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      pausedIndexRef.current = 0;
      snapshotsRef.current = [];
      console.log("Sorting stopped");
    };

    useImperativeHandle(ref, () => ({
      startSorting,
      stopSorting,
      pauseVisualization,
      resumeVisualization,
      setSpeed: (newSpeed: "default" | "quick") => setSpeed(newSpeed),
      isSorting,
      isPaused,
    }));

    return (
      <div className="TryingMyBest">
        <svg ref={svgRef} width={width} height={height}></svg>
      </div>
    );
  }
);
