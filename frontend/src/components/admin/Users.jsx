import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import Table from '../common/Table';
import StatusBadge from '../common/StatusBadge';
import SearchBar from '../common/SearchBar';
import Select from '../common/Select';
import Avatar from '../common/Avatar';
import Loader from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/users');
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching admin users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const name = u.fullName || u.email || '';
    const email = u.email || '';
    const role = (u.role || '').toLowerCase();

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    if (roleFilter === 'candidate') return matchesSearch && role === 'candidate';
    if (roleFilter === 'employer') return matchesSearch && role === 'employer';
    return matchesSearch;
  });

  const columns = [
    {
      header: 'User & Identity',
      key: 'name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.fullName || row.email} size="sm" verified={row.verified} />
          <div>
            <div className="font-bold text-xs text-cover font-sans">{row.fullName || 'Registered User'}</div>
            <div className="text-[11px] font-mono text-ink-soft">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      key: 'role',
      render: (role) => (
        <span className="font-mono text-xs uppercase font-bold text-gold-dark bg-gold/15 px-2 py-0.5 rounded border border-gold/30">
          {role || 'USER'}
        </span>
      ),
    },
    {
      header: 'Company / Headline',
      key: 'scope',
      render: (_, row) => (
        <span className="font-mono text-xs text-ink-soft">
          {row.companyName || row.headline || 'Active User'}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      render: (status) => <StatusBadge status={status || 'ACTIVE'} />,
    },
    {
      header: 'Action',
      key: 'action',
      align: 'right',
      render: (_, row) => (
        <Link
          to={`/admin/users/${row.id}`}
          className="text-xs font-bold text-gold-dark hover:text-cover font-sans"
        >
          Inspect &rarr;
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cover tracking-tight">
          User Directory &amp; Compliance
        </h2>
        <p className="text-xs text-ink-soft">
          Real MongoDB Users database: candidate passports, employer accounts, and verifications
        </p>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search by name, email, or company..."
          />
        </div>
        <div className="sm:col-span-4">
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Platform Roles' },
              { value: 'candidate', label: 'Candidates (Passports)' },
              { value: 'employer', label: 'Employers (Corporate)' },
            ]}
          />
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState title="No Users Found" description="No registered MongoDB users matching the filter criteria." />
      ) : (
        <Table columns={columns} data={filtered} />
      )}

    </div>
  );
};

export default AdminUsers;
export { AdminUsers };
