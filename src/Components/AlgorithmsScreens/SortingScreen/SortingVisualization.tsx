import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as d3 from "d3";
import "../../../css/SortingVisualization.css";

// Define the props interface
interface SortingsProps {
  isEnabled: boolean;
}

// Use forwardRef to allow the parent to pass a ref
const SortingVisualization = forwardRef((props: SortingsProps, ref) => {
  const { isEnabled } = props;
  const chartRef = useRef<SVGSVGElement | null>(null);

  // Function to render the chart
  const renderChart = () => {
    // Get the array from localStorage
    const storedArray = localStorage.getItem("arrayInput");
    const array: number[] = storedArray ? JSON.parse(storedArray) : [];

    // Get the sorted array from localStorage
    const sortedArray = JSON.parse(localStorage.getItem("SortedArray") || "[]");

    // Use sortedArray if isEnabled is true, otherwise use array
    const dataArray: number[] = isEnabled ? sortedArray : array;
    console.log("HELP ME: " + dataArray);
    if (dataArray.length === 0 || !chartRef.current) return;

    // Set up the dimensions of the chart
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content (in case of re-render)
    svg.selectAll("*").remove();

    // Create a scale for the x and y axes
    const xScale = d3
      .scaleBand<number>()
      .domain(dataArray.map((_, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataArray) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create the bars
    svg
      .selectAll("rect")
      .data(dataArray)
      .join("rect")
      .attr("x", (_, i) => xScale(i)!)
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d))
      .attr("fill", "steelblue");

    // Add text labels on top of each bar
    svg
      .selectAll("text")
      .data(dataArray)
      .join("text")
      .attr("x", (_, i) => xScale(i)! + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5) // Position slightly above the bar
      .attr("text-anchor", "middle")
      .text((d) => d.toString())
      .attr("fill", "black");
  };

  // Expose the renderChart method to the parent component
  useImperativeHandle(ref, () => ({
    renderChart,
  }));

  // Always call the renderChart function
  useEffect(() => {
    const animate = () => {
      renderChart();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      // No specific cleanup is needed since requestAnimationFrame does not need canceling here
    };
  }, [isEnabled]); // Include isEnabled in the dependency array

  // Always render the SVG element
  return <svg className="TryingMyBest" ref={chartRef} />;
});

export { SortingVisualization };
