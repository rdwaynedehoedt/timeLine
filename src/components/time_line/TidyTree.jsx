import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const TidyTree = ({ data }) => {
    const svgRef = useRef();

    useEffect(() => {
        const width = 400;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        const root = d3.hierarchy(data);
        const treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.left - margin.right]);
        treeLayout(root);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Links
        g.selectAll(".link")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkVertical().x(d => d.y).y(d => d.x))
            .attr("fill", "none")
            .attr("stroke", "#555");

        // Nodes
        const nodes = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        nodes.append("circle")
            .attr("r", 5)
            .attr("fill", d => d.children ? "#555" : "#999");

        nodes.append("text")
            .attr("dy", ".31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name);

    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default TidyTree;
