
document.getElementById("marbleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get user inputs
    let projectName = document.getElementById("projectName").value;
    let MarblePrice = parseFloat(document.getElementById("marblePrice").value);

    // Calculate total area
    let material = [];
    let ma_list = []
    let totalArea = 0;
    let author = "Monday Eseinone"

    // Get measurements
    let lengthM = parseFloat(document.getElementById("length").value);
    let widthM = parseFloat(document.getElementById("width").value);
    
    while (lengthM && widthM) {
        let squareM = lengthM * widthM;
        material.push(squareM);
        totalArea += squareM;

        let list_one = (lengthM + "cm" + " x " + widthM +"cm  || ")
        ma_list.push(list_one)

        for( mesurements in ma_list){
            mesurements++;
        }



        // Clear inputs for next measurement
        document.getElementById("length").value = '';
        document.getElementById("width").value = '';

        // Ask for new measurement
        lengthM = parseFloat(prompt("Type length (or enter 0 to finish):"));
        if (lengthM === 0) break;
        widthM = parseFloat(prompt("Type width:"));
    }

    let oneSqm = 100 * 100; // 1 square meter in square centimeters
    let totalSq = totalArea / oneSqm;
    let roundTotal = totalSq.toFixed(1);
    let totalCost = roundTotal * MarblePrice;

    // Get current date
    let currentDate = new Date();
    let formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Display results
    document.getElementById("namedemo").innerHTML = 
        "Project Name: ➡️ " +  " " + projectName.charAt(0).toUpperCase() + projectName.slice(1);
    document.getElementById("total").innerHTML = "Total Estimate is ➡️ : " + roundTotal + " squre meter";
    document.getElementById("pricedemo").innerHTML = "Total Cost of Marble is ➡️ #" + totalCost + "  ";
    document.getElementById("date").innerHTML = "Date: " + formattedDate; // Display the date
    document.getElementById("mabelList").innerHTML = " Marble List: " + ma_list;
    document.getElementById("listCount").innerHTML = " Marble Quantity: " + mesurements;
    document.getElementById("author").innerHTML = " Author: " + author;
});




// THIS CODE WILL PRINT THE RESULT PAGE 
document.getElementById("printResultsButton").addEventListener("click", function() {
    // Get the results
    let projectName = document.getElementById("namedemo").innerHTML;
    let finalSqmeter = document.getElementById("total").innerHTML;
    let finalPrice = document.getElementById("pricedemo").innerHTML;
    let printingDate = document.getElementById("date").innerHTML;
    let ma_list_print = document.getElementById("mabelList").innerHTML;
    let count_print = document.getElementById("listCount").innerHTML;
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
    printWindow.document.write('<div>' + finalSqmeter + '</div>');
    printWindow.document.write('<div>' + finalPrice + '</div>');
    printWindow.document.write('<div>' + printingDate + '</div>');
    printWindow.document.write('<div>' + ma_list_print + '</div>');
    printWindow.document.write('<div>' + count_print + '</div>');
    printWindow.document.write('<div>' + author + '</div>');
    printWindow.document.write('<footer></footer>');
    printWindow.document.write('</body></html>');
    
    // Close the document to finish writing
    printWindow.document.close();
    
    // Print the results
    printWindow.print();
});