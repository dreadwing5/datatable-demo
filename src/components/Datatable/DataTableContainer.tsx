import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import DataTable from "./DataTable";
import jsonData from "./data.json";
import Invoice from "./Invoice";

export default function DataTableContainer() {
  const [data, setData] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      setTimeout(() => {
        setData(jsonData.data);
        setIsLoading(false);
      }, 500);
    };

    loadData();
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Invoice Data
      </Typography>
      <Box sx={{ flex: 1, position: "relative" }}>
        {isLoading ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" style={{ marginTop: 16 }}>
              Loading data...
            </Typography>
          </Box>
        ) : (
          <DataTable data={data} />
        )}
      </Box>
    </Box>
  );
}
