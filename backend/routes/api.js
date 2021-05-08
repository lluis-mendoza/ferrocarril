var User = require('../models/user');
var Game = require('../models/game');

module.exports = function(app, express){

    var apiRouter = express.Router();
    apiRouter.route('/users')
        .post(async (req, res) => {
            var user = new User();

            user.name = req.body.name;

            await user.save((err) =>{
                if (err){
                    if (err.code == 11000) return res.json({success: false, message: 'A user with that name already exists'});
                    else return res.send(err);
                }
                res.json({message: 'User created!'});
            });
        })
        .get(async (req, res) => {
            const users = await User.find();

            res.send(users);
        })
        .delete(async (req, res) => {
            await User.deleteMany({},function(err, users){
                if (err) res.send(err);

                res.json({message: 'All the users has been removed'});
            });
    });
    apiRouter.route('/users/:user_name')
        .get(async (req, res)=>{
            await User.findOne({name: req.params.user_name}, (err, user)=>{
                if (err) res.send(err);

                res.json(user);
            });
        })
        .put(async (req, res)=>{
            console.log(req.params.user_name);
            await User.findOne({name: req.params.user_name}, (err, user)=>{
                if (err) res.send(err);
                if (user){
                    if (req.body.numWins) user.numWins = req.body.numWins;
                    else ++user.numWins;
                    user.save(function(err){
                        if (err) res.send(err);
        
                        res.json({message: 'User updated!'});
                    });
                }

            });
        })
        .delete(async (req, res) =>{
            console.log("deleting");
            await User.deleteOne({name: req.params.user_name}, function(err){
                if (err) return res.send(err);
                res.json({message: 'User removed!'});
            });
        });
    apiRouter.route('/games')
        .post(async (req, res) => {
            var game = new Game();

            game.startDate = new Date();

            await game.save((err) =>{
                if (err){
                    return res.send(err);
                }
                res.json({message: 'Game created!'});
            });
        })
        .get(async (req, res) => {
            const games = await Game.find();

            res.send(games);
        })
        .delete(async (req, res) => {
            await Game.deleteMany({},function(err, games){
                if (err) res.send(err);

                res.json({message: 'All the games has been removed'});
            });
        });
        apiRouter.route('/games/:game_id')
            .get((req, res)=>{
                Game.findById(req.params.game_id, (err, user)=>{
                    if (err) res.send(err);
        
                    res.json(user);
                });
            })
            .put((req, res)=>{
                Game.findById(req.params.game_id, (err, user) => {
                    if (err) res.send(err);
        
                    if (req.body.name) user.name = req.body.name;
                    if (req.body.username) user.username = req.body.username;
                    if (req.body.password) user.password = req.body.password;
        
                    Game.findOne({name: req.body.name}, function(err, result){
                        if (err) res.send(err);
                        if (!result){
                            user.save(function(err){
                                if (err) res.send(err);
                
                                res.json({message: 'User updated!'});
                            });
                        }
                        else return res.json({success: false, message: 'A user with that username already exists'});
                    });
                });
            })
            .delete((req, res) =>{
                Game.findByIdAndDelete(req.params.game_id, (err, game) =>{
                    if (err) return res.send(err);
        
                    res.json({message:'Game deleted!'});
                });
            });
    return apiRouter;

}