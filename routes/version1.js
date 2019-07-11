const express = require('express');
const router = express.Router();
const PostModel = require('../models/posts');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.send("Welcome to my api").status(200);
});

router.get('/all', async (req, res, next) => {
  const allPosts = await PostModel.getAll(); 
  res.json(allPosts).status(200);
});

router.get('/post/:post_id?', async (req, res) => {
  const postId = req.params.post_id;
  const thePost = await PostModel.getById(postId);
  res.json(thePost).status(200);
});

router.get('/delete/:post_id?', async (req, res, next) => {
  const postId = req.params.post_id;
  const response = await PostModel.removeEntry(postId);

  if (response.command === 'DELETE' && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not delete postId: ${postId}`).sendStatus(409);
  }
});

router.post('/post/add', async (req,res) => {
  const { title, content, author_id } = req.body;
  const response = await PostModel.createEntry(title, content, author_id);
  if (response.command === "INSERT" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not add new blog post ${title}`).status(409);
  }

});

router.put('/post/update/:post_id?', async (req, res) => {
  const postId = req.params.post_id;
  const { content } = req.body;
  const response = await PostModel.updateEntry(postId, 'content', content);
  if (response.command === "UPDATE" && response.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not update post id ${postId}`).status(409)
  }
});

module.exports = router;