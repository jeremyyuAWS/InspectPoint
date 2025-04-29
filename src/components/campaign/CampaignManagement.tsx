import React, { useState } from 'react';
import Card from '../base/Card';
import Button from '../base/Button';
import { Plus, Edit2, Trash2, Mail, Clock, Users } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'cold-outreach' | 'follow-up' | 'product-update' | 'event-invitation';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  targetAudience: string;
  sequence: {
    stage: number;
    type: string;
    template: string;
  }[];
  schedule: {
    startDate: string;
    endDate: string;
    timeZone: string;
  };
  metrics: {
    totalSent: number;
    openRate: number;
    clickRate: number;
    replyRate: number;
  };
}

const CampaignManagement: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q2 Product Launch',
      type: 'product-update',
      status: 'active',
      targetAudience: 'Enterprise Customers',
      sequence: [
        { stage: 1, type: 'initial', template: 'Product Announcement' },
        { stage: 2, type: 'follow-up', template: 'Feature Deep Dive' },
        { stage: 3, type: 'closing', template: 'Schedule Demo' }
      ],
      schedule: {
        startDate: '2024-04-01',
        endDate: '2024-06-30',
        timeZone: 'America/New_York'
      },
      metrics: {
        totalSent: 1500,
        openRate: 35.2,
        clickRate: 12.8,
        replyRate: 4.5
      }
    },
    {
      id: '2',
      name: 'Summer Webinar Series',
      type: 'event-invitation',
      status: 'scheduled',
      targetAudience: 'All Customers',
      sequence: [
        { stage: 1, type: 'initial', template: 'Webinar Invitation' },
        { stage: 2, type: 'reminder', template: 'One Week Reminder' },
        { stage: 3, type: 'reminder', template: 'One Day Reminder' }
      ],
      schedule: {
        startDate: '2024-06-01',
        endDate: '2024-08-31',
        timeZone: 'America/New_York'
      },
      metrics: {
        totalSent: 0,
        openRate: 0,
        clickRate: 0,
        replyRate: 0
      }
    }
  ]);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCreateCampaign = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsEditModalOpen(true);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Campaign Management</h2>
        <Button
          onClick={handleCreateCampaign}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className="text-sm text-gray-500">{campaign.type}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCampaign(campaign)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Target Audience</p>
                    <p className="text-sm font-medium">{campaign.targetAudience}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Sequence</p>
                    <p className="text-sm font-medium">{campaign.sequence.length} steps</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="text-sm font-medium">
                      {new Date(campaign.schedule.startDate).toLocaleDateString()} - {new Date(campaign.schedule.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {campaign.metrics.totalSent > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Sent</p>
                    <p className="text-lg font-semibold">{campaign.metrics.totalSent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Open Rate</p>
                    <p className="text-lg font-semibold text-blue-600">{campaign.metrics.openRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Click Rate</p>
                    <p className="text-lg font-semibold text-green-600">{campaign.metrics.clickRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reply Rate</p>
                    <p className="text-lg font-semibold text-purple-600">{campaign.metrics.replyRate.toFixed(1)}%</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
            {/* Add form fields here */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {isEditModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Edit Campaign</h3>
            {/* Add form fields here */}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement; 