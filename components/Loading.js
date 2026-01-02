// components/Loading.js
"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-c_deep_black bg-opacity-90">
      <div className="flex flex-col items-center animate-softglow">
        <div className="w-16">
          <img src="/sigeo_padlock.png" alt="body-padlock" />
        </div>
        <span className="mt-2 inline-block font-mono overflow-hidden whitespace-nowrap text-white text-xs opacity-80 animate-typing">
          Aguarde um instante...
        </span>
        <div className="absolute bottom-0 right-0 h-[1px] bg-white w-0 animate-lineEffect"></div>
      </div>
    </div>
  );
}
