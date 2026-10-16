import React, { useState } from 'react';
import { 
  X, 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Check, 
  Lock, 
  UserCheck, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    currentUser, 
    usersList, 
    switchRole, 
    addUser, 
    updateUserRole, 
    toggleUserStatus,
    canManageUsers 
  } = useAuth();

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('ProjectManager');
  const [newUserOrg, setNewUserOrg] = useState('Phú Mỹ Hưng');
  const [newUserDept, setNewUserDept] = useState('Ban Quản lý Dự án');

  if (!isOpen) return null;

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      org: newUserOrg,
      department: newUserDept,
      status: 'Hoạt động',
    });

    setNewUserName('');
    setNewUserEmail('');
    setIsAddingUser(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] w-full max-w-4xl border border-[#0F1B2D] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0F1B2D] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F2A900] text-[#0F1B2D] flex items-center justify-center font-bold text-xs font-mono">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">QUẢN TRỊ NGƯỜI DÙNG & PHÂN QUYỀN TRUY CẬP (RBAC)</h3>
              <p className="text-[11px] text-[#A0ABBD]">
                Hệ thống phân quyền theo 3 vai trò: Quản trị viên (Admin), Quản lý dự án (Project Manager), Người xem (Viewer)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#A0ABBD] hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Role Switcher Bar (Quick testing for leadership) */}
        <div className="bg-[#FEF9E7] border-b border-[#F2A900] px-6 py-3 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#0F1B2D]">
            <ShieldCheck className="w-4 h-4 text-[#F2A900] shrink-0" />
            <span>Tài khoản đang đăng nhập: <strong className="font-bold">{currentUser?.name}</strong> (<span className="font-mono text-[#D97706] font-bold">{currentUser?.role}</span>)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#5A6372] font-semibold">Chuyển vai trò thử nghiệm:</span>
            <div className="inline-flex border border-[#DDE1E7] bg-white text-xs">
              {(['Admin', 'ProjectManager', 'Viewer'] as const).map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => switchRole(role)}
                  className={`px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                    currentUser?.role === role
                      ? 'bg-[#0F1B2D] text-[#F2A900] font-bold'
                      : 'text-[#5A6372] hover:bg-[#F4F5F7] hover:text-[#0F1B2D]'
                  }`}
                >
                  {role === 'Admin' ? 'Quản trị viên' : role === 'ProjectManager' ? 'Quản lý DA' : 'Người xem'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Roles Permission Explanation Matrix */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#F9FAFB] border border-[#DDE1E7]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0F1B2D]">1. QUẢN TRỊ VIÊN (ADMIN)</span>
                <span className="font-mono text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5">Toàn quyền</span>
              </div>
              <ul className="text-[11px] text-[#5A6372] mt-2 space-y-1 list-disc list-inside">
                <li>Toàn quyền thêm, sửa, xóa mọi bản ghi</li>
                <li>Phê duyệt thanh toán, hồ sơ IR, RFI</li>
                <li>Quản lý danh sách tài khoản & phân quyền</li>
                <li>Xuất báo cáo và chỉnh sửa cấu hình tuần</li>
              </ul>
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border border-[#DDE1E7]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0F1B2D]">2. QUẢN LÝ DỰ ÁN (PM)</span>
                <span className="font-mono text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5">Quyền cập nhật</span>
              </div>
              <ul className="text-[11px] text-[#5A6372] mt-2 space-y-1 list-disc list-inside">
                <li>Tạo mới RFI câu hỏi hiện trường</li>
                <li>Cập nhật báo cáo ngày, phiếu IR, defect</li>
                <li>Đăng tải ảnh hiện trường 5 tháp</li>
                <li>Không được thay đổi phân quyền người dùng</li>
              </ul>
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border border-[#DDE1E7]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0F1B2D]">3. NGƯỜI XEM (VIEWER)</span>
                <span className="font-mono text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5">Chỉ xem</span>
              </div>
              <ul className="text-[11px] text-[#5A6372] mt-2 space-y-1 list-disc list-inside">
                <li>Xem toàn bộ tiến độ, tài liệu và chỉ số</li>
                <li>Tải tài liệu, biên bản họp, xuất Excel</li>
                <li>Tương tác biểu đồ S-curve & RFI</li>
                <li>Ẩn các nút "Thêm mới", "Chỉnh sửa", "Xóa"</li>
              </ul>
            </div>
          </div>

          {/* User List Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0F1B2D] uppercase tracking-wider">
                DANH SÁCH TÀI KHOẢN TRUY CẬP ({usersList.length} TÀI KHOẢN)
              </h4>
              {canManageUsers && (
                <button
                  onClick={() => setIsAddingUser(!isAddingUser)}
                  className="px-3 py-1.5 bg-[#0F1B2D] text-white text-xs font-semibold hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#F2A900]" />
                  <span>{isAddingUser ? 'Đóng form thêm' : 'Thêm người dùng mới'}</span>
                </button>
              )}
            </div>

            {/* Add User Form */}
            {isAddingUser && (
              <form onSubmit={handleCreateUser} className="p-4 bg-[#F4F5F7] border border-[#DDE1E7] space-y-3 text-xs">
                <div className="font-bold text-xs text-[#0F1B2D]">THÊM TÀI KHOẢN MỚI</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#1A1F29] font-medium mb-1">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-[#DDE1E7] bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1F29] font-medium mb-1">Email nội bộ</label>
                    <input
                      type="email"
                      placeholder="name@pmh.com.vn"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 border border-[#DDE1E7] bg-white outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A1F29] font-medium mb-1">Vai trò hệ thống</label>
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                      className="w-full px-3 py-1.5 border border-[#DDE1E7] bg-white outline-none"
                    >
                      <option value="Admin">Quản trị viên (Admin)</option>
                      <option value="ProjectManager">Quản lý dự án (PM)</option>
                      <option value="Viewer">Người xem (Viewer)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1A1F29] font-medium mb-1">Đơn vị / Cơ quan</label>
                    <select
                      value={newUserOrg}
                      onChange={(e) => setNewUserOrg(e.target.value)}
                      className="w-full px-3 py-1.5 border border-[#DDE1E7] bg-white outline-none"
                    >
                      <option value="Phú Mỹ Hưng Development">Chủ đầu tư Phú Mỹ Hưng</option>
                      <option value="Tư vấn Giám sát ICIC">Tư vấn Giám sát ICIC</option>
                      <option value="Tổng thầu CSCEC">Tổng thầu CSCEC</option>
                      <option value="Tư vấn Thiết kế">Tư vấn Thiết kế</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1A1F29] font-medium mb-1">Bộ phận / Chức danh</label>
                    <input
                      type="text"
                      placeholder="Kỹ sư hiện trường / Giám đốc"
                      value={newUserDept}
                      onChange={(e) => setNewUserDept(e.target.value)}
                      className="w-full px-3 py-1.5 border border-[#DDE1E7] bg-white outline-none"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-1.5 bg-[#0F1B2D] text-white font-semibold hover:bg-[#1E2D42] transition-colors"
                    >
                      Tạo tài khoản
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Users Table */}
            <div className="border border-[#DDE1E7] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F4F5F7] text-[#1A1F29] border-b border-[#DDE1E7] font-semibold">
                    <th className="py-2.5 px-3 font-mono">MÃ</th>
                    <th className="py-2.5 px-3">HỌ VÀ TÊN</th>
                    <th className="py-2.5 px-3 font-mono">EMAIL</th>
                    <th className="py-2.5 px-3">ĐƠN VỊ & BỘ PHẬN</th>
                    <th className="py-2.5 px-3">VAI TRÒ</th>
                    <th className="py-2.5 px-3 text-center">TRẠNG THÁI</th>
                    <th className="py-2.5 px-3 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBEFF5]">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-[#F9FAFB]">
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0F1B2D]">{u.id}</td>
                      <td className="py-2.5 px-3 font-medium text-[#1A1F29]">
                        {u.name}
                        {currentUser?.id === u.id && (
                          <span className="ml-2 px-1.5 py-0.2 text-[10px] bg-[#FEF9E7] text-[#0F1B2D] border border-[#F2A900] font-bold">
                            Bạn
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#5A6372]">{u.email}</td>
                      <td className="py-2.5 px-3 text-[#5A6372]">
                        <div>{u.org}</div>
                        <div className="text-[10px] text-[#7B8798]">{u.department}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        {canManageUsers ? (
                          <select
                            value={u.role}
                            onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                            className="px-2 py-1 border border-[#DDE1E7] bg-white text-xs outline-none font-mono"
                          >
                            <option value="Admin">Admin (Toàn quyền)</option>
                            <option value="ProjectManager">Project Manager</option>
                            <option value="Viewer">Viewer (Chỉ xem)</option>
                          </select>
                        ) : (
                          <span className="font-mono font-semibold text-[#0F1B2D]">{u.role}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2 py-0.5 text-[11px] font-mono border ${
                          u.status === 'Hoạt động'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {canManageUsers && (
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className="text-[11px] text-[#5A6372] hover:text-[#0F1B2D] underline font-medium cursor-pointer"
                          >
                            {u.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F9FAFB] border-t border-[#EBEFF5] flex items-center justify-between text-xs text-[#7B8798] shrink-0 font-mono">
          <span>Phân quyền RBAC chuẩn CĐT Phú Mỹ Hưng</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F1B2D] text-white hover:bg-[#1E2D42] transition-colors cursor-pointer"
          >
            Đóng bảng quản lý
          </button>
        </div>

      </div>
    </div>
  );
};
