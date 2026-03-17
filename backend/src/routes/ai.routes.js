const express = require("express");
const aiReview = require("../controller/ai.controller");
const router = express.Router();

router.post('/ai-review',aiReview)

module.exports = router;

