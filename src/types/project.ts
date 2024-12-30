export interface Project {
  id: string;
  name: string;
  device: string;
  status: 'not_started' | 'in_progress' | 'completed';
  createdBy: string;
  createdOn: string;
  thumbnail?: string;
}