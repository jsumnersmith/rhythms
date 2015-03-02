var User = require('./models/user');

module.exports = function(app, passport) {

  // server routes ===========================================================
  // sample api route
  app.get('/api/users', function(req, res) {
    // use mongoose to get all nerds in the database
    User.find(function(err, users) {
      if(err){
        res.send(err);
      }
      if(!users){
        res.json('No Users yet')
      }
      res.json(users); // return all nerds in JSON format
    });
  });

  // route to handle creating goes here (app.post)
  app.post('/api/signup', function(req, res, callback) {
    passport.authenticate('local-signup', function(err, user, message){
      if (err) {
        res.send("The error is", err);
      }
      if (!user){
        console.log(message);
        res.status = 200;
        res.send(message);
      }
      if (user){
        var data = {
          id: user._id,
          email: user.local.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
        console.log(data);
        res.json(data);
      }
    })(req, res, callback)
  });

  app.post('/api/login', function(req, res, callback) {
    passport.authenticate('local-login', function(err, user, message){
      if (err) {
        res.status = 404;
        res.send("The error is", err);
      }
      var data = {
        id: user._id,
        email: user.local.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
      if (user){
        console.log(data);
        res.status = 200;
        res.json(data);
      } else {
        res.status = 403;
        res.json(message);
      }
    })(req, res, callback);
  });

  // // route to handle delete goes here (app.delete)
  // app.post('/api/poem', function(req, res) {
  //   // use mongoose to get all nerds in the database
  //   console.log("You are about to create a poem");
  //
  //   var poem = new Poem();
  //
  //   //console.log(req.body);
  //   poem.title = req.body.title;
  //   poem.author = req.body.author;
  //   poem.lines = pson(req.body);
  //
  //   poem.save(function(err){
  //     if (err) {
  //       console.log("The error is", err);
  //       res.send(err);
  //     }
  //     res.json({ message: 'You added a poem' });
  //   });
  //
  // });
  //
  // app.delete('/api/poem/:poem_id', function(req, res){
  //   Poem.remove({
  //     _id: req.params.poem_id
  //   }, function(err, poem){
  //     if (err) {
  //       console.log("The error is", err);
  //       res.send(err);
  //     }
  //
  //     res.json({ message: 'Successfully deleted a poem' });
  //   });
  // });

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};
