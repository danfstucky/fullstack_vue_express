const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB
'mongodb+srv://<username>:<password>@cluster0-ygxir.mongodb.net/admin?retryWrites=true&w=majority'

// Connect to router
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
