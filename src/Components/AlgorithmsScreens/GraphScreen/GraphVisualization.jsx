import React from 'react'
import Graph from 'react-vis-network-graph'
import {edges, nodes} from './Data'

export default function GraphVisualization() {

    var options = {
        nodes: {
            shape: 'dot',
            size: 15, 
            color: {
              background: '#000000', 
              border: '#FFFFFF',
              highlight: {
                border: 'orange',
                background: '#FFD700'
              }
            },
            font: {
              color: '#000000'
            }
          },
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
                scaleFactor: 0.5
              }
            }
          },
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
            dragView: true,
            zoomView: true,
          },
        };
  
      var data = {nodes: nodes, edges: edges}
      
    return (
          <Graph
              graph = {data}
              options={options}
          />
    )
  }

  export { GraphVisualization };
