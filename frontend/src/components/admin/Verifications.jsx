import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/api';
import VerificationQueue from './VerificationQueue';
import { ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import Loader from '../ui/Loader';

const AdminVerifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        const response = await api.get('/admin/verifications');
        const mapped = response.data.map(u => ({
          id: u.id,
          user: u.fullName || u.companyName || u.email || 'Registered User',
          email: u.email,
          type: u.role === 'CANDIDATE' ? 'Skill' : 'Identity',
          evidence: u.role === 'CANDIDATE' ? 'GitHub profile attached' : 'Business registration',
          status: 'pending',
          submitted: new Date().toISOString().split('T')[0],
          details: {
            info: 'Additional info fetched from user profile'
          }
        }));
        setVerifications(mapped);
      } catch (err) {
        console.error('Error fetching verifications:', err);
        toast.error('Failed to load verifications.');
      } finally {
        setLoading(false);
      }
    };
    fetchVerifications();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-ink">Verifications</h2>
        <p className="text-sm text-ink-soft mt-1 font-mono">Review user evidence and manage trust scores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-pending/10 rounded-xl text-pending">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-ink">{verifications.length}</p>
            <p className="text-sm text-ink-soft">Pending Review</p>
          </div>
        </div>
        
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-verified/10 rounded-xl text-verified">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-ink">0</p>
            <p className="text-sm text-ink-soft">Approved Today</p>
          </div>
        </div>

        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 bg-gold/10 rounded-xl text-gold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-ink">92%</p>
            <p className="text-sm text-ink-soft">Avg Trust Score</p>
          </div>
        </div>
      </div>

      <VerificationQueue verifications={verifications} />
    </div>
  );
};

export default AdminVerifications;
