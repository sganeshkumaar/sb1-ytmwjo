import React, { useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import { X } from 'lucide-react';
import { ProcessCorner } from '../../types/dut';

interface AddDUTDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { 
    count: number; 
    processCorner: ProcessCorner; 
    regression: number;
    lotId: string;
    waferId: string;
  }) => void;
}

export function AddDUTDialog({ open, onClose, onAdd }: AddDUTDialogProps) {
  const [formData, setFormData] = useState({
    count: 1,
    processCorner: 'Nominal' as ProcessCorner,
    regression: 10,
    lotId: '',
    waferId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lotId.trim() || !formData.waferId.trim()) {
      alert('Please fill in both Lot ID and Wafer ID');
      return;
    }
    onAdd(formData);
    onClose();
    // Reset form
    setFormData({
      count: 1,
      processCorner: 'Nominal',
      regression: 10,
      lotId: '',
      waferId: ''
    });
  };

  const handleRegressionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setFormData(prev => ({
      ...prev,
      regression: Math.max(0, Math.min(100, value)) // Clamp between 0 and 100
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          padding: '24px'
        }
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Add DUTs</h2>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#64748B',
            '&:hover': {
              backgroundColor: '#F1F5F9'
            }
          }}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Number of DUTs
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.count}
            onChange={(e) => setFormData(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Process Corner
          </label>
          <select
            value={formData.processCorner}
            onChange={(e) => setFormData(prev => ({ ...prev, processCorner: e.target.value as ProcessCorner }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="Nominal">Nominal</option>
            <option value="Cold">Cold</option>
            <option value="Mid Cold">Mid Cold</option>
            <option value="Strong">Strong</option>
            <option value="Mid Strong">Mid Strong</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Regression
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.regression}
            onChange={handleRegressionChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Lot ID
          </label>
          <input
            type="text"
            value={formData.lotId}
            onChange={(e) => setFormData(prev => ({ ...prev, lotId: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter Lot ID"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Wafer ID
          </label>
          <input
            type="text"
            value={formData.waferId}
            onChange={(e) => setFormData(prev => ({ ...prev, waferId: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter Wafer ID"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#DC6B4A] rounded-lg hover:bg-[#C85E41] font-medium"
          >
            Add DUTs
          </button>
        </div>
      </form>
    </Dialog>
  );
}