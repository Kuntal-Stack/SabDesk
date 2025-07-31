import React from "react";

const PipeAnalysisIframe = () => {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://sabpaisa-pipe-analysis.streamlit.app/"
        title="Pipe Analysis"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PipeAnalysisIframe;
