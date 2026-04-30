
import { useState } from "react";



export default function FileUploader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 mt-1">
        {/* Visual Trigger - */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-[100px] h-[100px] bg-[#f8fafc] border border-slate-200 rounded-[var(--radius-lg)] flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all group"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-slate-300 group-hover:text-slate-400">
              <path d="M21 12V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C10.1046 11 11 10.1046 11 9C11 7.89543 10.1046 7 9 7C7.89543 7 7 7.89543 7 9C7 10.1046 7.89543 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 16L7 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L16 12L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="flex flex-col">
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-[#3b82f6] font-semibold text-sm hover:underline text-left mb-1"
          >
            Upload Image
          </button>
          <p className="text-[11px] text-slate-400 leading-tight">
            Recommended size: Less than 2MB<br />(130px x 130px)
          </p>
        </div>
      </div>

       {/* <Modal isOpen={isModalOpen} /> */}
    </>
  );
}