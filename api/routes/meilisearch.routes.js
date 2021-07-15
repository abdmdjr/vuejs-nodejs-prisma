const express = require("express");
const meilisearchControllers = require("../controllers/meilisearch.controllers");
const router = express.Router();

router.get("/api/meilisearch/", meilisearchControllers.getAllTodos);
router.delete("/api/meilisearch/:id", meilisearchControllers.deleteTodo);

module.exports = router;
