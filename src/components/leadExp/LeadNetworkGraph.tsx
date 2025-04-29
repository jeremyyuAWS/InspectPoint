import React, { useEffect, useState } from 'react';
import { Lead } from '../../types';

interface Node {
  id: string;
  label: string;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface LeadNetworkGraphProps {
  leads: Lead[];
}

const LeadNetworkGraph: React.FC<LeadNetworkGraphProps> = ({ leads }) => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Initialize graph data
  useEffect(() => {
    // Create nodes from leads
    const topLeads = leads
      .filter(lead => lead.icpScore > 60)
      .slice(0, 20);
    
    const nodes: Node[] = topLeads.map(lead => ({
      id: lead.id,
      label: lead.companyName,
      radius: 10 + (lead.icpScore / 10),
      x: Math.random() * 600,
      y: Math.random() * 400,
      vx: 0,
      vy: 0,
      color: getNodeColor(lead.status)
    }));
    
    // Create links between similar companies
    const links: Link[] = [];
    
    for (let i = 0; i < nodes.length; i++) {
      const sourceId = topLeads[i].id;
      const sourceLocation = topLeads[i].location;
      
      for (let j = i + 1; j < nodes.length; j++) {
        const targetId = topLeads[j].id;
        const targetLocation = topLeads[j].location;
        
        // Link companies in the same region
        if (sourceLocation.split(',')[1]?.trim() === targetLocation.split(',')[1]?.trim()) {
          links.push({
            source: sourceId,
            target: targetId,
            strength: 0.5
          });
        }
        
        // Link companies with similar employee counts
        const sourceSizeCategory = getSizeCategory(topLeads[i].employees);
        const targetSizeCategory = getSizeCategory(topLeads[j].employees);
        
        if (sourceSizeCategory === targetSizeCategory) {
          links.push({
            source: sourceId,
            target: targetId,
            strength: 0.3
          });
        }
      }
    }
    
    setGraphData({ nodes, links });
  }, [leads]);
  
  // Simple physics simulation for the graph
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(prevData => {
        const newNodes = [...prevData.nodes];
        
        // Apply forces between nodes
        for (let i = 0; i < newNodes.length; i++) {
          for (let j = i + 1; j < newNodes.length; j++) {
            const nodeA = newNodes[i];
            const nodeB = newNodes[j];
            
            // Calculate distance
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            
            // Find if these nodes have a link
            const link = prevData.links.find(
              l => (l.source === nodeA.id && l.target === nodeB.id) || 
                  (l.source === nodeB.id && l.target === nodeA.id)
            );
            
            // Apply repulsive force
            const repulsiveForce = 200 / (distance * distance);
            const fx = dx / distance * repulsiveForce;
            const fy = dy / distance * repulsiveForce;
            
            nodeA.vx -= fx;
            nodeA.vy -= fy;
            nodeB.vx += fx;
            nodeB.vy += fy;
            
            // Apply attractive force if there's a link
            if (link) {
              const idealDistance = 100;
              const attractiveForce = (distance - idealDistance) * 0.05 * link.strength;
              
              nodeA.vx += dx / distance * attractiveForce;
              nodeA.vy += dy / distance * attractiveForce;
              nodeB.vx -= dx / distance * attractiveForce;
              nodeB.vy -= dy / distance * attractiveForce;
            }
          }
        }
        
        // Apply velocity, dampening, and boundary constraints
        for (const node of newNodes) {
          // Dampen velocity
          node.vx *= 0.9;
          node.vy *= 0.9;
          
          // Update position
          node.x += node.vx;
          node.y += node.vy;
          
          // Boundary constraints
          const padding = node.radius + 10;
          if (node.x < padding) {
            node.x = padding;
            node.vx = -node.vx * 0.5;
          }
          if (node.x > 600 - padding) {
            node.x = 600 - padding;
            node.vx = -node.vx * 0.5;
          }
          if (node.y < padding) {
            node.y = padding;
            node.vy = -node.vy * 0.5;
          }
          if (node.y > 400 - padding) {
            node.y = 400 - padding;
            node.vy = -node.vy * 0.5;
          }
        }
        
        return { nodes: newNodes, links: prevData.links };
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Helper function to get node color based on lead status
  const getNodeColor = (status: Lead['status']) => {
    switch(status) {
      case 'new': return '#60A5FA'; // blue
      case 'contacted': return '#F59E0B'; // amber
      case 'qualified': return '#A78BFA'; // purple
      case 'opportunity': return '#F97316'; // orange
      case 'customer': return '#10B981'; // green
      case 'lost': return '#EF4444'; // red
      default: return '#9CA3AF'; // gray
    }
  };
  
  // Helper function to categorize company size
  const getSizeCategory = (employees: number) => {
    if (employees < 20) return 'small';
    if (employees < 100) return 'medium';
    return 'large';
  };
  
  // Find lead by ID
  const getLeadById = (id: string) => {
    return leads.find(lead => lead.id === id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lead Network Graph</h3>
      
      <div className="border border-gray-200 rounded-lg p-4 relative" style={{ height: '400px' }}>
        <svg width="600" height="400">
          {/* Links */}
          {graphData.links.map((link, index) => {
            const sourceNode = graphData.nodes.find(n => n.id === link.source);
            const targetNode = graphData.nodes.find(n => n.id === link.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const isSelected = selectedNode && 
              (selectedNode === link.source || selectedNode === link.target);
            
            return (
              <line
                key={`link-${index}`}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={isSelected ? '#6B7280' : '#E5E7EB'}
                strokeWidth={isSelected ? 2 : 1}
                strokeOpacity={link.strength}
              />
            );
          })}
          
          {/* Nodes */}
          {graphData.nodes.map(node => (
            <g 
              key={node.id}
              transform={`translate(${node.x},${node.y})`}
              onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
              className="cursor-pointer"
            >
              <circle
                r={node.radius}
                fill={node.color}
                opacity={selectedNode ? (node.id === selectedNode ? 1 : 0.3) : 0.7}
                strokeWidth={node.id === selectedNode ? 2 : 0}
                stroke="#4B5563"
              />
              {node.id === selectedNode && (
                <text
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="10"
                  fill="white"
                  pointerEvents="none"
                >
                  {node.label.substring(0, 3)}
                </text>
              )}
            </g>
          ))}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded-md text-xs">
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
              <span>New</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span>Contacted</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
              <span>Qualified</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
              <span>Opportunity</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Customer</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Lost</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Selected company details */}
      {selectedNode && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-1">
            {getLeadById(selectedNode)?.companyName}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Location:</span>{' '}
              <span>{getLeadById(selectedNode)?.location}</span>
            </div>
            <div>
              <span className="text-gray-500">Employees:</span>{' '}
              <span>{getLeadById(selectedNode)?.employees}</span>
            </div>
            <div>
              <span className="text-gray-500">ICP Score:</span>{' '}
              <span>{getLeadById(selectedNode)?.icpScore}</span>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>{' '}
              <span className="capitalize">{getLeadById(selectedNode)?.status}</span>
            </div>
          </div>
          <div className="mt-2 text-sm">
            <span className="text-gray-500">Notes:</span>{' '}
            <span>{getLeadById(selectedNode)?.notes}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadNetworkGraph;