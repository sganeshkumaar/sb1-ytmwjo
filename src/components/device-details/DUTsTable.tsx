import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { DUT, ProcessCorner } from '../../types/dut';

interface DUTsTableProps {
  duts: DUT[];
  onUpdateDUT: (data: { 
    id: string; 
    processCorner: string; 
    regression: number;
    lotId: string;
    waferId: string;
  }) => void;
}

interface EditingDUT {
  id: string;
  processCorner: ProcessCorner;
  regression: number;
  lotId: string;
  waferId: string;
}

export function DUTsTable({ duts, onUpdateDUT }: DUTsTableProps) {
  const [editingDUT, setEditingDUT] = useState<EditingDUT | null>(null);

  const handleEdit = (dut: DUT) => {
    setEditingDUT({
      id: dut.id,
      processCorner: dut.processCorner as ProcessCorner,
      regression: dut.regression,
      lotId: dut.lotId,
      waferId: dut.waferId
    });
  };

  const handleSave = async () => {
    if (editingDUT) {
      if (!editingDUT.lotId.trim() || !editingDUT.waferId.trim()) {
        alert('Lot ID and Wafer ID cannot be empty');
        return;
      }
      await onUpdateDUT(editingDUT);
      setEditingDUT(null);
    }
  };

  const handleCancel = () => {
    setEditingDUT(null);
  };

  if (duts.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No DUTs added yet. Click the "Add DUTs" button to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DUT ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Process Corner
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Regression
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lot ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wafer ID
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {duts.map((dut) => (
            <tr key={dut.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {dut.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingDUT?.id === dut.id ? (
                  <select
                    value={editingDUT.processCorner}
                    onChange={(e) => setEditingDUT(prev => prev ? { ...prev, processCorner: e.target.value as ProcessCorner } : null)}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="Nominal">Nominal</option>
                    <option value="Cold">Cold</option>
                    <option value="Mid Cold">Mid Cold</option>
                    <option value="Strong">Strong</option>
                    <option value="Mid Strong">Mid Strong</option>
                  </select>
                ) : (
                  dut.processCorner
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingDUT?.id === dut.id ? (
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingDUT.regression}
                    onChange={(e) => setEditingDUT(prev => prev ? { ...prev, regression: parseInt(e.target.value) || 0 } : null)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  dut.regression
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingDUT?.id === dut.id ? (
                  <input
                    type="text"
                    value={editingDUT.lotId}
                    onChange={(e) => setEditingDUT(prev => prev ? { ...prev, lotId: e.target.value } : null)}
                    className="w-32 px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Lot ID"
                  />
                ) : (
                  dut.lotId
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingDUT?.id === dut.id ? (
                  <input
                    type="text"
                    value={editingDUT.waferId}
                    onChange={(e) => setEditingDUT(prev => prev ? { ...prev, waferId: e.target.value } : null)}
                    className="w-32 px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Wafer ID"
                  />
                ) : (
                  dut.waferId
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {editingDUT?.id === dut.id ? (
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleSave}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(dut)}
                    className="p-1 text-gray-400 hover:text-[#DC6B4A]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}