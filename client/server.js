import express from "express";
import ejs from "ejs";

const app = express();

app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.use(express.json());
app.use(express.static("dist"));
app.use(express.static("style"));
app.use("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.render("index.html");
});

app.listen(5000, () => {
  console.log("server starts");
});
