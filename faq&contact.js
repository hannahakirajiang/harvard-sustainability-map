// JavaScript Document

function checkLenth() {
  //console.log(document.getElementById("pwd1").value.length)
  if (document.getElementById("pwd1").value.length < 8) {
    document.getElementById('pwd1Hint').style.display = 'block';
  } else {
    document.getElementById('pwd1Hint').style.display = 'none';
  }
}

function checkMatch() {
  if (document.getElementById("pwd1").value != document.getElementById("pwd2").value) {
    document.getElementById('pwd2Hint').style.display = 'block';
  } else {
    document.getElementById('pwd2Hint').style.display = 'none';
  }
}


function checkBio() {
  var max = 140;
  var myLenth = document.getElementById('bio').value.length;
  var wordLeft = Number(max - myLenth);
  var wordOver = Number(myLenth - max);

  if (myLenth <= max) {
    document.getElementById('counter').innerHTML = "You have " + wordLeft + " character(s) left.";
  } else {
    document.getElementById('counter').innerHTML = "You are " + wordOver + " character(s) over.";
    document.getElementById('counter').style.color = "red";
  }
}

