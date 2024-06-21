'use client'

import React from "react";
import { MantineProvider, createTheme } from "@mantine/core";
import { MedplumClient } from "@medplum/core";
import { MedplumProvider } from "@medplum/react";
import "@mantine/core/styles.css";
import "@medplum/react/styles.css";

const medplum = new MedplumClient({
  onUnauthenticated: () => (window.location.href = "/"),
});

const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: "1.125rem",
        fontWeight: "500",
        lineHeight: "2.0",
      },
    },
  },
  fontSizes: {
    xs: "0.6875rem",
    sm: "0.875rem",
    md: "0.875rem",
    lg: "1.0rem",
    xl: "1.125rem",
  },
});

function Dashboard() {
  return (
    <MedplumProvider medplum={medplum}>
      <MantineProvider theme={theme}>
        <div>
          <h1>Welcome to the dashboard, work in progress</h1>
        </div>
      </MantineProvider>
    </MedplumProvider>
  );
}

export default Dashboard;







