import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../api/api';
import GlassCard from '../common/GlassCard';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';
import toast from 'react-hot-toast';
import { SpotlightCard } from '../react-bits/SpotlightCard';

const UserDetails = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/users');
        const userFound = (res.data || []).find((u) => u.id === id);
        setUserData(userFound || null);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleVerify = async () => {
    try {
      await api.patch(`/admin/users/${id}/verify`);
      toast.success('User marked as Verified in MongoDB');
      setUserData({ ...userData, verified: true });
    } catch (e) {
      toast.error('Failed to verify user');
    }
  };

  const handleSuspend = async () => {
    try {
      await api.patch(`/admin/users/${id}/suspend`);
      toast.success('User marked as Suspended in MongoDB');
      setUserData({ ...userData, status: 'SUSPENDED' });
    } catch (e) {
      toast.error('Failed to suspend user');
    }
  };

  if (loading) return <Loader />;

  if (!userData) {
    return (
      <div className="space-y-6">
        <Link to="/admin/users" className="inline-flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-ink">
          <ArrowLeft className="w-4 h-4" /> Back to Users
        </Link>
        <EmptyState title="User Not Found" description="Could not locate user account in MongoDB database." />
      </div>
    );
  }

  const name = userData.fullName || userData.companyName || userData.email;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/users"
            className="p-2 rounded-xl bg-white hover:bg-cover/5 border border-cover/15 text-cover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-soft font-bold">USER #{userData.id?.slice(-6)}</span>
              <StatusBadge status={userData.status || 'ACTIVE'} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
              {name} &bull; Inspection
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!userData.verified && (
            <Button
              type="button"
              onClick={handleVerify}
              variant="primary"
              size="sm"
            >
              Verify Account
            </Button>
          )}
          {userData.status !== 'SUSPENDED' && (
            <Button
              type="button"
              onClick={handleSuspend}
              variant="outline"
              size="sm"
            >
              Suspend Account
            </Button>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <SpotlightCard spotlightColor="rgba(199, 168, 104, 0.1)" className="p-6 bg-white/90 border-cover/15 space-y-6">
        <div className="flex items-center gap-4 border-b border-cover/10 pb-4">
          <Avatar name={name} size="lg" verified={userData.verified} />
          <div>
            <h3 className="font-display text-xl font-bold text-cover">{name}</h3>
            <p className="text-xs font-mono text-ink-soft">
              {userData.email} &bull; {userData.role} Role &bull; Status: {userData.status || 'ACTIVE'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-cover/5 border border-cover/10">
            <span className="text-ink-soft block">Role:</span>
            <span className="font-bold text-cover text-sm">{userData.role}</span>
          </div>
          <div className="p-3 rounded-xl bg-cover/5 border border-cover/10">
            <span className="text-ink-soft block">Verified:</span>
            <span className="font-bold text-verified text-sm">{userData.verified ? 'YES' : 'PENDING'}</span>
          </div>
          <div className="p-3 rounded-xl bg-cover/5 border border-cover/10">
            <span className="text-ink-soft block">Headline:</span>
            <span className="font-bold text-cover text-sm truncate">{userData.headline || 'N/A'}</span>
          </div>
          <div className="p-3 rounded-xl bg-cover/5 border border-cover/10">
            <span className="text-ink-soft block">Discoverable:</span>
            <span className="font-bold text-cover text-sm">{userData.discoverable ? 'YES' : 'NO'}</span>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-xs text-cover font-mono uppercase tracking-wider mb-2">
            MongoDB User ID
          </h4>
          <p className="font-mono text-xs bg-cover/[0.04] p-3 rounded-xl border border-cover/10 text-gold-dark break-all">
            {userData.id}
          </p>
        </div>
      </SpotlightCard>

    </div>
  );
};

export default UserDetails;
export { UserDetails };
