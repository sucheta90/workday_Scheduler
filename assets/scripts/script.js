let dataStorage = {};
let iEl = $("i");
iEl.off("click");
//This function updates the date ansd time on realtime basis;
setInterval(() => {
  var currentday = dayjs().format("dddd, MMM DD, YYYY, hh:mm:ss A");
  $("#currentDay").text(currentday);
}, 1000);

//This function gives the current hour of the day
function checkHourOfDay() {
  let currentHour = dayjs().hour();
  return currentHour;
}
// This changes the class
setInterval(() => {
  $("#time-slots")
    .children()
    .each(function (index, element) {
      let currHour = checkHourOfDay();
      let el = $(element);
      let elTime = parseInt(el.attr("data-time"));
      if (elTime === currHour) {
        el.addClass("present");
        el.removeClass("past");
        el.removeClass("future");
      } else if (elTime < currHour) {
        el.addClass("past");
        el.removeClass("present");
        el.removeClass("future");
      } else {
        el.addClass("future");
        el.removeClass("past");
        el.removeClass("present");
      }
    });
}, 1000);

// The Save btn saved the data input from the schedular to the local storage
let saveBtn = $(".saveBtn");
saveBtn.on("click", function (e) {
  let userInput = $(e.target).parent().children().eq(1).val();
  let hourKey = $(e.target).parent().attr("id");
  dataStorage[hourKey] = userInput;
  let userData = JSON.stringify(dataStorage);

  localStorage.setItem("userData", userData);
});

//Extracts data from the local storage
function renderUserData() {
  $(".time-block").children().eq(1).text("");
  let prevData = JSON.parse(localStorage.getItem("userData"));
  if (prevData !== null) {
    dataStorage = { ...prevData };
    $("#time-slots")
      .children()
      .each(function (index, element) {
        let el = $(element);

        if (Object.hasOwn(dataStorage, el.attr("id"))) {
          el.children().eq(1).text(dataStorage[el.attr("id")]);
        }
      });
  }
}

// Clear schedule
$("#clear-btn").on("click", function (e) {
  localStorage.clear();
  location.reload("/");
});

renderUserData(); // this function call extracts the data from the localStorage on page load
