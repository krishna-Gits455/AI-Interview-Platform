import { useEffect } from "react";

import AppRouter from "./routes/AppRouter";

import useAuthStore from "./store/authStore";

function App() {
  const fetchCurrentUser =
    useAuthStore(
      (state) => state.fetchCurrentUser
    );

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return <AppRouter />;
}

export default App;