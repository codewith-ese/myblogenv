   
document.getElementById("wardrobForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Getting user inputs
    let projectName = document.getElementById("projectName").value;
    let wardLenght = parseFloat(document.getElementById("wardLenght").value);
    let wardWidth = parseFloat(document.getElementById("wardWidth").value);
    let wardhight = parseFloat(document.getElementById("wardhight").value);

    // Tickness of baord 
    board_ticknes = 1.5875; // cm
    board_size = parseFloat(120 * 240).toFixed(1);  
    let authur = "Monday Eseinone"

    // Calculating wardrobe shelves 
    let newLenght =  wardLenght - parseFloat(board_ticknes * 2).toFixed(1)
    let lengthWdisplay = newLenght + " by " + wardWidth

    // calculating top cover 
    let topCoverLenght = wardLenght + 3
    let topCoverWidth = wardWidth  + 3
    let topCoverDisplay = topCoverLenght + " by " + topCoverWidth
 
    let connectionDownTop = newLenght

    // Calculating standing 2 pices 
    let newHight = wardhight + " by " + wardWidth

    // quatity of lenght 
    let quantityLenght = parseFloat(newLenght * wardWidth) * 6 // FOR 7 lenght connection 
    let quantityDtop = (newLenght * 9.5) * 4
    let quantitySandiingH = (wardhight * wardWidth) * 2
    let quantityTopCover = topCoverLenght * topCoverWidth

    // Total quantity calculation 
    let total_wardrobe_board = (quantityLenght + quantitySandiingH + quantityDtop + quantityTopCover) / board_size
    let round_total = (total_wardrobe_board).toFixed(1)

    let currentDate = new Date();
    let formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

    // Clear inputs for next measurement
    document.getElementById("projectName").value = '';
    document.getElementById("wardLenght").value = '';
    document.getElementById("wardWidth").value = '';
    document.getElementById("wardhight").value = '';

    // Display results
    document.getElementById("namedemo").innerHTML = 
        "Project Name: ➡️ " + projectName.charAt(0).toUpperCase() + projectName.slice(1);
    document.getElementById("shelvesDemo").innerHTML = "Horizontal shelves  ➡️ : " + lengthWdisplay + " " + "cm (6 Piece)";
    document.getElementById("hightDemo").innerHTML = "Book shelve Side  ➡️ : " + newHight + " cm (2 Pieces)";
    document.getElementById("topCoverDemo").innerHTML = " Book shelve Top Cover ➡️ : " + topCoverDisplay  + " cm (1 Piece)";
    document.getElementById("connectionDemo").innerHTML = "Top and Bottom Padding Connection ➡️ : " + connectionDownTop + " by" + " 9.5  cm (4 Pieces)";
    document.getElementById("total_board").innerHTML = "Total Estimate is ➡️ : " + round_total  + " boards";
    document.getElementById("date").innerHTML = "Date: " + formattedDate; // Display the date
    document.getElementById("author").innerHTML = " Designed by " + authur;
    document.getElementById("woodDemo").innerHTML = '<img id="woodImage" src="/static/images/shelves-stack2.png" alt=" Eseinone Code Hub W2 image" loading="lazy" width="400px" height="300px">' ;
    document.getElementById("wood3Demo").innerHTML = '<img id="wood3Image" src="/static/images/wside3.webp" alt=" Eseinone Code Hub W2 image" loading="lazy" width="400px" height="300px">' ;
    document.getElementById("woodDoorsDemo").innerHTML = '<img id="wood4Image" src="/static/images/doors.webp" alt=" Eseinone Code Hub W2 image" loading="lazy" width="400px" height="300px">' ;
    document.getElementById("lenghtDemo").innerHTML = ' Lenght <--------------' + newLenght + ' ----------------->' ; // FOR IMAGE LABLE 
    document.getElementById("only_heightDemo").innerHTML = ' Only height < 🔝' + wardhight + ' ----- ⬇️>' ; // FOR IMAGE LABLE 

    
});


// THIS CODE WILL PRINT THE RESULT PAGE 
document.getElementById("printResultsButton").addEventListener("click", function() {
    // Get the results
    let projectName = document.getElementById("namedemo").innerHTML;
    let wwShelves = document.getElementById("shelvesDemo").innerHTML;
    let wwStanding = document.getElementById("hightDemo").innerHTML;
    let wwTopDowncon = document.getElementById("connectionDemo").innerHTML;
    let printTopCover = document.getElementById("topCoverDemo").innerHTML;
    let printTotalD = document.getElementById("total_board").innerHTML;
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
    printWindow.document.write('<div>' + wwTopDowncon + '</div>');
    printWindow.document.write('<div>' + printTopCover + '</div>');
    printWindow.document.write('<div>' + printTotalD + '</div>');
    printWindow.document.write('<div>' + date + '</div>');
    printWindow.document.write('<div>' + author + '</div>');
    printWindow.document.write('<footer></footer>');
    printWindow.document.write('</body></html>');
    
    // Close the document to finish writing
    printWindow.document.close();
    
    // Print the results
    printWindow.print();
});