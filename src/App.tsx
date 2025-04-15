import { FC } from "react";
import Routes from "./routes";
import { Toaster } from "react-hot-toast";
import Navbar from "./component/navbar";

const App: FC = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div className="pt-14">
      <Routes />
      </div>

    </>
  );
};

export default App;
