// when the page loads append the current date to the top of the page
$("#currentDay").append(moment().format("dddd, MMMM Do YYYY"));

let renderScheduleContainer = function() {
    let currentBlock = 9;
    for (let i = 0; i < 9; i++) {
        let timeBlockLi = $("<p>").attr("id", currentBlock).addClass("row time-block");
        let hourP = $("<h3>").addClass("col-2 hour").text(moment({hour: currentBlock}).format("LT"))
        let timeP = $("<div>").addClass("col-9 row").text("TEST");
        let saveButton = $("<btn>").attr("id", currentBlock).addClass("col-1 saveBtn").html("<span class='oi oi-file'></span>SAVE");
        timeBlockLi.append(hourP, timeP, saveButton);
        $("#timeBlocksCont").append(timeBlockLi);
        currentBlock++
    }
}

renderScheduleContainer();