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