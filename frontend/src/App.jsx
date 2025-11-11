import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import GalleryView from "./pages/GalleryView";
import Purchases from "./pages/Purchases";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      {/* Todas las páginas dentro del layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="galerias" element={<GalleryView />} />
        <Route path="compras" element={<Purchases />} />
        <Route path="configuracion" element={<Settings />} />
        <Route path="perfil/:id" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
