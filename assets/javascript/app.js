var config = {
    apiKey: "AIzaSyDBPmH-dN5ZnS3xgwi2Pj-sld9T1svDqEs",
    authDomain: "newproj-2013a.firebaseapp.com",
    databaseURL: "https://newproj-2013a.firebaseio.com",
    projectId: "newproj-2013a",
    storageBucket: "newproj-2013a.appspot.com",
    messagingSenderId: "554372539117"
};
firebase.initializeApp(config);

var database = firebase.database();
$('#addTrainBtn').on("click", function() {
    
    // store user inputs
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequencyInput").val().trim();
    
    // store user input in an object
    var newTrain = {
        name: trainName,
        place: destination,
        ftrain: firstTrain,
        freq: frequency
    }
     
   
    database.ref().push(newTrain);

    // clears input fields
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");
    
    // prevent illegal input
    return false;
});


//  When a new entry is added, update database and html
database.ref().on("child_added", function(childSnapshot) {
    
    // get data from database
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrain = childSnapshot.val().ftrain;
    var frequency = childSnapshot.val().freq;
   
    // convert first train time to format
    var firstTrainTimeConverted = moment(firstTrain, "HH:mm");
        
    // the difference between current time and first train time in minutes
    var timeDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");
    
    // how many minutes till next train
    var nextTrain = frequency - (timeDifference % frequency);
   
    // time of the next train
    var nextTrainTime = moment().add(nextTrain, "minutes").format("LT");

    //update html with processed data
    var newTableRow = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nextTrainTime + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td></tr>");
    $("#trainTable>tbody").append(newTableRow);
});


// var minuteUpdate = setInterval(function() {
    
//     database.ref().once('value').then(function(updateSnapshot) {


//     }), 60000
// });









