import "../styles/globals.css";

// CONTEXTS
import { SettingsContextProvider } from "../context/SettingsContext";

function MyApp({ Component, pageProps }) {
  return (
    <SettingsContextProvider>
      <Component {...pageProps} />
    </SettingsContextProvider>
  );
}

export default MyApp;
