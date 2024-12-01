import React from 'react';
import LoginCard from "../components/Forms/LoginCard/LoginCard";

export default function Login() {
  return (
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <span style={styles.welcomeText}>Welcome to</span>
          <span style={styles.appName}>Trello2</span>
          <div style={styles.subtitle}>
            the app that lets you organize yourself Kanban style
          </div>
        </div>
        <LoginCard />
      </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#1D2125",
  },
  textContainer: {
    marginBottom: "20px",
  },
  welcomeText: {
    fontFamily: "Gill Sans Ultra Bold Condensed",
    fontSize: "33px",
    fontWeight: 400,
    color: "#FFFFFF",
  },
  appName: {
    fontFamily: "Luckiest Guy",
    fontSize: "100px",
    fontWeight: 400,
    color: "#FFFFFF",
  },
  subtitle: {
    fontFamily: "Gill Sans Nova",
    fontSize: "30px",
    fontWeight: 300,
    marginTop: "10px",
    color: "#FFFFFF",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
};

