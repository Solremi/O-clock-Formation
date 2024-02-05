const express = require("express");
const app = express();
const port = 3000;
const articleRoutes = require("./routes/routes");
app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(articleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
