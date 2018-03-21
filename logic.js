 // [Initialize Firebase]
 var config = {
  apiKey: "AIzaSyB3jMJBmzTKjqXxwsPuZPxfzsyJFCL5xdo",
  authDomain: "luis-map-api-1521238291598.firebaseapp.com",
  databaseURL: "https://luis-map-api-1521238291598.firebaseio.com",
  projectId: "luis-map-api-1521238291598",
  storageBucket: "luis-map-api-1521238291598.appspot.com",
  messagingSenderId: "599435330844"
};

firebase.initializeApp(config);

// [make a var to reference the database.] 
var database = firebase.database();

// [ElTrenDeLaVida references a specific location in our database.]

var ElTrenDeLaVida = database.ref("/trainData");

//++++++++++++++++++++++++++++++++++++++++++++++

// [Initial Values.] 

var name = "";
var destination = "";
var time = 0000;
// var First Train Time = "";
var frequency = 00;

//++++++++++++++++++++++++++++++++++++++++++++++

// [this is for when user clicks the submit-train button.] 
$("#submit-train").on("click", function() {
event.preventDefault();
//event.preventDefault(); is a method that does not accept any arguments. 
//event.preventDefault(); if this method is called, the default action of the event will not be triggered. 
//will prevent ERROR. 





//[Get the input values.] 
//. val get the value from the element. 
//. trim removes all newlines, spaces and tabs from beginning and end of the supplied string. 
//. jQuery format plugin enables the formatting and parsing of dates and numbers.  
//. parseInt converts string into an actual number. -youtube video said. 
//. parseInt function parses a string argument & returns an integer of the specified radix(the base in mathematical numeral systems.)

var TrenName = $("#train-name").val().trim();
var TrenDestination = $("#destination").val().trim();
var TrenTime = moment($("#train-time").val().trim(), "HH:mm").format();
var TrenFrequency = parseInt($("#frequency").val().trim());
//If you write letter it will give you error, it needs to be a number.

// [this will make "temporary" object for holding ?employee? data.] 
var newTren = {
name: TrenName,
destination: TrenDestination,
time: TrenTime, 
frequency: TrenFrequency
// this is the inteL IN FIREBASE. 
}

//[save the new train in Firebase.] 
database.ref("/trainData").push(newTren);

// [Train Info.]
console.log(newTren.name);
console.log(newTren.destination);
console.log(newTren.time);
console.log(newTren.frequency);

// [Alert]
alert("Train successfully added");

// [Clears all of the text-boxes.] 
$("#train-name").val("");
$("#destination").val("");
$("#train-time").val("");
$("#frequency").val("");

// [prevents moving to new page.] 
// 
return false;

}); // the end of submit-train event. 

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry. 
//funtion that waits for the child to be added. Then go. 

database.ref("/trainData").on("child_added", function(childSnapshot, prevChildKey) {
//go to database. Look at /trainData, when childadded do THIS -->>>>>>>  THE FUNCTION. 

// Store info into variable. 
// var declares a new variable. even if the same name. 
var TrenName = childSnapshot.val().name;
var TrenDestination = childSnapshot.val().destination;
var TrenTime = childSnapshot.val().time;
var TrenFrequency = childSnapshot.val().frequency;
// in real time. 
// when picture taken look for name , on the other one look for destination. 

// no console.logs for above. 
 
  // First Train Time (pushed back 1 year to make sure it comes before current time)
  var trnTimeConverted = moment(TrenTime, "HH:mm").subtract(1, "years");
  console.log(trnTimeConverted);

// Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(trnTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var trnRemainder = diffTime % TrenFrequency;
  console.log(trnRemainder);

  // Minute Until Train
  var trnMinutesTill = TrenFrequency - trnRemainder;
  console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

  // Next Train
  var nextTrain = moment().add(trnMinutesTill, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));



 // Add each train's data into the table
 $("#train-table > tbody").append("<tr><td>" + TrenName + "</td><td>" + TrenDestination + "</td><td>" +
 TrenFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trnMinutesTill + "</td><td>" + "" + "</td></tr>");
});


// child selector only selects first level descendants. 
// > CHILD SELECTOR -----     PARENT > CHILD.    body is child of train table ID. 
//<TR>= TABLE ROW. 
//<TD> TABLE DATA, its just the data.
// EVERYTHING AFTER APPEND IS GOING INSIDE T BODY.  
// TR/ CLOSES THE ROW AT THE END. 


// append just puts it into the HTML. 







