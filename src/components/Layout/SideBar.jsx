import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";

import React from "react";
import appColors from "../../theme/common/colors";
import useUIStore from "../../store/ui";
import { sidebarItems } from "./config";
import { useAuth } from "../../store";

const AppSidebar = React.memo(() => {
  const role = useAuth((state) => state.user.role); // Removed type casting
  const menuItems = sidebarItems[role] || [];
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const location = useLocation();

  return (
    <Sidebar collapsed={!isSidebarOpen} className="px-2 py-3 bg-white">
      <Menu className="bg-white">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const iconColor = isActive ? appColors.primary : "black";
          const icon = React.cloneElement(item.icon, {
            color: iconColor,
            fill: isActive ? appColors.primary : "none",
          });

          return (
            <MenuItem
              key={index}
              icon={icon}
              active={isActive}
              component={<Link to={item.path} />}
              style={{
                backgroundColor: isActive ? appColors.lightBlue : "white",
                borderRadius: 10,
                paddingLeft: 15,
              }}
            >
              <p
                className={`${
                  isActive
                    ? "text-primary font-medium"
                    : "text-black font-normal"
                } text-sm line-clamp-2 w-[150px]`}
              >
                {item.label}
              </p>
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
});

export default AppSidebar;
