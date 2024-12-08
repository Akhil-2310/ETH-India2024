import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import IdentityGeneration from "./pages/IdentityGeneration";
import CreateGroup from "./pages/CreateGroup";
import AllGroups from "./pages/AllGroups";
import GroupPage from "./pages/GroupPage";
import ChatGPTClone from "./pages/ChatGPTClone";
// import CallbackPage from "./pages/CallbackPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<IdentityGeneration />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/groups" element={<AllGroups />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/chat" element={<ChatGPTClone />} />
        {/* <Route path="/auth/callback" element={<CallbackPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
