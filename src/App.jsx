import { ConfigProvider } from "antd";
import antdCustomTheme from "./theme/antdconfig";
import { QueryClientProvider } from "@tanstack/react-query";
import AppHeader from "./components/Layout/Header";
import AppRoutes from "./routes/appRoutes";

const App = () => {
  return (
    <>
      <QueryClientProvider>
        <ConfigProvider theme={antdCustomTheme} componentSize="large">
          <AppRoutes />
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
