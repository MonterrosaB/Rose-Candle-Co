import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "../../global/context/AuthContext.jsx";
import Navigation from "../../global/components/Navigation.jsx";

const Private = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: 9999,
          },
        }}
      />
      <Router>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </Router>
    </>
  );
};

export default Private;