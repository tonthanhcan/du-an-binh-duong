import React, { useState } from 'react';
import { 
  Camera, 
  Filter, 
  Calendar, 
  MapPin, 
  User, 
  Download, 
  ZoomIn 
} from 'lucide-react';
import { SITE_PICTURES, SitePhoto } from '../data/projectData';

interface SitePicturePageProps {
  onOpenPhoto: (photo: SitePhoto) => void;
}

export const SitePicturePage: React.FC<SitePicturePageProps> = ({ onOpenPhoto }) => {
  const [weekFilter, setWeekFilter] = useState('ALL');
  const [towerFilter, setTowerFilter] = useState('ALL');

  const filteredPhotos = SITE_PICTURES.filter((p) => {
    if (weekFilter !== 'ALL' && p.week !== weekFilter) return false;
    if (towerFilter !== 'ALL' && p.tower !== towerFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 select-none">
      
      {/* 1. Header */}
      <div className="bg-white border border-[#DDE1E7] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono text-[#7B8798] uppercase">11 / SITE PICTURE</div>
          <h1 className="text-xl font-bold text-[#0F1B2D]">THƯ VIỆN HÌNH ẢNH CÔNG TRƯỜNG (SITE PHOTO GALLERY)</h1>
          <p className="text-xs text-[#5A6372] mt-0.5">
            Nhật ký hình ảnh hiện trường định kỳ tuần của 5 khối tháp TA#1 – TA#5 và hạ tầng kỹ thuật ngoài nhà
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Chọn tuần:</span>
            <select
              value={weekFilter}
              onChange={(e) => setWeekFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none font-mono"
            >
              <option value="ALL">Tất cả tuần</option>
              <option value="W42">Tuần [W42] (Mới nhất)</option>
              <option value="W41">Tuần [W41]</option>
              <option value="W40">Tuần [W40]</option>
              <option value="W39">Tuần [W39]</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5A6372] font-medium">Khối tháp:</span>
            <select
              value={towerFilter}
              onChange={(e) => setTowerFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-[#DDE1E7] bg-white text-xs outline-none font-mono"
            >
              <option value="ALL">Tất cả tháp</option>
              <option value="TA#1">Tháp TA#1</option>
              <option value="TA#2">Tháp TA#2</option>
              <option value="TA#3">Tháp TA#3</option>
              <option value="TA#4">Tháp TA#4</option>
              <option value="TA#5">Tháp TA#5</option>
              <option value="Toàn cảnh">Toàn cảnh Flycam</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => onOpenPhoto(photo)}
            className="bg-white border border-[#DDE1E7] overflow-hidden group cursor-pointer hover:border-[#F2A900] transition-all shadow-2xs flex flex-col"
          >
            {/* Image Box */}
            <div className="relative h-52 bg-black overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#0F1B2D] text-white px-2.5 py-1 text-xs font-mono font-bold flex items-center gap-1">
                <span>{photo.tower}</span>
                <span className="text-[#F2A900]">·</span>
                <span className="text-[#A0ABBD]">{photo.week}</span>
              </div>

              <div className="absolute inset-0 bg-[#0F1B2D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 bg-[#0F1B2D] text-white text-xs font-semibold flex items-center gap-1.5 border border-[#F2A900]">
                  <ZoomIn className="w-3.5 h-3.5 text-[#F2A900]" />
                  <span>Xem phóng to</span>
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-[#F2A900] uppercase font-semibold">
                  {photo.tag}
                </div>
                <h3 className="font-bold text-sm text-[#0F1B2D] group-hover:text-[#F2A900] transition-colors leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#5A6372] line-clamp-2">
                  {photo.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F4F5F7] space-y-1 text-xs text-[#7B8798] font-mono">
                <div className="flex items-center justify-between">
                  <span>Ngày chụp: <strong className="text-[#1A1F29]">{photo.capturedDate}</strong></span>
                  <span className="text-[11px] text-[#5A6372]">{photo.photographer}</span>
                </div>
                <div className="text-[11px] text-[#5A6372] truncate">
                  {photo.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
