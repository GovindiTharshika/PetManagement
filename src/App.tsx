import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import PetsList from "./components/pets/PetsList";
import MedicationsList from "./components/medications/MedicationsList";
import VaccinationsList from "./components/vaccinations/VaccinationsList";
import HealthMetrics from "./components/health/HealthMetrics";
import AppointmentCalendar from "./components/dashboard/AppointmentCalendar";
import Sidebar from "./components/layout/Sidebar";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetsList />} />
            <Route path="/appointments" element={<AppointmentCalendar />} />
            <Route path="/medications" element={<MedicationsList />} />
            <Route path="/vaccinations" element={<VaccinationsList />} />
            <Route path="/health" element={<HealthMetrics />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </div>
      </div>
    </Suspense>
  );
}

export default App;
