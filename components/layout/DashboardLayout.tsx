import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <SideBar />
      <div className="max-w-[calc(100% - 200px)] ml-[200px] mt-20 ">
        <div className="px-3">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;