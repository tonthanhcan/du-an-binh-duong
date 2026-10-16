export type UserRole = 'Admin' | 'ProjectManager' | 'Viewer';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  org: string;
  department: string;
  status: 'Hoạt động' | 'Tạm khóa';
  lastActive: string;
}

export type PageMenuId =
  | 'dashboard'
  | 'dashboard-summary'
  | 'dashboard-towers'
  | 'dashboard-finance'
  | 'schedule'
  | 'inspection'
  | 'payment'
  | 'rfi'
  | 'document-control'
  | 'procurement'
  | 'defect'
  | 'survey'
  | 'focus-point'
  | 'site-picture'
  | 'daily-report'
  | 'weekly-report';

export interface MenuItem {
  id: PageMenuId;
  number: string;
  label: string;
  subItems?: { id: PageMenuId; label: string }[];
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  org: string;
  department: string;
}
