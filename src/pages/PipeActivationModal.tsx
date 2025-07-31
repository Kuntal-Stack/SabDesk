// src/components/PipeActivationModal.tsx
import React from 'react';

interface PipeActivationModalProps {
  open: boolean;
  onClose: () => void;
}

const PipeActivationModal: React.FC<PipeActivationModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '30%',
      left: '30%',
      backgroundColor: 'white',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: 1000
    }}>
      <h2>Select a Pipe</h2>
      <p>Pipe selection options will go here...</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PipeActivationModal;
