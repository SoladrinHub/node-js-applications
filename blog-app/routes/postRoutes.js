const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix);
    }
  });
  const upload = multer({ storage: storage });


// show all posts
router.get('/', async (req, res) => {
    const posts = await Post.find().sort({createdAt: -1 });
    res.render('index', { posts });
});


//New post form
router.get('/posts/new', (req, res) => {
    res.render('new');
});

router.post('/posts', upload.single ('image'), async (req, res) => {
    const postData = {
        title: req.body.title,
        content: req.body.title,
        content: req.body.content,
        image: req.file ? `/uploads/${req.file.filename}` : ''
    };

    await Post.create(postData);
    res.redirect('/');
});


router.get('/posts/:id/', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('show', { post})
});

router.get('/posts/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post })
});


// update post
router.put('/posts/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`posts/${req.params.id}`);
});

//Delete post
router.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.redirect('/');
});



module.exports = router;