// when the page loads append the current date to the top of the page
$("#currentDay").append(moment().format("dddd, MMMM Do YYYY"));

let renderScheduleContainer = function() {
    // our work day starts at 9am
    let currentBlock = 9;
    for (let i = 0; i < 9; i++) {
        // create the elements that will make up each timeblock row
        let timeBlockP = $("<p>").attr("id", currentBlock).addClass("row time-block");
        let hourP = $("<h3>").addClass("col-2 hour").text(moment({hour: currentBlock}).format("LT"))
        let textP = $("<card>").addClass("col-9 row").text("TEST");
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

let auditList = function(timeBlock) {
    let time = $(timeBlock).find("h3").text().trim();
    let timeMoment = moment(time, "HH");

    if (moment().isAfter(timeMoment)) {
        $(timeBlock).find("card").addClass("past");
    }
    else if (Math.abs(moment().diff(timeMoment, "hours")) <= 1) {
        $(timeBlock).find("card").addClass("present");
    }
    else {
        $(timeBlock).find("card").addClass("future");
    }
}

renderScheduleContainer();