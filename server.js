const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// DB Config
// const db = require("./config/keys").mongoURI;

// Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.use(cors({ origin: true }));

app.get("/", (req, res) => res.send(" API running"));

// define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
