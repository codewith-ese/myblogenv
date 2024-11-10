   
document.getElementById("wardrobForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get user inputs
    let projectName = document.getElementById("projectName").value;
    let wardLenght = parseFloat(document.getElementById("wardLenght").value);
    let wardWidth = parseFloat(document.getElementById("wardWidth").value);
    let wardhight = parseFloat(document.getElementById("wardhight").value);
    let warddemacation = parseFloat(document.getElementById("warddemacation").value);
    let warddoors = parseFloat(document.getElementById("warddoors").value);
    let warddrawers = parseFloat(document.getElementById("warddrawers").value);

    // // Calculate total area for the table top
    // let tableTopArea = tableLength * tableWidth; // Area in square centimeters
    // let tableLegs = 4 * 2; // Assuming 4 * 2 legs for the table



    // Tickness of baord 
    board_ticknes = 1.5875; // cm
    leg_width = 9;  // 9 cm
    let authur = "Monday Eseinone"

    // Calculate wardrobe shelves 
    let newLenght =  wardLenght - parseFloat(board_ticknes * 2).toFixed(1)
    let lengthWdisplay = newLenght + " x " + wardWidth

    let connectionDownTop = newLenght

    // Calculating stating 2 pices 
    let newHight = wardhight + " x " + wardWidth

    // Calculating for doors 2 pices 
    let wdoors = parseFloat(wardLenght - 1) / (2).toFixed(1)

    // calculate demacation 
    let dd = warddemacation
    let doorIn = warddoors 
    let drawers = warddrawers


    // let connectionLenght = tableLength - parseFloat(5 + board_ticknes * 4)
    // let connectionWidth = tableWidth - parseFloat(5 + board_ticknes * 2)

    // let roundConnLenght = connectionLenght.toFixed(1);
    // let roundConnWidth = connectionWidth.toFixed(1);

    // Get current date
    let currentDate = new Date();
    let formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Clear inputs for next measurement
    document.getElementById("projectName").value = '';
    document.getElementById("wardLenght").value = '';
    document.getElementById("wardWidth").value = '';
    document.getElementById("wardhight").value = '';
    document.getElementById("warddemacation").value = '';
    document.getElementById("warddoors").value = '';
    document.getElementById("warddrawers").value = '';

    // Display results
    document.getElementById("namedemo").innerHTML = 
        "Project Name: ➡️ " + projectName.charAt(0).toUpperCase() + projectName.slice(1);
    document.getElementById("shelvesDemo").innerHTML = "Wardrob shelves  ➡️ : " + lengthWdisplay + " " + "cm (6 Piece)" + " Demacation " + dd;
    document.getElementById("hightDemo").innerHTML = "Wardrobe Standing  ➡️ : " + newHight + " (2 Pieces)";
    document.getElementById("doorsDemo").innerHTML = " Wardrobe Doors ➡️ : " + wdoors + " x " + " 9 " + " cm (2 Pieces)";
    document.getElementById("connectionDemo").innerHTML = "Top and Bottom Connection ➡️ : " + connectionDownTop + "x " + " 9.5  (4 Pieces)";
    document.getElementById("date").innerHTML = "Date: " + formattedDate; // Display the date
    document.getElementById("author").innerHTML = " Designed by " + authur;

    
});



// THIS CODE WILL PRINT THE RESULT PAGE 
document.getElementById("printResultsButton").addEventListener("click", function() {
    // Get the results
    let projectName = document.getElementById("namedemo").innerHTML;
    let wwShelves = document.getElementById("shelvesDemo").innerHTML;
    let wwStanding = document.getElementById("hightDemo").innerHTML;
    let wwDoors = document.getElementById("doorsDemo").innerHTML;
    let wwTopDowncon = document.getElementById("connectionDemo").innerHTML;
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
    printWindow.document.write('<div>' + wwShelves + '</div>');
    printWindow.document.write('<div>' + wwStanding + '</div>');
    printWindow.document.write('<div>' + wwDoors + '</div>');
    printWindow.document.write('<div>' + wwTopDowncon + '</div>');
    printWindow.document.write('<div>' + date + '</div>');
    printWindow.document.write('<div>' + author + '</div>');
    printWindow.document.write('<footer></footer>');
    printWindow.document.write('</body></html>');
    
    // Close the document to finish writing
    printWindow.document.close();
    
    // Print the results
    printWindow.print();
});