const router = require("express").Router();
const { BlogPost, Comment } = require("../../models");

// /api/blog-post
router.post("/", async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// api/blog-post - get all reminders made by the user
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
       where: {
         user_id: req.session.user_id,
       },
    });

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/blog-post/{id}
router.get("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
       where: {
         user_id: req.session.user_id,
       },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/blog-post/{id}
router.delete("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a comment route

module.exports = router;
