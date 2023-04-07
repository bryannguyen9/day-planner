// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  

function currentTime () {
    var today = dayjs();
    $('#currentDay').text(today.format('dddd, MMMM D, YYYY [at] hh:mm:ss a'));
    }

currentTime();
setInterval(currentTime, 1000);

function pastPresentFuture() {
    var presentTime = parseInt(dayjs().format('H')); // use H instead of h for 24-hour format

    for (var i = 9; i < 18; i++) {
        var timeBlock = document.getElementById("hour-"+ i);
        
        if (i < presentTime) {
            timeBlock.classList.add("past");
          } else if (i === presentTime) {
            timeBlock.classList.add("present");
          } else {
            timeBlock.classList.add("future");
          }
    }
}
        

pastPresentFuture();

document.addEventListener("DOMContentLoaded", function() {
    for (var i = 9; i < 18; i++) {
      var saveBtn = document.querySelectorAll(".saveBtn")[i - 9];
      var blockInput = document.querySelector("#block-" + i);
      var blockValue = JSON.parse(localStorage.getItem("block-" + i)) || "";
      
      blockInput.value = blockValue;
  
      saveBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var blockInput = this.previousElementSibling;
        var blockValue = blockInput.value.trim();
        var blockIndex = this.getAttribute("id").replace("saveBtn-", "");
  
        localStorage.setItem("block-" + blockIndex, JSON.stringify(blockValue));
      });
    }
  });
  
  window.addEventListener("load", function() {
    for (i = 9; i < 18; i++) {
      var inputText = document.querySelector("#block-" + i);
      var savedBlock = JSON.parse(localStorage.getItem("block-" + i));
      if (savedBlock) {
        inputText.value = savedBlock;
      }
    }
  });

  