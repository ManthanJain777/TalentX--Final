import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react';

const ChallengeSubmission = ({ challenge, onSubmitSolution }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file && !description.includes('github.com')) return; // Simple validation
    
    setIsSubmitting(true);
    try {
      if (onSubmitSolution) {
        await onSubmitSolution({ file, description });
      }
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-2 p-8 text-center flex flex-col items-center border-verified/30">
        <div className="w-16 h-16 rounded-full bg-verified/10 text-verified flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-display font-semibold text-xl text-ink mb-2">Solution Submitted Successfully</h3>
        <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
          Your solution for "{challenge.title}" has been securely sent to {challenge.employer}. You will be notified when they review the submissions.
        </p>
        <button 
          onClick={() => { setSubmitted(false); setFile(null); setDescription(''); }}
          className="px-6 py-2 rounded-lg border border-ink/10 text-sm font-medium hover:bg-white/50 transition-colors"
        >
          Submit Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="glass-2 p-6 md:p-8">
      <div className="mb-6 border-b border-ink/5 pb-4">
        <h3 className="font-display font-semibold text-xl text-ink">Submit Your Solution</h3>
        <p className="text-sm text-ink-soft mt-1">Provide a link to your repository or upload your compiled artifact.</p>
      </div>

      <div className="space-y-6">
        {/* Description / Link */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Solution Details or Repository Link</label>
          <textarea 
            placeholder="e.g. https://github.com/my-username/solution-repo&#10;&#10;I implemented the core requirements and added Docker support..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full h-32 bg-white/50 border border-cover/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none custom-scrollbar"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">Upload Artifact (Optional)</label>
          
          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              file ? 'border-verified/30 bg-verified/5' : 'border-ink/10 bg-white/30 hover:bg-white/50'
            }`}
          >
            {file ? (
              <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-ink/5 shadow-sm max-w-md mx-auto">
                <div className="flex items-center gap-3 overflow-hidden">
                  <File className="w-5 h-5 text-gold shrink-0" />
                  <div className="text-left truncate">
                    <p className="text-sm font-medium text-ink truncate">{file.name}</p>
                    <p className="text-[10px] font-mono text-ink-faint">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button onClick={() => setFile(null)} className="p-1 hover:bg-ink/5 rounded text-ink-soft hover:text-ink">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-ink-faint mb-3" />
                <p className="text-sm font-medium text-ink">Drag & drop your file here</p>
                <p className="text-xs text-ink-soft mt-1 mb-4">ZIP, PDF, or Markdown up to 10MB</p>
                <label className="px-4 py-2 rounded-lg border border-ink/10 text-xs font-medium cursor-pointer hover:bg-white transition-colors">
                  Browse Files
                  <input type="file" className="hidden" onChange={e => e.target.files && setFile(e.target.files[0])} />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Warning & Submit */}
        <div className="pt-4 border-t border-ink/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-soft flex items-center gap-1.5 max-w-md">
            <AlertCircle className="w-4 h-4 text-pending shrink-0" />
            By submitting, you agree to the Challenge Terms of Service. Plagiarism will result in account suspension.
          </p>
          
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || (!file && description.length < 10)}
            className="px-6 py-2.5 w-full md:w-auto rounded-xl bg-gold text-white text-sm font-medium hover:bg-gold-soft transition-all shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                Submitting...
              </>
            ) : (
              'Submit Solution'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeSubmission;
