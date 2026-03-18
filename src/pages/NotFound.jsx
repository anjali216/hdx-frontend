import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button style={styles.button} onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9fafb",
    textAlign: "center",
    padding: "20px",
  },
  code: {
    fontSize: "120px",
    fontWeight: "bold",
    color: "#4f46e5",
    margin: "0",
    lineHeight: "1",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#111827",
    margin: "10px 0",
  },
  message: {
    fontSize: "16px",
    color: "#6b7280",
    maxWidth: "400px",
    marginBottom: "30px",
  },
  button: {
    padding: "12px 28px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default NotFound;