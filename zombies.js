var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');

//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var zombieSchema = new Schema({
  name: String,
  age: Number,
  zombie: Boolean,
  location: String,
  rage: Number,
  date: {type: Date, default: Date.now}
});

var ZombieModel = mongoose.model("ZombieModel", zombieSchema)


//config port 
app.listen(4000, function(){
  console.log("at 4000")
});


module.exports = ZombieModel


//Connect this app to our Mongo Server and to our Test Database
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("I am connected!")
});

//seeded mongo database with zombies
// var joeypants = new ZombieModel({name:"joeypants",age:20,zombie: true, location:"Tribeca", rage:10})
// joeypants.save(function (err) {
//   if (err) return console.error(err);
// });

// var veronica = new ZombieModel({name:"Veronica",age:93,zombie: true, location:"Queens", rage:1.5})
// veronica.save(function (err) {
//   if (err) return console.error(err);
// });

// var wayne = new ZombieModel({name:"Wayne",age:45,zombie: false, location:"Westchester", rage:4})
// wayne.save(function (err) {
//   if (err) return console.error(err);
// });

// var sung = new ZombieModel({name:"Sung",age:65,zombie: false, location:"Kansas", rage:0.5})
// sung.save(function (err) {
//   if (err) return console.error(err);
// });


app.get("/", function(req,res){
  html = fs.readFileSync("./views/index.html", "UTF8")
  // var rendered = ejs.render(html: {zombies:zombies})
  // res.send(rendered);
  ZombieModel.find({}, function(err,zombies){
    if (err) throw err
    else {
      var rendered = ejs.render(html, {zombies:zombies})
      res.send(rendered)
    }
  })

  })

app.post('/zombies', function(req,res){
  console.log(req.body)
 // create a new user
 var newZombie = new ZombieModel({
   name:req.body.name,
   age:req.body.age,
   zombie:req.body.zombie,
   location:req.body.location,
   rage:req.body.rage
 });

 // save the user
 newZombie.save(function(err) {
   if (err) throw err;

   console.log('Zombie created!');
 });

 res.redirect('/');
});




app.get('/zombies/new', function(req, res){
 var htmlNewZombieForm = fs.readFileSync('./views/new.html', 'utf8');
 var rendered = ejs.render(htmlNewZombieForm);
 res.send(rendered);
});


app.delete('/zombies/:id', function (req, res) {
  console.log(params.id)
// get the user starlord55
  ZombieModel.find({ id: params.id }, function(err, user) {
    if (err) throw err;

    // delete him
    zombieModel.remove(function(err) {
      if (err) throw err;

      console.log('Zombie successfully deleted!');
    });
  });

});

