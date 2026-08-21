import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye } from 'lucide-react';

const ContractViewer = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="glass-panel p-6 h-full flex flex-col group transition-all duration-300 hover:border-gold-soft/30">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gold" />
          <h3 className="font-display font-semibold text-lg text-ink">Smart Contract</h3>
        </div>
        
        <div className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-ink-faint text-xs">Total Value</p>
              <p className="font-mono text-ink">₹{project.budget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-ink-faint text-xs">Timeline</p>
              <p className="font-mono text-ink text-xs">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-ink-faint text-xs">Milestones</p>
              <p className="font-mono text-ink">{project.milestones.length}</p>
            </div>
            <div>
              <p className="text-ink-faint text-xs">Status</p>
              <p className="font-mono text-ink text-xs">{project.status}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="w-full mt-6 py-2.5 rounded-xl border border-ink/10 text-ink hover:bg-gold hover:border-gold hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Full Contract
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden pointer-events-auto"
              >
                <div className="p-4 border-b border-ink/5 flex justify-between items-center bg-white/50">
                  <h3 className="font-display font-semibold text-lg text-ink">Smart Contract - {project.id}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-ink/5 transition-colors">
                      <Download className="w-4 h-4 text-ink-soft" />
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-ink/5 transition-colors">
                      <span className="text-ink-soft text-lg leading-none">×</span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-8 overflow-y-auto bg-white">
                  {/* Rendered Contract Document */}
                  <div className="max-w-xl mx-auto space-y-6 text-sm text-ink font-serif">
                    <h1 className="text-2xl font-bold text-center mb-8">INDEPENDENT CONTRACTOR AGREEMENT</h1>
                    <p>This Agreement is entered into on {new Date(project.startDate).toLocaleDateString()}, between {project.client} ("Client") and {project.freelancer} ("Contractor").</p>
                    
                    <h2 className="font-bold text-lg mt-6">1. Services Provided</h2>
                    <p>Contractor agrees to provide services for the project: "{project.title}".</p>
                    
                    <h2 className="font-bold text-lg mt-6">2. Compensation</h2>
                    <p>Client agrees to pay Contractor a total sum of ₹{project.budget.toLocaleString()} held in TalentX Escrow, released according to the following milestones:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {project.milestones.map(m => (
                        <li key={m.id}>{m.title} ({m.weight}%): ₹{((m.weight / 100) * project.budget).toLocaleString()}</li>
                      ))}
                    </ul>
                    
                    <h2 className="font-bold text-lg mt-6">3. Dispute Resolution</h2>
                    <p>Any disputes arising under this agreement will be mediated through the TalentX platform governance protocol.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContractViewer;
