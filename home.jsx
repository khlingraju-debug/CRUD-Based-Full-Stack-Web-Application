function Home() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          width: "30%",
          backgroundColor: "#0d5ea8",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            lineHeight: "70px",
            fontWeight: "bold",
          }}
        >
          ELECTRONIC <br />
          STORE
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            lineHeight: "30px",
          }}
        >
          Explore the latest gadgets and smart devices for your daily life.
        </p>
      </div>

      {/* Right Side */}
      <div
        style={{
          width: "70%",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475"
          alt="Electronic Items"
          style={{
            width: "70%",
            borderRadius: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}

export default Home;