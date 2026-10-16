import React, { useState } from 'react';
import { X, Lock, Shield, UserCheck, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, email: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [emailOrId, setEmailOrId] = useState('thanhcan@pmh.com.vn');
  const [pinCode, setPinCode] = useState('••••••');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRoleQuickSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'Admin') {
      setEmailOrId('thanhcan@pmh.com.vn');
    } else if (role === 'ProjectManager') {
      setEmailOrId('hung.tv@icic.vn');
    } else {
      setEmailOrId('bod.executive@pmh.com.vn');
    }
    setError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrId.trim()) {
      setError('Vui lòng nhập email hoặc mã nhân viên hợp lệ.');
      return;
    }

    onLoginSuccess(selectedRole, emailOrId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans select-none">
      <div className="bg-[#FFFFFF] w-full max-w-md border border-[#0F1B2D] shadow-2xl relative">
        
        {/* Modal Header */}
        <div className="bg-[#0F1B2D] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#F2A900] bg-[#F49320] shrink-0">
              <img
                src="/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg"
                alt="Phú Mỹ Hưng Harmonie Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">ĐĂNG NHẬP PHÂN QUYỀN NỘI BỘ</h3>
              <p className="text-[11px] text-[#A0ABBD]">Phú Mỹ Hưng Harmonie · Dự án Bình Dương</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#A0ABBD] hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="text-xs text-[#5A6372] leading-relaxed">
            Hệ thống phân quyền truy cập theo 3 cấp độ: <strong>Quản trị viên</strong> (toàn quyền), <strong>Quản lý dự án</strong> (quyền cập nhật), <strong>Người xem</strong> (chỉ xem thông tin).
          </div>

          {/* Role selector tabs */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1F29] mb-2 uppercase tracking-wider">
              Chọn vai trò đăng nhập:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleRoleQuickSelect('Admin')}
                className={`p-2.5 text-center border transition-all cursor-pointer ${
                  selectedRole === 'Admin'
                    ? 'border-[#0F1B2D] bg-[#0F1B2D] text-white'
                    : 'border-[#DDE1E7] bg-[#F4F5F7] text-[#1A1F29] hover:border-[#CBD2DE]'
                }`}
              >
                <div className="font-bold">Quản trị viên</div>
                <div className="text-[10px] opacity-80 font-mono">Admin</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickSelect('ProjectManager')}
                className={`p-2.5 text-center border transition-all cursor-pointer ${
                  selectedRole === 'ProjectManager'
                    ? 'border-[#0F1B2D] bg-[#0F1B2D] text-white'
                    : 'border-[#DDE1E7] bg-[#F4F5F7] text-[#1A1F29] hover:border-[#CBD2DE]'
                }`}
              >
                <div className="font-bold">Quản lý DA</div>
                <div className="text-[10px] opacity-80 font-mono">PM / ICIC</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleQuickSelect('Viewer')}
                className={`p-2.5 text-center border transition-all cursor-pointer ${
                  selectedRole === 'Viewer'
                    ? 'border-[#0F1B2D] bg-[#0F1B2D] text-white'
                    : 'border-[#DDE1E7] bg-[#F4F5F7] text-[#1A1F29] hover:border-[#CBD2DE]'
                }`}
              >
                <div className="font-bold">Người xem</div>
                <div className="text-[10px] opacity-80 font-mono">Lãnh đạo / BOD</div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#1A1F29] mb-1">
                Tài khoản nội bộ / Email PMH
              </label>
              <input
                type="text"
                value={emailOrId}
                onChange={(e) => setEmailOrId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#DDE1E7] focus:border-[#0F1B2D] focus:ring-1 focus:ring-[#0F1B2D] outline-none font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1F29] mb-1">
                Mã xác thực bảo mật (PIN / Token)
              </label>
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#DDE1E7] focus:border-[#0F1B2D] focus:ring-1 focus:ring-[#0F1B2D] outline-none font-mono"
                required
              />
            </div>

            {error && (
              <div className="p-2 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0F1B2D] text-white font-semibold text-xs hover:bg-[#1A2C47] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>XÁC THỰC VÀ VÀO CỔNG ĐIỀU HÀNH</span>
            </button>
          </form>

          {/* Security notice */}
          <div className="pt-3 border-t border-[#EBEFF5] flex items-center gap-2 text-[11px] text-[#5A6372]">
            <Shield className="w-4 h-4 text-[#F2A900] shrink-0" />
            <span>Dữ liệu thuộc bản quyền Phú Mỹ Hưng · Quản trị phân quyền nghiêm ngặt.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
