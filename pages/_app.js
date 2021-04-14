import Particles from "react-particles-js";
import "tachyons";

import { AuthContextProvider } from "../context/globalstate";
import { Layout } from "../components";

import "../styles/globals.css";

const paramsOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Particles className="particles" params={paramsOptions} />
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
