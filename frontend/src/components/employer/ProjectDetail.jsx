import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';
import ProjectHeader from '../project/ProjectHeader';
import MilestoneTracker from '../project/MilestoneTracker';
import EscrowVault from '../project/EscrowVault';
import DeliverableManager from '../project/DeliverableManager';
import DisputeButton from '../project/DisputeButton';
import ProjectChat from '../project/ProjectChat';
import ContractViewer from '../project/ContractViewer';
import Loader from '../ui/Loader';

const EmployerProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectId = id || '1';
        const projRes = await api.get(`/projects/${projectId}`);
        const baseProject = projRes.data;
        
        const [milestonesRes, escrowRes, deliverablesRes, messagesRes] = await Promise.all([
          api.get(`/projects/${projectId}/milestones`).catch(() => ({ data: [] })),
          api.get(`/projects/${projectId}/escrow`).catch(() => ({ data: { total: baseProject.totalBudget, released: 0, pending: baseProject.totalBudget } })),
          api.get(`/projects/${projectId}/deliverables`).catch(() => ({ data: [] })),
          api.get(`/messages/${projectId}`).catch(() => ({ data: [] }))
        ]);

        setProject({
          ...baseProject,
          budget: baseProject.totalBudget,
          client: baseProject.employerId || 'Employer',
          health: baseProject.healthScore > 80 ? 'green' : baseProject.healthScore > 50 ? 'yellow' : 'red',
          milestones: milestonesRes.data,
          escrow: escrowRes.data,
          deliverables: deliverablesRes.data,
          chat: messagesRes.data
        });
      } catch (err) {
        console.error('Error fetching project:', err);
        toast.error('Failed to load workspace.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [id]);

  if (loading || !project) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-gold/5 border border-gold/10 p-4 rounded-xl">
        <div className="text-sm">
          <span className="font-semibold text-ink">Action Required:</span> Check active milestones to release Escrow.
        </div>
        <button className="px-4 py-2 bg-verified text-white text-sm font-medium rounded-lg hover:bg-verified/90 transition-colors shadow-sm">
          Manage Escrow
        </button>
      </div>

      <ProjectHeader project={project} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <MilestoneTracker milestones={project.milestones} />
          <DeliverableManager deliverables={project.deliverables} isEmployer={true} />
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          <EscrowVault escrow={project.escrow} />
          <ProjectChat messages={project.chat} currentUser="Employer" />
          <ContractViewer project={project} />
        </div>
      </div>
      
      <div className="flex justify-end border-t border-ink/10 pt-6">
        <DisputeButton project={project} />
      </div>
    </div>
  );
};

export default EmployerProjectDetail;
