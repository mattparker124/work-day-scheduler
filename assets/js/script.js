tasks = [];

let renderScheduleContainer = function() {
    // when the page loads append the current date to the top of the page
    $("#currentDay").append(moment().format("dddd, MMMM Do YYYY"));

    // start by loading the list
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);

    // if empty, create a new array
    if (!tasks) {
        tasks = []
    };
    let currentBlock = 9;
    for (let i = 0; i < 9; i++) {
        // create the elements that will make up each timeblock row
        let timeBlockP = $("<p>").attr("id", currentBlock).addClass("row time-block");
        let hourP = $("<h3>").addClass("col-2 hour").text(moment({hour: currentBlock}).format("LT"))
        let textP = $("<card>").addClass("col-9 row description").text(tasks[currentBlock - 9]);
        let saveButton = $("<btn>").attr("id", currentBlock).addClass("col-1 saveBtn").html("<span class='oi oi-file'></span>SAVE");

        //append the three row elements to the timeblock
        timeBlockP.append(hourP, textP, saveButton);

        //append the timeblock to the timeblocks container
        $("#timeBlocksCont").append(timeBlockP);

        //check the time of this block
        auditList(timeBlockP);

        //increment so we can make the next block, or finish
        currentBlock++
    }
}

let saveList = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let auditList = function(timeBlock) {
    let time = $(timeBlock).find("h3").text().trim();
    let timeMoment = moment(time, "HH");

    // remove old status
    $(timeBlock).find(".description").removeClass("past present future");

    // the time has passed
    if (moment().isAfter(timeMoment)) {
        $(timeBlock).find(".description").addClass("past");
    }
    // it is the current hour
    else if (Math.abs(moment().diff(timeMoment, "hours")) <= 1) {
        $(timeBlock).find(".description").addClass("present");
    }
    // the time has not yet passed
    else {
        $(timeBlock).find(".description").addClass("future");
    }
}

// the description of a row was clicked
$(document).on("click", ".description", function() {
    console.log("CLICKED")
    let text = $(this).text().trim();
    let textInput = $("<textarea>").addClass("form-control col-9 row description").valueOf(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$(document).on("click", ".saveBtn", function() {
    let text = $(this).parent().find(".description").val().trim();
    let rowPos = $(this).parent().attr("id") - 9;

    tasks[rowPos] = text;
    saveList();

    //recreate the card elemenet
    let textP = $("<card>").addClass("col-9 row description").text(text);
    $(this).parent().find(".description").replaceWith(textP);
    auditList($(this).parent());
})

renderScheduleContainer();