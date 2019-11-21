const mongoose = require('mongoose');
const cloudinary = require('cloudinary');


const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'creationDate',
        updatedAt: 'updateDate'
    },
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

imageSchema.virtual('resizedUrl').get(function () {
    const image = this;
    const url = image.url;
    const path = url.replace(/[\w\/.:]+upload\//i, '');

    const resizedUrl = cloudinary.url(path, {
        width: 200
    });
    return resizedUrl;
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;