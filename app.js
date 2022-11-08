const mongoose =require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{useNewUrlParser: true});
                                               //Creation and Validation
const fruitSchema = new mongoose.Schema({
  name :{
  type: String,
  Required: [true,"Please check your data entry…"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
                                                    //Creation of model an document
const Fruit= mongoose.model("Fruit", fruitSchema);
// const fruit =new Fruit({
//
//   rating: 7,
//   review: "Peach is a great fruit"
// });
 //fruit.save();
                                                    //Creation of person schema...
const personSchema =new mongoose.Schema({
  name: String,
  Age: Number,
  favouriteFruit: fruitSchema
});

                                                          //Creation and insertion of a person document
const Person=mongoose.model("Person",personSchema);
// const person=new Person({
//   name:"John",
//   Age: 28
// });
// person.save();

                                            //     Insertion using InsertMany in Fruit collection
// const kiwi =new Fruit({
//   name:"Kiwi",
//   rating: 10,
//   review: "The best fruit"
// });
// const orange=new Fruit({
//   name:"Orange",
//   rating: 4,
//   review: "Too sour for me"
// });
// const banana =new Fruit({
//   name:"Banana",
//   rating: 9,
//   review: "Awesome fruit"
// });
// // Fruit.insertMany([kiwi,orange,banana],function(err){
// //   if(err){
// //     console.log(err);
// //   }else{
// //     console.log("Successfull saved all the fruits to fruitsDB");
// //   }
// // });

                                              //Printing the data in the same terminal
Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close()
  fruits.forEach(function(fruit){
    console.log(fruit.name);
  })
}

});

                 //Updation
// Fruit.updateOne({_id: "636aa6f7ec94a9ba3ff59c12"},{name:"Peach"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//         console.log("Successfull updated the Peach document");
//
//   }
// });

//Deletion

// Fruit.deleteOne({name: "Peach"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//         console.log("Successfull deleted the Peach document");
//
//   }
// });



// Person.deleteMany({name: "John"},function(err){
//   if(err){
//     console.log(err);
//   }else{
//         console.log("Successfull deleted the Peach document");
//   }
// });

//Relationships
                           //adding pineapple as a new fruit  to set it as amy favourite food
const pineapple =new Fruit({
 name: "Pineapple",
  rating: 7,
  review: "Ripe Pineapple is the best"
});
 //pineapple.save();
 const person=new Person({
   name:"Amy",
   Age: 18,
   favouriteFruit: pineapple
 });
 //person.save();

//adding a favourite food for john using update since john already present
const mango =new Fruit({
 name: "mango",
  rating: 7,
  review: "mango is the best"
});
 //mango.save();

Person.updateOne({name:"John"},{favouriteFruit: mango},function(err){
  if(err){
    console.log(err);
  }else{
        console.log("Successfull updated the john document");

  }
});
