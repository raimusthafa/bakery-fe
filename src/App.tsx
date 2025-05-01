import { FC } from "react";
import Routes from "./routes";
import { Toaster } from "react-hot-toast";

const App: FC = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes />
    </>
  );
};

export default App;
