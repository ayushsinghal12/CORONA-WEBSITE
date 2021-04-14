const firebaseConfig = {
  apiKey: "AIzaSyA4flzYZ4xLupCjJ-YpnDq6geuEMVHGH40",
  authDomain: "corona-testing-507e8.firebaseapp.com",
  databaseURL: "https://corona-testing-507e8-default-rtdb.firebaseio.com",
  projectId: "corona-testing-507e8",
  storageBucket: "corona-testing-507e8.appspot.com",
  messagingSenderId: "464923671354",
  appId: "1:464923671354:web:4ecbf888c9c0cff9186e03"
};
firebase.initializeApp(firebaseConfig);


var UserInputRef = firebase.database().ref('UserInput')

function getVal(id) {
  return document.getElementById(id).value
}

document.getElementById('form').addEventListener('submit', submitForm)

function submitForm(e) {
  e.preventDefault()
  var fname = getVal("fname")
  var lname = getVal("lname")
  var name = fname + " " + lname
  var profession = getVal("profession")
  var email = getVal("email")
  var birth = getVal("birth")
  var number = getVal("number")
  var state = getVal("state").toLowerCase()
  showCenters(state)
  var radio = document.querySelector('input[name=option]:checked').value
  var symptoms = getCheckbox()

  saveData(name, profession, email, birth, number, state, radio, symptoms)
}

function getCheckbox() {
  var checkboxes = document.querySelectorAll('input[name=symptoms]:checked')
  var values = []
  checkboxes.forEach(
    function (checkbox) {
      values.push(checkbox.value)
    }
  )
  return values
}

function saveData(name, profession, email, birth, number, state, radio, symptoms) {
  var newUserSubmission = UserInputRef.push()
  var submission = {
    name: name,
    profession: profession,
    email: email,
    birth: birth,
    number: number,
    state: state,
    radio: radio,
    symptoms: symptoms
  }
  newUserSubmission.set(submission)
}

function showCenters(state) {
  var stateRef = firebase.database().ref(state)
  stateRef.on('value', function (i) {
    var center = i.val()
    document.getElementById('results').innerHTML = center
  }
  )
}
