import React, { createContext, useContext, useState } from 'react';
import { CurrentUser, UserAccount, UserRole } from '../types';

interface AuthContextType {
  currentUser: CurrentUser | null;
  usersList: UserAccount[];
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  addUser: (user: Omit<UserAccount, 'id' | 'lastActive'>) => void;
  updateUserRole: (id: string, newRole: UserRole) => void;
  toggleUserStatus: (id: string) => void;
  canEdit: boolean;
  canManageUsers: boolean;
  canApprove: boolean;
}

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'USR-01',
    name: 'Tôn Thanh Can',
    email: 'thanhcan@pmh.com.vn',
    role: 'Admin',
    org: 'Phú Mỹ Hưng Development',
    department: 'Ban Quản lý Dự án Bình Dương',
    status: 'Hoạt động',
    lastActive: 'Vừa xong',
  },
  {
    id: 'USR-02',
    name: 'Trần Văn Hưng',
    email: 'hung.tv@icic.vn',
    role: 'ProjectManager',
    org: 'Tư vấn Giám sát ICIC',
    department: 'Đoàn Giám sát Hiện trường',
    status: 'Hoạt động',
    lastActive: '10 phút trước',
  },
  {
    id: 'USR-03',
    name: 'Trương Vĩ (Zhang Wei)',
    email: 'zhangwei@cscec.com',
    role: 'ProjectManager',
    org: 'Tổng thầu CSCEC',
    department: 'Ban Chỉ huy Công trường',
    status: 'Hoạt động',
    lastActive: '1 giờ trước',
  },
  {
    id: 'USR-04',
    name: 'Ban Tổng Giám Đốc',
    email: 'bod.executive@pmh.com.vn',
    role: 'Viewer',
    org: 'Phú Mỹ Hưng Corporate',
    department: 'Ban Lãnh đạo CĐT',
    status: 'Hoạt động',
    lastActive: 'Hôm nay',
  },
  {
    id: 'USR-05',
    name: 'Kiểm toán & Thanh tra Xây dựng',
    email: 'audit.internal@pmh.com.vn',
    role: 'Viewer',
    org: 'Ban Kiểm soát Nội bộ',
    department: 'Phòng Pháp chế & Kiểm toán',
    status: 'Hoạt động',
    lastActive: 'Hôm qua',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default logged in as Admin for full experience, with 1-click switch in UI
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>({
    id: 'USR-01',
    name: 'Tôn Thanh Can',
    email: 'thanhcan@pmh.com.vn',
    role: 'Admin',
    org: 'Phú Mỹ Hưng Development',
    department: 'Ban Quản lý Dự án Bình Dương',
  });

  const [usersList, setUsersList] = useState<UserAccount[]>(INITIAL_USERS);

  const login = (role: UserRole, email?: string) => {
    const matched = usersList.find(u => u.role === role) || usersList[0];
    setCurrentUser({
      id: matched.id,
      name: matched.name,
      email: email || matched.email,
      role: role,
      org: matched.org,
      department: matched.department,
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'Admin') {
      setCurrentUser({
        id: 'USR-01',
        name: 'Tôn Thanh Can',
        email: 'thanhcan@pmh.com.vn',
        role: 'Admin',
        org: 'Phú Mỹ Hưng Development',
        department: 'Ban Quản lý Dự án Bình Dương',
      });
    } else if (role === 'ProjectManager') {
      setCurrentUser({
        id: 'USR-02',
        name: 'Trần Văn Hưng',
        email: 'hung.tv@icic.vn',
        role: 'ProjectManager',
        org: 'Tư vấn Giám sát ICIC',
        department: 'Đoàn Giám sát Hiện trường',
      });
    } else {
      setCurrentUser({
        id: 'USR-04',
        name: 'Ban Tổng Giám Đốc',
        email: 'bod.executive@pmh.com.vn',
        role: 'Viewer',
        org: 'Phú Mỹ Hưng Corporate',
        department: 'Ban Lãnh đạo CĐT',
      });
    }
  };

  const addUser = (userData: Omit<UserAccount, 'id' | 'lastActive'>) => {
    const newUser: UserAccount = {
      ...userData,
      id: `USR-${String(usersList.length + 1).padStart(2, '0')}`,
      lastActive: 'Mới tạo',
    };
    setUsersList([...usersList, newUser]);
  };

  const updateUserRole = (id: string, newRole: UserRole) => {
    setUsersList(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
    }
  };

  const toggleUserStatus = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === 'Hoạt động' ? 'Tạm khóa' : 'Hoạt động',
        };
      }
      return u;
    }));
  };

  const canEdit = currentUser?.role === 'Admin' || currentUser?.role === 'ProjectManager';
  const canManageUsers = currentUser?.role === 'Admin';
  const canApprove = currentUser?.role === 'Admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        usersList,
        login,
        logout,
        switchRole,
        addUser,
        updateUserRole,
        toggleUserStatus,
        canEdit,
        canManageUsers,
        canApprove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
