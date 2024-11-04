
document.getElementById("woodForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get user inputs
    let projectName = document.getElementById("projectName").value;
    let BoardPrice = parseFloat(document.getElementById("boardprice").value);


    // Calculate total area
    let material = [];
    let totalArea = 0;

    // Get measurements
    let lengthM = parseFloat(document.getElementById("length").value);
    let widthM = parseFloat(document.getElementById("width").value);
    
    while (lengthM && widthM) {
        let squareM = lengthM * widthM;
        material.push(squareM);
        totalArea += squareM;

        // Clear inputs for next measurement
        document.getElementById("length").value = '';
        document.getElementById("width").value = '';

        // Ask for new measurement
        lengthM = parseFloat(prompt("Type length (or enter 0 to finish):"));
        if (lengthM === 0) break;
        widthM = parseFloat(prompt("Type width:"));
    }

    let oneBoard = 240 * 120; // 1 complete size of board in cm2
    let totalBoard = totalArea / oneBoard;
    let roundTotal = totalBoard.toFixed(2);
    let boardTotalCal = roundTotal * BoardPrice;

    // Get current date
    let currentDate = new Date();
    let formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Display results
    document.getElementById("namedemo").innerHTML = 
        "Project Name: ➡️ " +  " " + projectName.charAt(0).toUpperCase() + projectName.slice(1);
    document.getElementById("total").innerHTML = "Total Estimate is ➡️ : " + roundTotal + " Boads";
    document.getElementById("boardPricedemo").innerHTML = "Total Cost of Board is ➡️ " + boardTotalCal.toFixed(2);
    document.getElementById("date").innerHTML = "Date: " + formattedDate; // Display the date
});