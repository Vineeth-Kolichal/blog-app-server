const Validator = require("fastest-validator");
const models = require("../models");

const v = new Validator()

//Create new post
const createPost = (req, res) => {
    const postData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: null,
        categoryId: req.body.categoryId,
        userId: req.userData.id
    }
    const schema = {
        title: {
            type: "string",
            optional: false
        },
        content: {
            type: "string",
            optional: false
        },
        imageUrl: {
            type: "string",
            optional: true
        },
        categoryId: {
            type: "number",
            optional: false
        },
        userId: {
            type: "number",
            optional: false
        }
    }
    //Validating the request body
    const validateResult = v.validate(postData, schema);
    if (validateResult == true) {
        models.Category.findByPk(postData.categoryId).then(result => {
            if (result != null) {
                models.Post.create(postData).then(resu => {
                    res.status(201).json({ message: "post created", post: resu })
                })
            } else {
                res.status(404).json({ message: "category not found" });
            }
        })

    } else {
        res.status(409).json({ message: "required fields missing", error: validateResult })
    }

}

//Get all post
const getAllPosts = (req, res) => {
    try {
        models.Post.findAll({
            //include data of user from the user table using UserId
            include: [
                {
                    model: models.Category,
                    attributes: ["id", "name"]
                },
                {
                    model: models.User,
                    attributes: ['name', 'email']
                },
            ],
            attributes: ["id", "title", "content", "imageUrl"]
        }).then(result => {
            res.status(200).json(result)
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error })
    }
}

const addComment = (req, res) => {
    const comment = {
        content: req.body.content,
        postId: req.body.postId,
        userId: req.userData.id
    }
    const schema = {
        content: {
            type: "string",
            optional: false
        },
        postId: {
            type: "number",
            optional: false
        },
        userId: {
            type: "number",
            optional: false
        }
    }
    const validateResult = v.validate(comment, schema);
    if (validateResult == true) {
        try {
            models.Post.findByPk(comment.postId).then(result => {
                if (result != null) {
                    models.Comment.create(comment).then(resu => {
                        res.status(200).json({ message: "Comment added successfully", comment: resu })
                    })
                } else {
                    res.status(404).json({ message: "Post not found" })
                }
            });

        } catch (error) {
            res.status(500).json({ message: "Internal server error", error: error })

        }
    } else {
        res.status(409).json({ message: "required fields missing", error: validateResult })
    }
}

const getComments = (req, res) => {
    const postId = req.params.id
    try {
        models.Post.findByPk(postId).then(result => {
            if (result != null) {
                models.Comment.findAll({
                    where: {
                        postId: postId,

                    },
                    attributes: ["id", "content"],
                    include: [{
                        model: models.User,
                        attributes: ['name'],
                    }]
                }).then(comments => {
                    res.status(200).json({ comments: comments })
                })
            } else {
                res.status(404).json({ message: "Post not found" })
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error })

    }
}

module.exports = {
    createPost,
    getAllPosts,
    addComment,
    getComments
}