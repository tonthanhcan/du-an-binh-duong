import React from 'react';

interface HarmonieLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const HarmonieLogo: React.FC<HarmonieLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Medallion Logo Container */}
      <div className={`relative ${sizeMap[size]} shrink-0 rounded-full overflow-hidden shadow-sm border border-[#E08A18] bg-[#F49320]`}>
        <img
          src="/src/assets/images/logo_phumyhung_harmonie_1792124714081.jpg"
          alt="Phú Mỹ Hưng Harmonie"
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High-fidelity SVG fallback if image cannot be loaded
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {showText && (
        <div className="select-none">
          <div className="font-bold text-sm tracking-tight text-white leading-tight uppercase">
            DỰ ÁN BÌNH DƯƠNG
          </div>
          <div className="text-[11px] text-[#A0ABBD] font-normal tracking-wide">
            Phú Mỹ Hưng Harmonie · Khu căn hộ Phú Hưng
          </div>
        </div>
      )}
    </div>
  );
};
