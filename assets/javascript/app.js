// Initialize Firebase
var config = {
  apiKey: "AIzaSyDTudrJAh_RoNBWT2Pv9RoCYgQ1qD5zI7Q",
  authDomain: "train-scheduler-e68ce.firebaseapp.com",
  databaseURL: "https://train-scheduler-e68ce.firebaseio.com",
  projectId: "train-scheduler-e68ce",
  storageBucket: "train-scheduler-e68ce.appspot.com",
  messagingSenderId: "634880158600"
};
firebase.initializeApp(config);

// Create variable to reference database
var database = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minAway = "";

database.ref().on("child_added", function(snapshot){

    var arr = [];

    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    firstTrain = snapshot.val().firstTrain;
    frequency = snapshot.val().frequency;

    console.log(firstTrain);

    // First Train Time converted back 1 year
    var firstTrainConvert = moment(firstTrain, "HH:mm:").subtract(1, "years");
    console.log(firstTrainConvert);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConvert), "minutes");
    console.log(diffTime);

    // Time apart
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minutes away
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES AWAY: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm a");

    arr.push(trainName, destination, frequency, nextTrain, minutesAway);

    var tRow = $("<tr>");

    for (var i = 0; i < arr.length; i++) {

        // Create table data for each item
        var tData = $("<td>").text(arr[i]);
        tRow.append(tData);
    }

    $("tbody").append(tRow);
});

$("#submit-button").on("click", function(event){
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    $("form").trigger("reset");
});
