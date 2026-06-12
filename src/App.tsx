import { Navigate, Route, Routes } from "react-router-dom";
import FeaturesPage from "./pages/marketing/FeaturesPage";
import HomePage from "./pages/marketing/HomePage";
import InsightsPage from "./pages/marketing/InsightsPage";
import WorkflowPage from "./pages/marketing/WorkflowPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import LogoutPage from "./pages/auth/LogoutPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import JournalPage from "./pages/journal/JournalPage";
import NotFoundPage from "./pages/errors/NotFoundPage";
import JournalQueuePage from "./pages/journal/JournalQueuePage";
import JourneysPage from "./pages/journeys/JourneysPage";
import JourneyDetailPage from "./pages/journeys/JourneyDetailPage";
import AnalysisPage from "./pages/analysis/AnalysisPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/workflow" element={<WorkflowPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify" element={<VerifyEmailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<DashboardPage defaultTab="profile" />} />
      <Route path="/journeys" element={<JourneysPage />} />
      <Route path="/journeys/:journeyId" element={<JourneyDetailPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/journal" element={<JournalPage />} />
      <Route path="/pending" element={<JournalQueuePage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
