import {
    IconBell,
    IconLogout,
    IconMenu3,
    IconMenu4,
    IconSettings,
    IconUser,
  } from "@tabler/icons-react";
  import appColors from "../../theme/common/colors";
  import appAssets from "../../constants/assets";
  import { Badge, Button } from "antd";
  import useUIStore from "../../store/ui";
  import { useAuth } from "../../store";
  
  const AppHeader = () => {
    const { toggleSidebar, isSidebarOpen } = useUIStore((state) => state);
    const logOut = useAuth((state) => state.logOut);
  
    return (
      <header className="bg-white border border-borderGray fixed top-0 left-0 w-full z-10">
        <div className="px-4 py-2 flex justify-between items-center">
          <div className="flex gap-3 flex-row items-center ml-1">
            <div
              onClick={toggleSidebar}
              className="hover:bg-slate-200 p-2 rounded-xl duration-200 cursor-pointer"
            >
              {isSidebarOpen ? (
                <IconMenu3 size={25} strokeWidth={1.5} />
              ) : (
                <IconMenu4 size={25} strokeWidth={1.5} />
              )}
            </div>
            <img
              src={appAssets.common.logo}
              alt="My Attendance Flow"
              className="h-8"
            />
            <div className="text-xl font-medium text-slate-600">
              My Attendance Flow
            </div>
          </div>
  
          <nav className="flex mr-3">
            <Button type="text">
              <Badge count={5}>
                <IconBell strokeWidth={1.3} />
              </Badge>
            </Button>
            <Button type="text">
              <IconUser strokeWidth={1.3} />
            </Button>
            <Button type="text">
              <IconSettings strokeWidth={1.3} />
            </Button>
            <Button type="text" onClick={logOut}>
              <IconLogout strokeWidth={1.78} color={appColors.red} />
            </Button>
          </nav>
        </div>
      </header>
    );
  };
  
  export default AppHeader;
  