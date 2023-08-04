const router = require("express").Router();
const { BlogPost, User } = require("../models");
const withAuth = require("../utils/auth");

// Prevent non logged in users from viewing the homepage
router.get("/", withAuth, async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const blogPosts = dbBlogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    console.log(blogPosts);
    res.render("homepage", {
      blogPosts,
      user_name: req.session.user_name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog-post/dashboard", withAuth, async (req, res) => {
  try {
    const dbDashboardData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    if (!dbDashboardData) {
      // render homescreen if blog post is not found
      alert("No blog posts found");
      res.render("homepage", { loggedIn: req.session.logged_in });
    }

    const myPosts = dbDashboardData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    console.log("my posts:" + myPosts);
    res.render("dashboard", { myPosts, loggedIn: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/blog-post/:id", async (req, res) => {
  try {
    const dbSingleBlogPostData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    if (!dbSingleBlogPostData) {
      // render homescreen if blog post is not found
      alert("No blog post found");
      res.render("homepage", { loggedIn: req.session.logged_in });
    }

    console.log(req.session);
    const blogPost = dbSingleBlogPostData.get({ plain: true });
    console.log(blogPost);
    res.render("blogpost", { blogPost, loggedIn: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
