
const express = require("express");
const router = express.Router();
const articles = require("../data/articles.json");

router.use("/article/:id", (req, res, next) => {
  const articleId = parseInt(req.params.id, 10);
  const article = articles.find((article) => article.id === articleId);
  const templateName = `article${articleId}`;

  if (!article) {
    return res.status(404).render("404");
  } else {
    res.render(templateName, { article: article });
  }
});

router.get("/", (req, res) => {
  res.render("accueil", { articles: articles });
});

module.exports = router;