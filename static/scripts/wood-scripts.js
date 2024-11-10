
document.getElementById("woodForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get user inputs
    let projectName = document.getElementById("projectName").value;
    let BoardPrice = parseFloat(document.getElementById("boardprice").value);


    // Calculate total area
    let material = [];
    let totalArea = 0;
    let authur = "Monday Eseinone"

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
    document.getElementById("author").innerHTML = " Designed by " + authur;
});


// THIS CODE WILL PRINT THE RESULT PAGE 
document.getElementById("printResultsButton").addEventListener("click", function() {
    // Get the results
    let projectName = document.getElementById("namedemo").innerHTML;
    let total_woods = document.getElementById("total").innerHTML;
    let total_wood_price = document.getElementById("boardPricedemo").innerHTML;
    let wood_date = document.getElementById("date").innerHTML;
    let author = document.getElementById("author").innerHTML;

    // Create a new window or tab
    let printWindow = window.open('', '', 'height=600,width=800');
    
    // Write the results to the new window
    printWindow.document.write('<html><head><title>Print Results</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('body { padding: 20px; font-family: Arial, sans-serif; }');
    printWindow.document.write('h2 { color: #333; }');
    printWindow.document.write('div { margin-bottom: 10px; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2>Results</h2>');
    printWindow.document.write('<div>' + projectName + '</div>');
    printWindow.document.write('<div>' + total_woods + '</div>');
    printWindow.document.write('<div>' + total_wood_price + '</div>');
    printWindow.document.write('<div>' + wood_date + '</div>');
    printWindow.document.write('<div>' + author + '</div>');
    printWindow.document.write('<footer></footer>');
    printWindow.document.write('</body></html>');
    
    // Close the document to finish writing
    printWindow.document.close();
    
    // Print the results
    printWindow.print();
});