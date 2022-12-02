const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content"],
      include: [
        {
          model: Comment,
          attributes: ["id", "text"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const posts = postData.get({ plain: true });
    res.render("posts", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/dashboard", withAuth, async (req, res) => {
  const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: User,
  });
  const post = postData.map((post) => post.get({ plain: true }));
  res.render("dashboard", {
    posts,
    logged_in: req.session.logged_in,
  });
});

router.get("/dashboard/create", withAuth, async (req, res) => {
  res.render("create", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/dashboard/edit/:id", withAuth, async (req, res) => {
  const postData = await Post.findOne({
    where: {
      id: req.params.id,
    },
    include: User,
  });
  const post = postData.get({ plain: true });
  res.render("edit", {
    post,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
