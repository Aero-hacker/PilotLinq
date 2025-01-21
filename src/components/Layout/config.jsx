import {
  IconBuildings,
  IconFileSearch,
  IconForms,
  IconLayoutDashboard,
  IconListCheck,
  IconListDetails,
  IconRestore,
} from "@tabler/icons-react";

const sideBarIconSize = 22;

export const sidebarItems = {
  Pilot_Linq: [
    {
      label: "Manage Vendors",
      icon: IconLayoutDashboard({ color: "black", size: sideBarIconSize }),
      path: "/app/managevendors",
    },
    {
      label: "Manage LEA",
      icon: IconBuildings({ color: "black", size: sideBarIconSize }),
      path: "/app/managelea",
    },
  ],
  LEA: [
    {
      label: "Manage Schools",
      icon: IconLayoutDashboard({ color: "black", size: sideBarIconSize }),
      path: "/app/manageschools",
    },
    {
      label: "Vendor Requests",
      icon: IconBuildings({ color: "black", size: sideBarIconSize }),
      path: "/app/vendorrequests",
    },
    {
      label: "Approved Vendors",
      icon: IconBuildings({ color: "black", size: sideBarIconSize }),
      path: "/app/approvedvendors",
    },
  ],
  School: [
    {
      label: "Manage Data",
      icon: IconLayoutDashboard({ color: "black", size: sideBarIconSize }),
      path: "/app/managedata",
    },
    {
      label: "School Property",
      icon: IconFileSearch({ color: "black", size: sideBarIconSize }),
      path: "/app/schoolproperty",
    },
  ],
  Vendor: [
    {
      label: "LEA Requests",
      icon: IconLayoutDashboard({ color: "black", size: sideBarIconSize }),
      path: "/app/learequests",
    },
  ],
  Teacher: [
    {
      label: "Approved LEA",
      icon: IconListDetails({ color: "black", size: sideBarIconSize }),
      path: "/app/approvedlea",
    },
  ],
};
