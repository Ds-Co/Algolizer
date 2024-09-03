import React from 'react'
import Graph from 'react-vis-network-graph'
import {edges, nodes} from './data'

export default function GraphVisualization() {

    var options = {
        // General appearance
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#F5F5F5', // Light gray background
        font: {
          size: 14,
          face: 'Arial',
          color: '#333'
        },
      
        // Nodes
        nodes: {
            shape: 'dot',
            size: 10, // Set a fixed size for all nodes
            color: {
              background: '#89CFF0', // Set a fixed color for all nodes
              border: '#FFFFFF',
              highlight: {
                border: 'orange',
                background: '#FFD700'
              }
            },
            font: {
              color: '#FFFFFF'
            }
          },
                
        // Edges
        edges: {
            width: 2,
            color: {
              inherit: 'from',
              highlight: '#FFD700'
            },
            smooth: {
              type: 'continuous'
            },
            arrows: {
              to: {
                enabled: true,
                scale: 0.5
              }
            }
          },
          // Interaction
          physics: {
            enabled: true,
            solver: 'barnesHut',
            stabilization: {
              enabled: true,
              iterations: 100
            }
          },
          interaction: {
            navigationButtons: true,
            dragNodes: true,
            dragVertices: true,
            zoomView: true,
            navigation: true,
          //   tooltip: {
          //     enabled: true,
          //     delay: 200,
          //     template: (node) => {
          //       return `<div><strong>${node.id}</strong><br>${node.label}</div>`;
          //     }
          //   }
          },
        
          // Legend
          legend: {
            enabled: true,
            position: 'bottom',
            orientation: 'horizontal',
            nodeShape: 'circle'
          }
        };
  
      var data = {nodes: nodes, edges: edges}
      
    return (
      <div className='container'>
          <Graph
              graph = {data}
              options={options}
          />
      </div>
    )
  }

  export { GraphVisualization };
