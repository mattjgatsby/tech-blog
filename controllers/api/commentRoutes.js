const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(userComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!userComment) {
      res.status(400).json({ message: "No comment found with that id" });
      return;
    }
    res.status(200).json(userComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
