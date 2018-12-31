const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
let fs = require("fs");
const path = require("path");
const async = require("async");
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: true });
var questionModel = require("../models/questionModel");
var globalServices = require("../services/globalServices");
//var questionModel          = new questionModel();

router.get("/add", (req, res, next) => {
  async.waterfall(
    [
      function(next) {
        globalServices.validateAccessToken(req, res, next); //Validate access token
      }
    ],
    function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        // let queslist;
        let query2 = questionModel.find({}).count();
        query2.exec((err, queslist) => {
          if (err) res.send(err);
          queslist = queslist;
          console.log(queslist);
          //  res.json({category:category,ategorylist:categorylist});
          res.render("pages/create-question", {
            queslist: queslist
          });
        });

        // res.render("pages/create-question", { lst: lst });
      }
    }
  );
});

router.post("/add", (req, res, next) => {
  async.waterfall(
    [
      function(next) {
        globalServices.validateAccessToken(req, res, next); //Validate access token
      },
      function(next) {
        let newQuestion = new questionModel(req.body);
        newQuestion
          .save()
          .then(result => {
            // console.log(result);
            next(null, result);
          })
          .catch(err => {
            next(err, null);
          });
      }
    ],
    function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.redirect("/questions/add");
      }
    }
  );
});

router.get("/", (req, res, next) => {
  async.waterfall(
    [
      function(next) {
        globalServices.validateAccessToken(req, res, next); //Validate access token
      },
      function(next) {
        let query = questionModel.find({}).sort({ createdAt: -1 });
        query.exec((err, result) => {
          next(err, result);
        });
      }
    ],
    function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.render("pages/list-survey", { questionList: result });
      }
    }
  );
});
router.get("/detail/:id", (req, res, next) => {
  async.waterfall(
    [
      function(next) {
        globalServices.validateAccessToken(req, res, next); //Validate access token
      },
      function(next) {
        const id = req.params.id;
        let query = questionModel.findById(id);
        query.exec((err, result) => {
          next(err, result);
        });
      }
    ],
    function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log(result);
        res.render("pages/view-survey1", { question: result });
      }
    }
  );
});

/**
 * This function use to save video
 */
// module.exports.addVideo  = function(req, res, next) {
//   let validatorResponse = globalServices.validateParams('addVideo', req.body, req, res);
//   if(validatorResponse) {
//     async.waterfall([
//       function(next) {
//         globalServices.validateCmsAccessToken(req, res, next); //Validate access token
//       },
//       function(next) {
//         videoModel.saveVideo(req, res, next);
//       }
//     ],
//     function(err, result) {
//       if(err) {
//         sendAPIRes('error','notFound',null, req, res);
//       } else {
//         sendAPIRes('success','added',null, req, res);
//       }
//     });
//   }
// }

/**
 * This function use to get available Videos
 */
// module.exports.getVideos = function (req, res, next) {
//   async.waterfall([
//     function (next) {
//       globalServices.validateCmsAccessToken(req, res, next); //Validate access token
//     },
//     function (next) {
//       videoModel.fetchVideos(req, res, next);
//     }
//   ],
//   function (err, result) {
//     if (err) {
//       sendAPIRes('success','notFound',null, req, res);
//     } else {
//       sendAPIRes('success','infoFoundWithData',result, req, res);
//     }
//   });
// }

// router.get('/edit/:id',(req, res, next) => {
//     const id = req.params.id;
//     let category,categorylist;
//     let query = Category.find({_id:id});
//     query.exec((err, category) => {
//         if(err) res.send(err);Category
//         category=category;
//        let query2 = Category.find({});
//     query2.exec((err, categorylist) => {
//         if(err) res.send(err);
//         categorylist=categorylist;
//       //  res.json({category:category,ategorylist:categorylist});
//            res.render('pages/category',{category:category,categorylist:categorylist});
//     });
//
//     });
//
//     });
// router.post('/:id',upload.single('productImage'),(req, res, next) => {
//     const id = req.params.id;
//     name=req.body.name;
//     description=req.body.description;
//     productImage=req.file.path;
//     category=req.body.category;
//
//     let query = Category.update({_id:id},{$set:{name:name,description:description,productImage:productImage,category:category}});
//
//
//     query.exec()
//     .then(result=>{
//         console.log(result);
//          res.status(201).json({
//         message:' Category is created ',
//         createdCategory :result
//     });
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//
//         });
//     }
//     );
//
//     res.redirect('/categories');
//     });

router.get("/delete/:id", (req, res, next) => {
  const id = req.params.id;

  //Logic to delete the item

  questionModel
    .remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  res.redirect("/questions");
});
module.exports = router;
