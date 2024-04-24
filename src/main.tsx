import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./css/index.css";
import ContextWrapper from "./context/ContextWrapper";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ContextWrapper>
        <div className="pageLayout">
          <App />
        </div>
      </ContextWrapper>
    </ChakraProvider>
  </React.StrictMode>
);
