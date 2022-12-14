const router = require("express").Router();
const { Post, User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(userPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  res.status(200).json(
    await Post.findAll({
      include: User,
    })
  );
});

router.delete("/:id", async (req, res) => {
  try {
    const userPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!userPost) {
      res.status(400).json({ message: "No post found with that id." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedPost = await Post.update({
      text: req.body.text,
      title: req.body.title,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
