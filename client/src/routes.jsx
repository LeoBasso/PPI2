import { Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Login from "./pages/Login";
import Register from "./pages//dashboard/register/Register";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
import ActivitiesContainer from "./pages/dashboard/activities/ActivitiesContainer";
import Profile from "./pages/dashboard/profile/profile";

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
        
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<ActivitiesContainer />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
