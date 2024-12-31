   
document.getElementById("tableForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get user inputs
    let projectName = document.getElementById("projectName").value;
    let tableLength = parseFloat(document.getElementById("tableLenght").value);
    let tableWidth = parseFloat(document.getElementById("tableWidth").value);
    let tableHeight = parseFloat(document.getElementById("tablehight").value);
    let tableQuantity = parseFloat(document.getElementById("tablequantity").value);

    // Calculate total area for the table top
    let tableTopArea = tableLength * tableWidth; // Area in square centimeters
    let tableLegNumber = 4 * 2; // Assuming 4 * 2 legs for the table

    // Tickness of baord 
    board_ticknes = 1.5875; // cm
    leg_width = 9;  // 9 cm
    board_size = parseFloat(120 * 240).toFixed(1);
    let authur = "Monday Eseinone"

    let connectionLenght = tableLength - parseFloat(board_ticknes * 5)
    let connectionWidth = tableWidth - parseFloat(board_ticknes * 7)

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

    // Here I calculate the quantity of board used for the measurement 
    let quantity_leg = (tableHeight * leg_width) * 8
    let quantity_connectionA = (roundConnLenght * leg_width) * 2
    let quantity_connectionB = (roundConnWidth * leg_width) * 2
    let quantity_inner_connection = quantity_connectionB
    let quantity_material = (tableTopArea + quantity_leg + quantity_connectionA + quantity_connectionB + quantity_inner_connection) / board_size

    if (tableQuantity !== "")
        agregateMaterial = quantity_material * tableQuantity
        let round_quantity_material = agregateMaterial.toFixed(1)
   

    // Display results
    document.getElementById("namedemo").innerHTML = 
        "Project Name: ➡️ " + projectName.charAt(0).toUpperCase() + projectName.slice(1);
    document.getElementById("tableTop").innerHTML = "Table Top ➡️ : " + tableLength + " x " + tableWidth + " cm (1 Piece)";
    document.getElementById("tableLegs").innerHTML = "Table Legs ➡️ : " + tableHeight + " X " + " 9 cm" + tableLegNumber + "(Pieces)";
    document.getElementById("tableConnL").innerHTML = "Side A Connection ➡️ : " + roundConnLenght + " x " + " 9 " + " cm (2 Pieces)";
    document.getElementById("tableConnS").innerHTML = "Side B Connection ➡️ : " + roundConnWidth + " x " + " 9 " + " cm (2 Pieces)";
    document.getElementById("tableInnerBrase").innerHTML = "Inner Brace Connection ➡️ : " + roundConnWidth + " x " + " 9 " + " cm (2 Pieces)";
    document.getElementById("quantityDemoTables").innerHTML = "Total Board ➡️ : " + round_quantity_material + "   for " + tableQuantity + " Tables";
    document.getElementById("date").innerHTML = "Date: " + formattedDate; // Display the date
    document.getElementById("author").innerHTML = " Designed by " + authur;
    document.getElementById("woodStoolDemo").innerHTML = '<img id="stool" src="/static/images/stool3.png" alt=" Eseinone Code Hub stool image" loading="lazy" width="400px" height="300px">' ;

    
});



// THIS CODE WILL PRINT THE RESULT PAGE 
document.getElementById("printResultsButton").addEventListener("click", function() {
    // Get the results
    let projectName = document.getElementById("namedemo").innerHTML;
    let tableTop = document.getElementById("tableTop").innerHTML;
    let tableLegs = document.getElementById("tableLegs").innerHTML;
    let tableConnL = document.getElementById("tableConnL").innerHTML;
    let tableConnS = document.getElementById("tableConnS").innerHTML;
    let tableInnPrint = document.getElementById("tableInnerBrase").innerHTML;
    let tableQuantityPrint = document.getElementById("quantityDemoTables").innerHTML;
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
    printWindow.document.write('<div>' + tableInnPrint + '</div>');
    printWindow.document.write('<div>' + tableQuantityPrint + '</div>');
    printWindow.document.write('<div>' + date + '</div>');
    printWindow.document.write('<div>' + author + '</div>');
    printWindow.document.write('<footer></footer>');
    printWindow.document.write('</body></html>');
    
    // Close the document to finish writing
    printWindow.document.close();
    
    // Print the results
    printWindow.print();
});