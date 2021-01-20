const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");


const likeCtrl = {
    GetLikes : async (req,res) =>{
        try {
            let variable = {}
            if (req.body.videoId) {
                variable = { videoId: req.body.videoId }
            } else {
                if (!req.body.commentId) return res.status(500).json({msg:false})
                variable = { commentId: req.body.commentId }
            }

            Like.find(variable)
                .exec((err, likes) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ msg: true, likes })
        })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    Uplike : async (req,res) =>{
        try {
                
            let variable = {}
            if (req.body.videoId) {
                variable = { videoId: req.body.videoId, userId: req.body.userId }
            } else {
                if (!req.body.commentId) return res.json({ msg: false });
                variable = { commentId: req.body.commentId , userId: req.body.userId }
            }

            const liked = await Like.findOne(variable)
            if(liked) return res.status(400).json({msg:'false'})
            const like = new Like(variable)     
           
            // save the like information data in MongoDB
            like.save((err, likeResult) => {
                if (err) return res.json({ msg: false, err });
                //In case disLike Button is already clicked, we need to decrease the dislike by 1 
                Dislike.findOneAndDelete(variable)
                    .exec((err, disLikeResult) => {
                        if (err) return res.status(400).json({ msg: false, err });
                        res.status(200).json({ msg: true })
                    })
            })

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    Unlike : async (req,res) =>{
        try {
            let variable = {}
            if (req.body.videoId) {
                variable = { videoId: req.body.videoId, userId: req.body.userId }
            } else {
                if (!req.body.commentId) return res.json({ success: false });
                variable = { commentId: req.body.commentId , userId: req.body.userId }
            }
            const liked = await Like.findOne(variable)
            if(!liked) return res.status(400).json({msg:'false'})
            Like.findOneAndDelete(variable)
                .exec((err, result) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true })
                })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    Updislike : async (req,res) =>{
        try {
            let variable = {}
            if (req.body.videoId) {
                variable = { videoId: req.body.videoId, userId: req.body.userId }
            } else {
                if (!req.body.commentId) return res.json({ success: false });
                variable = { commentId: req.body.commentId , userId: req.body.userId }
            }
        
            const disLiked = await Dislike.findOne(variable)
            if(disLiked) return res.status(400).json({msg:'false'})

            const disLike = new Dislike(variable)
            //save the like information data in MongoDB
            disLike.save((err, dislikeResult) => {
                if (err) return res.json({ success: false, err });
                //In case Like Button is already clicked, we need to decrease the like by 1 
                Like.findOneAndDelete(variable)
                    .exec((err, likeResult) => {
                        if (err) return res.status(400).json({ success: false, err });
                        res.status(200).json({ success: true })
                    })
            })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },

    Undislike : async (req,res) =>{
        try {
            
            let variable = {}
            if (req.body.videoId) {
                variable = { videoId: req.body.videoId, userId: req.body.userId }
            } else {
                if (!req.body.commentId) return res.json({ success: false });
                variable = { commentId: req.body.commentId , userId: req.body.userId }
            }
            const disLiked = await Dislike.findOne(variable)
            if(!disLiked) return res.status(400).json({msg:'false'})

            Dislike.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true })
    })
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },


}


module.exports = likeCtrl
