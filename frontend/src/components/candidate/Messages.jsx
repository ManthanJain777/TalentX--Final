import React, { useState, useEffect } from 'react';
import { Send, CheckCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/api';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import EmptyState from '../ui/EmptyState';
import Loader from '../ui/Loader';
import toast from 'react-hot-toast';

const CandidateMessages = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/projects');
        const projList = Array.isArray(res.data) ? res.data : [];
        setProjects(projList);
        if (projList.length > 0) {
          setActiveProject(projList[0]);
        }
      } catch (err) {
        console.error('Error fetching message projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeProject?.id && !activeProject?._id) return;
      try {
        const projectId = activeProject.id || activeProject._id;
        const res = await api.get(`/messages/project/${projectId}`);
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching project messages:', err);
      }
    };
    fetchMessages();
  }, [activeProject]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeProject) return;

    try {
      const projectId = activeProject.id || activeProject._id;
      const res = await api.post('/messages', {
        projectId,
        senderId: user?.id,
        receiverId: activeProject.employerId || 'EMPLOYER',
        content: messageInput,
        sentAt: new Date().toISOString()
      });

      setMessages([...messages, res.data]);
      setMessageInput('');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  if (loading) return <Loader />;

  if (projects.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-cover tracking-tight">
            Encrypted Workspace Messages
          </h3>
          <p className="text-xs text-ink-soft">Direct milestone messaging with employers</p>
        </div>
        <EmptyState 
          title="No Active Message Channels" 
          description="Messages will appear here once you are engaged in an active governed project contract." 
        />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-140px)] min-h-[550px] glass-card p-0 overflow-hidden bg-white/95 border-cover/15 shadow-xl flex flex-col md:flex-row animate-in fade-in duration-300">
      
      {/* Left Pane: Conversation Threads */}
      <div className="w-full md:w-80 border-r border-cover/10 flex flex-col bg-page/40">
        <div className="p-4 border-b border-cover/10">
          <h3 className="font-display text-lg font-bold text-cover tracking-tight">
            Messages &amp; Contracts
          </h3>
          <p className="text-xs text-ink-soft">Real-time MongoDB Channels</p>
        </div>

        <div className="divide-y divide-cover/5 overflow-y-auto flex-1">
          {projects.map((proj) => {
            const pId = proj.id || proj._id;
            const isSelected = (activeProject?.id || activeProject?._id) === pId;
            return (
              <div
                key={pId}
                onClick={() => setActiveProject(proj)}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-cover/10 border-l-4 border-l-gold'
                    : 'hover:bg-cover/[0.03]'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-xs text-cover font-sans truncate">{proj.title}</span>
                </div>
                <div className="text-[11px] font-mono text-gold-dark font-semibold mb-1">
                  {proj.client || proj.employerName || 'Employer Workspace'}
                </div>
                <p className="text-xs text-ink-soft line-clamp-1 leading-tight">
                  Status: {proj.status || 'Active'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Chat Stream */}
      <div className="flex-1 flex flex-col justify-between bg-white">
        
        {/* Thread Header */}
        <div className="p-4 border-b border-cover/10 bg-page/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={activeProject?.title || 'Project'} size="md" />
            <div>
              <h4 className="font-bold text-sm text-cover font-sans">{activeProject?.title}</h4>
              <div className="text-xs text-ink-soft font-mono">
                Client ID: <strong className="text-gold-dark">{activeProject?.employerId}</strong>
              </div>
            </div>
          </div>

          <div className="passport-stamp text-[10px] text-verified border-verified/40 px-2 py-0.5">
            ESCROW SECURED THREAD
          </div>
        </div>

        {/* Chat Messages */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center p-8">
              <p className="text-xs text-ink-soft">No messages in this workspace thread yet. Send a message below.</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div
                  key={msg.id || idx}
                  className={`flex flex-col ${
                    isMe ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed ${
                      isMe
                        ? 'bg-cover text-white rounded-br-xs shadow-sm'
                        : 'bg-page text-ink border border-cover/10 rounded-bl-xs'
                    }`}
                  >
                    {msg.content || msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-ink-soft">
                    <span>{msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-verified" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="p-3.5 border-t border-cover/10 bg-page/40 flex items-center gap-2.5">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message or milestone deliverable update..."
            className="flex-1 bg-white border border-cover/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-ink focus-visible:outline-none focus:ring-2 focus:ring-gold/20"
          />
          <Button type="submit" variant="primary" size="md" icon={Send}>
            Send
          </Button>
        </form>

      </div>

    </div>
  );
};

export default CandidateMessages;
export { CandidateMessages };
