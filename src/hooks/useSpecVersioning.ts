import { useState, useCallback } from 'react';
import { 
  SpecVersion, 
  SpecChange,
  UnpublishedChange,
  SpecificationVersion 
} from '../types/specification';

export function useSpecVersioning() {
  const [currentVersion, setCurrentVersion] = useState<SpecVersion>({
    major: 1,
    minor: 0,
    patch: 0,
    timestamp: new Date().toISOString()
  });

  const [unpublishedChanges, setUnpublishedChanges] = useState<UnpublishedChange[]>([]);
  const [versionHistory, setVersionHistory] = useState<SpecificationVersion[]>([]);

  const addChange = useCallback((change: SpecChange) => {
    setUnpublishedChanges(prev => [
      ...prev,
      { ...change, selected: true }
    ]);
  }, []);

  const publishChanges = useCallback((selectedChanges: UnpublishedChange[]) => {
    if (selectedChanges.length === 0) return;

    // Determine version increment based on highest change level
    const hasTestChanges = selectedChanges.some(c => c.level === 'test');
    const hasParameterChanges = selectedChanges.some(c => c.level === 'parameter');
    const hasValueChanges = selectedChanges.some(c => c.level === 'value');

    let newVersion = { ...currentVersion };
    if (hasTestChanges) {
      newVersion.major += 1;
      newVersion.minor = 0;
      newVersion.patch = 0;
    } else if (hasParameterChanges) {
      newVersion.minor += 1;
      newVersion.patch = 0;
    } else if (hasValueChanges) {
      newVersion.patch += 1;
    }

    newVersion.timestamp = new Date().toISOString();

    // Create new version entry
    const newVersionEntry: SpecificationVersion = {
      version: newVersion,
      changes: selectedChanges,
      publishedBy: 'Tim Martin', // This would come from auth context in a real app
      publishedAt: new Date().toISOString()
    };

    setVersionHistory(prev => [...prev, newVersionEntry]);
    setCurrentVersion(newVersion);
    setUnpublishedChanges(prev => 
      prev.filter(change => !selectedChanges.find(sc => sc.id === change.id))
    );
  }, [currentVersion]);

  return {
    currentVersion,
    unpublishedChanges,
    versionHistory,
    addChange,
    publishChanges
  };
}