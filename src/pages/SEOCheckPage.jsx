// SEOCheckPage.js

import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import CustomButton from "../components/CustomButton";

const SEOCheckPage = () => {
  const [url, setUrl] = useState("");
  const [seoHealth, setSEOHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleCheckSEO = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/seo-check", {
        url,
      });
      setSEOHealth(response.data);
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
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {seoHealth && (
        <div>
          <Typography variant="h5">SEO Health Result</Typography>
          {/* Display SEO health result here */}
          {console.log("check health", seoHealth)}
          <Typography variant="h5" color="error">
            {seoHealth.title}
          </Typography>
        </div>
      )}
    </>
  );
};

export default SEOCheckPage;
