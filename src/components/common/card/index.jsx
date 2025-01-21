import React from "react";

const AppCard = ({ children }) => {
  return (
    <div className="flex bg-white flex-col p-5 border border-slate-200 rounded-[16px] justify-between mb-4 shadow-[rgba(17,_17,_26,_0.06)_0px_0px_16px]">
      {children}
    </div>
  );
};

export default AppCard;

