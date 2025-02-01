import React from "react";

export const PreviousCreation = ({ files }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Previous Creations</h2>
      <p style={styles.description}>Here are your previously generated files:</p>
      <ul style={styles.list}>
        {files && files.length > 0 ? (
          files.map((file, index) => (
            <li key={index} style={styles.listItem}>
              <span style={styles.fileName}>{file.name}</span>
              <button style={styles.button} onClick={() => alert(`Downloading ${file.name}`)}>
                Download
              </button>
            </li>
          ))
        ) : (
          <li style={styles.noFiles}>No previous creations found.</li>
        )}
      </ul>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    width: "100%",
    height:"100%",
    //margin: "20px auto",
    //padding: "10px",
     // Dark grey background
    borderRadius: "12px",
    //boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(1, 120, 255, 0.4)", // Neon glow
    color: "#ccc", // Light grey text
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    //overflow: "hidden",
  },
  title: {
    padding:"10px",
    color: "#0178ff", // Neon blue
    fontSize: "20px",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#bbb",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    background: "#292929", // Slightly lighter grey for file items
    margin: "10px 0",
    padding: "10px 15px",
    borderRadius: "8px",
    boxShadow: "inset 0 0 5px rgba(255, 255, 255, 0.1)",
    color: "#fff", // White text
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "background 0.3s, boxShadow 0.3s",
  },
  fileName: {
    flex: 1,
    textAlign: "left",
  },
  button: {
    background: "#0178ff", // Neon blue button
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "12px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
  },
  noFiles: {
    padding: "10px",
    color: "#999",
    fontSize: "14px",
  },
};

// Button hover and interaction effects
styles.listItem[':hover'] = {
  background: "#333", // Lighter grey on hover
  boxShadow: "inset 0 0 8px rgba(1, 120, 255, 0.6)", // Neon glow effect
  color: "#0178ff",
};

styles.button[':hover'] = {
  background: "#005bb5", // Darker blue on hover
  transform: "scale(1.05)",
};
