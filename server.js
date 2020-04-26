const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Send every request to the React app
// Define any API routes before this runs
// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // this code found from https://stackoverflow.com/questions/46354551/react-node-app-deployed-to-heroku-shows-a-blank-screen
  app.use('/static', express.static(path.join(__dirname, 'client/build')));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
