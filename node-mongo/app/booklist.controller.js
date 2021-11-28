const mongoose = require('mongoose');
const Booklist = mongoose.model('Booklist');

exports.createBooklist = (req, res) => {
    const booklist = new Booklist({
        title: req.body.title,
        author: req.body.author
    })
    booklist.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            message: "Failed! Please resubmit.",
            error: err.message
        });
    });
};

exports.getBooklist = (req, res) => {
    Booklist.findById(req.params.id).select('-__v')
        .then(booklist => {
            res.status(200).json(booklist);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Booklist not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Booklist with id " + req.params.id,
                error: err
            });
        });
};

exports.booklists = (req, res) => {
    Booklist.find().select('-__v').then(booklistInfos => {
        res.status(200).json(booklistInfos);
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

exports.deleteBooklist = (req, res) => {
    Booklist.findByIdAndRemove(req.params.id).select('-__v-_id')
        .then(booklist => {
            if(!booklist) {
                res.status(404).json({
                    message: "No book found with id = " + req.params.id,
                    error: "404", 
                });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't delete book with id = " + req.params.id,
                error: err.message
            });
        });
};

exports.updateBooklist = (req, res) => {
    Booklist.findByIdAndUpdate(
        req.body._id,
            {
                title: req.body.title,
                author: req.body.author
            },
                {new: false}
    ).select('-__v')
        .then(booklist => {
            if(!booklist) {
                return res.status(404).send ({
                    message: "Error -> Can't update a book with id = " + req.params.id,
                    error: "Not found!"
                });
            }
            res.status(200).json(booklist);
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can't update a book with id = " +req.params.id,
                error: err.message
            });
        });
};