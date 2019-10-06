const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

require('dotenv').config();

// GET Posts
// Note that '/' already means /api/posts since directed from index.js
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray()); // Get all posts
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});

async function loadPostsCollection() {
  // Note: Not using mongoose orm in this project.
  const uri = process.env.MONGODB_CONN;
  const client = await mongodb.MongoClient.connect(
    uri, {useNewUrlParser: true}
  );
  return client.db('vue-express-sandbox').collection('posts');
}
module.exports = router;
