var Article = require('../models/article');
var jwt = require('jsonwebtoken');
var AYLIENTextAPI = require('aylien_textapi');

var config = require('../../config');

var key = config.apiKey;
var id = config.appId;


exports.getArticles = function(req, res){
    Article.find({ userId: req.decoded._doc._id }, function(err, articles) {
        if (err) {
            res.json(err);
        }
        //If no articles found
        if(!articles){ res.json({success: false, message: "No articles found" }); }

        res.json({success: true, articles: articles});
    });
};

exports.getArticle = function(req, res){
    Article.find({ 
        userId: req.decoded._doc._id,
        _id: req.params.article_id
        }, function(err, article){
        if(err){
            res.send(err);
        } else if (!article){
            res.json({success: false, message: "Article not found"});
        } else {
            res.json({success: true, article: article});
        }
    });
};

exports.deleteArticle = function(req, res){
    Article.remove({ 
        userId: req.decoded._doc._id, 
        _id: req.params.article_id 
        }, function(err, article) {
        if(err){
            res.send(err);
        } else {
            res.json({ success: true, message: "Article removed from database" });
        }
    });
};

exports.postArticle = function(req, res){

    var textapi = new AYLIENTextAPI({
          application_key: key,
          application_id: id 
    });

    console.log(textapi);
    console.log(req.app.get('apiKey'));
    console.log(textapi._options.application_id);
    console.log(req.app.get('appId'));
    console.log(textapi._options.application_key);

    textapi.summarize({
        'url': req.body.url
    }, function(error, response){
        if(error){ console.log(error);
            res.send({success: false, message: error})
        }else{
        var summary = "";
        response.sentences.forEach(function(s){
            summary += (s+" ");
        });

    var article = new Article();

    console.log(summary);

    article.url = req.body.url;
    article.contents = summary;
    article.date_added = Date.now();
    article.userId = req.decoded._doc._id;

    article.save(function(err) {
        if(err){
            res.json({success: false, error: err});
        } else {
            res.json({ success: true , url: article.url});
        }
    });
        }
    });
};
