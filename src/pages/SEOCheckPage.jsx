// SEOCheckPage.js

import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import AnalysisResult from "../components/AnalysisResult";

const SEOCheckPage = () => {
  const [url, setUrl] = useState("https://www.espncricinfo.com/");
  const [seoHealth, setSEOHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  //   console.log("Hello", analysis);
  const handleCheckSEO = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/seo-check", {
        url,
      });
      //   setSEOHealth(response.data);
      setAnalysis(response.data);
      //   console.log("seo response", response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to check SEO health");
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h5" style={{ marginTop: 20 }}>
        SEO Health Check
      </Typography>
      <TextField
        label="Enter URL"
        variant="outlined"
        value={url}
        onChange={handleUrlChange}
        fullWidth
        style={{ marginBottom: "16px" }}
      />
      <CustomButton
        onClick={handleCheckSEO}
        loading={loading}
        disabled={!url || loading}
      >
        {loading ? "Checking..." : "Check SEO Health"}
      </CustomButton>

      <AnalysisResult analysis={analysis} />
    </>
  );
};

export default SEOCheckPage;
