import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { Register, Login, Dashboard } from "../pages";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
