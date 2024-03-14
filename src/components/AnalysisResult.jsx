import React from "react";

const AnalysisResult = ({ analysis }) => {
  if (!analysis) {
    return <div>No analysis data available</div>;
  }
  console.log("is dd here", analysis);
  const { accessibilityDetails, semanticTags, seoDetails } = analysis;

  return (
    <div>
      <h2>SEO Analysis</h2>
      <ul>
        {/* {Object.entries(seoDetails).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))} */}
      </ul>

      <h2>Semantic Tags</h2>
      <ul>
        {Object.entries(semanticTags).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>

      <h2>Accessibility Details</h2>
      <ul>
        {Object.entries(accessibilityDetails).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnalysisResult;
