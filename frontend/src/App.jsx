import { Route, Routes } from "react-router-dom";
import Healthcheck from "./pages/ServerStatus/ServerHealthCheck";

function App() {
  return (
    <Routes>
      <Route path='/server-status' Component={Healthcheck} />
    </Routes>
  );
}

export default App;