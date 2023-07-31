const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/',
  withAuth,
  async (req, res) => {
    try {
      const dbBlogPostData = await BlogPost.findAll({
      });

      const blogPosts = dbBlogPostData.map((blogPost) =>
        blogPost.get({ plain: true }))

      res.render('homepage', {
        blogPosts,
        user_name: req.session.user_name,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/blog-post/:id', async (req, res) => {

  try {
    const dbSingleBlogPostData = await BlogPost.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!dbSingleBlogPostData) {
      // render homescreen if blog post is not found
    }

    console.log(req.session);
    const blogPost = dbSingleBlogPostData.get({ plain: true })
    console.log(blogPost);
    res.render('blog-post', { blogPost, loggedIn: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;