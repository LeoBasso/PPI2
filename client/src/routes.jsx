import { Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
import Profile from "./pages/dashboard/profile/profile";
import ServicesContainer from "./pages/dashboard/services/ServicesContainer";
import SchedulesContainer from "./pages/dashboard/schedules/SchedulesContainer";
import Calendar from "./pages/dashboard/calendar/calendar";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >

        <Route path="/" element={<Profile />} />
        <Route path="/service" element={<ServicesContainer />} />
        <Route path="/schedules" element={<SchedulesContainer />} />
        <Route path="/calendar" element={<Calendar />} />
      </Route>
        
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
