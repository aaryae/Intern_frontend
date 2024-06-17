import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="633645319069-jlh66ibal0i7agk9aafe1n5g37tch822.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
