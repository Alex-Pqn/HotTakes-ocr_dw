const fs = require('fs');
const Sauces = require('../models/Sauces');

//createSauce route
exports.createSauce = (req, res, next) => {
  //parse request
  const sauceObject = JSON.parse(req.body.sauce);

  //create new sauce with body request
  //create image in "images" folder with the imageUrl in request
  //initialize likes and dislikes (to avoid "undefined" when there are 0 likes/dislikes in the sauce)
  const sauce = new Sauces({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });

  //save the sauce
  sauce.save()
    .then(() => res.status(201).json({ message: 'Object registered !' }))
    .catch((error) => {
      res.status(400).json({ error })
      
      //if the sauce can't be create, delete image file of the sauce in "images" folder
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {})
    }
    )
};

//getAllSauces route
exports.getAllSauces = (req, res, next) => {
  //find all sauces
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//getOneSauce route
exports.getOneSauce = (req, res, next) => {
  //find the sauce with id
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }))
};

//modifySauce route
exports.modifySauce = (req, res, next) => {
  //get the new body and imageUrl
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };
  //update the sauce with the new body and imageUrl (in sauceObject const)
  Sauces.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Object modified' }))
    .catch((error) => res.status(400).json({ error }));
};

//deleteSauce route
exports.deleteSauce = (req, res, next) => {
  //find the sauce with id
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      //delete the image file of the sauce
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        //delete the object of the sauce
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Object deleted' }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//likeOneSauce route
exports.likeOneSauce = (req, res, next) => {
  const userID = req.body.userId;
  let alreadyLikeSauce = false
  let alreadyDislikeSauce = false

  //Check if already like/dislike
  checkAlreadyLikeDislike = (sauce) => {
    //like check
    sauce.usersLiked.forEach((id) => {
      if (id === userID) {
        alreadyLikeSauce = true
      }
    });
    //dislike check
    sauce.usersDisliked.forEach((id) => {
      if (id === userID) {
        alreadyDislikeSauce = true
      }
    });
  }

  //Update arrays like/dislike (+ call function > if already like/dislike)
  likeDislikeArrayUpdate = (likeDislikeArray, likeDislikeNumber, alreadyLikeOrDislike, statusName) => {
    //find the sauce with id
    Sauces.findOne({
      _id: req.params.id
    }).then(
      sauce => {
        //Check if already like/dislike
        checkAlreadyLikeDislike(sauce)

        //If there is not already like/dislike
        if (!alreadyLikeOrDislike) {
          //update sauce
          Sauces.updateOne(
            { _id: req.params.id }, 
            { 
              $push: likeDislikeArray, 
              $inc: likeDislikeNumber
            },
            )
            .then(() => res.status(200).json({ message: 'Liked/Disliked arrays updated' }))
            .catch((error) => res.status(400).json({ error }));
        } 
        //If there is already like/dislike
        else {
          res.status(400).json({ message: "Sauce is already " + statusName })
        }
      }
    )
    .catch((error) => res.status(400).json({ error }));
  }

  // Sauce liked
  if (req.body.like === 1) {
    likeDislikeArrayUpdate({ usersLiked: userID }, { likes: 1 }, alreadyLikeSauce, "liked")
  } 

  // Sauce disliked
  else if (req.body.like === -1) {
    likeDislikeArrayUpdate({ usersDisliked: userID }, { dislikes: 1 }, alreadyDislikeSauce, "disliked")
  }

  // Like.dislike canceled
  else if (req.body.like === 0) {
    let likeDislikeArray;
    let likeDislikeNumber;

    //find the sauce with id
    Sauces.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        //Check if already like/dislike (to know which one to remove)
        checkAlreadyLikeDislike(sauce)

        //If already like : set the variables (likeDislikeArray & likeDislikeNumber) to like for deletion
        if (alreadyLikeSauce === true) {
          likeDislikeArray = { usersLiked: userID }
          likeDislikeNumber = { likes: -1 }
        } 
        //If already dislike : set the variables (likeDislikeArray & likeDislikeNumber) to dislike for deletion
        else if (alreadyDislikeSauce === true) {
          likeDislikeArray = { usersDisliked: userID }
          likeDislikeNumber = { dislikes: -1 }
        }

        //update sauce with defined variables
        Sauces.updateOne(
          { 
            $pull: likeDislikeArray,
            $inc: likeDislikeNumber,
          })
          .then(() => res.status(200).json({ message: 'Like/Dislike deleted' }))
          .catch((error) => res.status(400).json({ error }));
      }
    )
  }
};