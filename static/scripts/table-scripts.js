   
document.getElementById("tableForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get user inputs
    let projectName = document.getElementById("projectName").value;
    let tableLength = parseFloat(document.getElementById("tableLenght").value);
    let tableWidth = parseFloat(document.getElementById("tableWidth").value);
    let tableHeight = parseFloat(document.getElementById("tablehight").value);

    // Calculate total area for the table top
    let tableTopArea = tableLength * tableWidth; // Area in square centimeters
    let tableLegs = 4 * 2; // Assuming 4 * 2 legs for the table

    // Tickness of baord 
    board_ticknes = 1.5875; // cm
    leg_width = 9;  // 9 cm
    let authur = "Monday Eseinone"

    let connectionLenght = tableLength - parseFloat(5 + board_ticknes * 4)
    let connectionWidth = tableWidth - parseFloat(5 + board_ticknes * 2)

    let roundConnLenght = connectionLenght.toFixed(1);
    let roundConnWidth = connectionWidth.toFixed(1);

    // Get current date
    let currentDate = new Date();
    let formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Clear inputs for next measurement
    document.getElementById("projectName").value = '';
    document.getElementById("tableLenght").value = '';
    document.getElementById("tableWidth").value = '';
    document.getElementById("tablehight").value = '';

    // Display results
    document.getElementById("namedemo").innerHTML = 
        "Project Name: ➡️ " + projectName.charAt(0).toUpperCase() + projectName.slice(1);
    document.getElementById("tableTop").innerHTML = "Table Top ➡️ : " + tableLength + " x " + tableWidth + " cm (1 Piece) (Area: " + tableTopArea + " cm²)";
    document.getElementById("tableLegs").innerHTML = "Table Legs ➡️ : " + tableHeight + " X " + " 9 cm (8 Pieces)";
    document.getElementById("tableConnL").innerHTML = "Side A Connection ➡️ : " + roundConnLenght + " x " + " 9 " + " cm (2 Pieces)";
    document.getElementById("tableConnS").innerHTML = "Side B Connection ➡️ : " + roundConnWidth + " x " + " 9 " + " cm (2 Pieces)";
    document.getElementById("date").innerHTML = "Date: " + formattedDate; // Display the date
    document.getElementById("author").innerHTML = " Designed by " + authur;

    
});



// THIS CODE WILL PRINT THE RESULT PAGE 
document.getElementById("printResultsButton").addEventListener("click", function() {
    // Get the results
    let projectName = document.getElementById("namedemo").innerHTML;
    let tableTop = document.getElementById("tableTop").innerHTML;
    let tableLegs = document.getElementById("tableLegs").innerHTML;
    let tableConnL = document.getElementById("tableConnL").innerHTML;
    let tableConnS = document.getElementById("tableConnS").innerHTML;
    let date = document.getElementById("date").innerHTML;
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
    printWindow.document.write('<div>' + tableTop + '</div>');
    printWindow.document.write('<div>' + tableLegs + '</div>');
    printWindow.document.write('<div>' + tableConnL + '</div>');
    printWindow.document.write('<div>' + tableConnS + '</div>');
    printWindow.document.write('<div>' + date + '</div>');
    printWindow.document.write('<div>' + author + '</div>');
    printWindow.document.write('<footer></footer>');
    printWindow.document.write('</body></html>');
    
    // Close the document to finish writing
    printWindow.document.close();
    
    // Print the results
    printWindow.print();
});