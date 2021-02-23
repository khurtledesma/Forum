const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    comments: [{
        type: String,
        date: Date.now,
    }]
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;