import { IconChevronLeft, IconHome2 } from "@tabler/icons-react";
import { Breadcrumb, Button } from "antd";
import { useNavigate } from "react-router-dom";

const AppBreadcrumb = ({ path }) => (
  <Breadcrumb
    className="flex items-center"
    items={[
      {
        href: "/",
        title: <IconHome2 size={20} />,
      },
      ...path.map((item, index) => ({
        href: item.url,
        title: (
          <p
            className={
              path.length - 1 === index ? "font-medium text-black" : ""
            }
          >
            {item.title}
          </p>
        ),
      })),
    ]}
  />
);

const AppBody = ({ className = "", headerTitle, path, children }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={"pl-6 pr-[40px] py-5 " + className}>
        {headerTitle && (
          <div className="flex flex-col sm:flex-row justify-between mb-4 items-start sm:items-center">
            <div className="flex items-center gap-3">
              {path && path.length >= 2 && (
                <Button
                  onClick={() => navigate(-1)}
                  className="text-[#1E293B]"
                  icon={<IconChevronLeft />}
                ></Button>
              )}

              <p className="text-2xl font-regular text-slate-700 mb-2 sm:mb-0">
                {headerTitle}
              </p>
            </div>

            {path && <AppBreadcrumb path={path} />}
          </div>
        )}

        {children}
      </div>
    </>
  );
};

export default AppBody;
