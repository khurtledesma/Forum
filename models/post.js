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
    comments: {
        type: String,
        default: 'Other info goes here',
    }
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;