import React from 'react';
import { X, Calendar, MapPin, User, Download, Camera } from 'lucide-react';
import { SitePhoto } from '../data/projectData';

interface PhotoModalProps {
  photo: SitePhoto | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] w-full max-w-4xl border border-[#0F1B2D] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0F1B2D] text-white px-5 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#F2A900] text-[#0F1B2D] flex items-center justify-center font-bold text-xs font-mono">
              {photo.tower}
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">{photo.title}</h3>
              <p className="text-[11px] text-[#A0ABBD] font-mono">{photo.location}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#A0ABBD] hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Display */}
        <div className="bg-black flex-1 overflow-hidden flex items-center justify-center relative min-h-[350px]">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-[60vh] w-auto max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 bg-[#0F1B2D]/85 text-white px-3 py-1 text-xs font-mono border border-white/20">
            {photo.tag} · Tuần {photo.week}
          </div>
        </div>

        {/* Footer Details */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#DDE1E7] shrink-0 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5A6372]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#F2A900] shrink-0" />
              <span>Ngày chụp: <strong className="text-[#1A1F29] font-mono">{photo.capturedDate}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#F2A900] shrink-0" />
              <span className="truncate">Vị trí: <strong className="text-[#1A1F29]">{photo.location}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F2A900] shrink-0" />
              <span>Ghi nhận: <strong className="text-[#1A1F29]">{photo.photographer}</strong></span>
            </div>
          </div>

          <div className="p-2.5 bg-[#F4F5F7] text-xs text-[#1A1F29] border border-[#EBEFF5] flex items-center justify-between gap-4">
            <div className="leading-relaxed">
              <span className="font-semibold text-[#0F1B2D]">Nhật ký hiện trường: </span>
              {photo.caption}
            </div>
            <a
              href={photo.imageUrl}
              download={`${photo.id}_${photo.tower}.jpg`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#0F1B2D] text-white text-xs font-medium hover:bg-[#1E2D42] transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#F2A900]" />
              <span>Tải ảnh gốc</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
