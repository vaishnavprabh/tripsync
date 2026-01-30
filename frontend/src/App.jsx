import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Modules/Admin/Dashboard";
import Register from "./Components/LOGIN REGISTER/Register";
import Login from "./Components/LOGIN REGISTER/Login";
import Homepage from "./Modules/User/Home-page";
import About from "./Modules/User/About";
import Contact from "./Modules/User/Contact";
import SkillDiscovery from "./Modules/User/SkillDiscovery";
import SkillDetail from "./Modules/User/SkillDetail";
import Messages from "./Modules/User/Messages";
import MySkills from "./Modules/User/MySkills";
import MyRequests from "./Modules/User/MyRequests";
import Notifications from "./Modules/User/Notifications";
import Profile from "./Modules/User/Profile";
import OrganizerDashboard from "./Modules/Organizer/OrganizerDashboard";
import CreateTrip from "./Modules/Organizer/CreateTrip";
import ItineraryManagement from "./Modules/Organizer/ItineraryManagement";
import InvitationManagement from "./Modules/Organizer/InvitationManagement";
import ExpenseManagement from "./Modules/Organizer/ExpenseManagement";
import AnnouncementsCommunication from "./Modules/Organizer/AnnouncementsCommunication";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Initial Route - Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Public Routes */}
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
          {/* User Routes */}
          <Route path="/home" element={<Homepage/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/discover" element={<SkillDiscovery/>} />
          <Route path="/skill/:id" element={<SkillDetail/>} />
          <Route path="/messages" element={<Messages/>} />
          <Route path="/my-skills" element={<MySkills/>} />
          <Route path="/my-requests" element={<MyRequests/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/settings" element={<Profile/>} />
          <Route path="/bookmarks" element={<MySkills/>} />
          
          {/* Admin Routes */}
          <Route path="/dashboard" element={<Dashboard/>} />
          
          {/* Organizer Routes */}
          <Route path="/my-trips" element={<OrganizerDashboard/>} />
          <Route path="/organizer/create-trip" element={<CreateTrip/>} />
          <Route path="/organizer/itinerary/:tripId" element={<ItineraryManagement/>} />
          <Route path="/organizer/invitations/:tripId" element={<InvitationManagement/>} />
          <Route path="/organizer/expenses/:tripId" element={<ExpenseManagement/>} />
          <Route path="/organizer/announcements/:tripId" element={<AnnouncementsCommunication/>} />
          
          {/* Legacy Routes (redirects) */}
          <Route path="/About" element={<About/>}/>
          <Route path="/Contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;