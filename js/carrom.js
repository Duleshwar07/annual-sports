$(document).ready(function () {
    function fetchPlayerData() {
      $.ajax({
        url: "http://10.244.1.180:8080/events/3",
        method: "GET",
        dataType: "json", // Response type expected
        success: function (response) {
          console.log("Response from server:", response); // $(document).ready(function () {
          response.forEach(function (eventData, index) {
            // Create a unique table id for each event
            var tableId = "data-table-" + index;
  
            // Create a card for each table
            var card = $("<div>").addClass("card data-table-card col-md-6");
            var cardBody = $("<div>").addClass("card-body").appendTo(card);
  
            // Create a table element for each event
            var table = $("<table>").attr("id", tableId).addClass("data-table");
  
            // Get the table headers element
            var tableHeaders = $("<thead>").appendTo(table);
  
            // Clear existing headers
            tableHeaders.empty();
  
            // Count the number of sets
            var setsCount = JSON.parse(eventData.points)[0].sets.length;
  
            // Add dynamic headers: Table Name, Set 1, Set 2, Set 3, ...
            var headerRow = $("<tr>").appendTo(tableHeaders);
            headerRow.append($("<th>").text(""));
            for (var i = 1; i <= setsCount; i++) {
              headerRow.append($("<th>").text("Set " + i));
            }
  
            var tableBody = $("<tbody>").appendTo(table);
  
            // Extract team names and set points
            var team1 = eventData.team1[0];
            var team2 = eventData.team2[0];
            var setsTeam1 = JSON.parse(eventData.points)[0].sets;
            var setsTeam2 = JSON.parse(eventData.points)[1].sets;
  
            // Create table rows for team1 and team2
            var team1Row = $("<tr>").appendTo(tableBody);
            team1Row.append(
              $("<td>").html(
                "<h5>" +
                  eventData.team1[0].teamMaster.teamName +
                  "</h5>" +
                  "<br/>" +
                  team1.partName
              )
            );
            setsTeam1.forEach(function (setDetail) {
              team1Row.append($("<td>").text(setDetail.point));
            });
  
            var team2Row = $("<tr>").appendTo(tableBody);
            team2Row.append(
              $("<td>").html(
                "<h5>" +
                  eventData.team1[0].teamMaster.teamName +
                  "</h5>" +
                  "<br/>" +
                  team2.partName
              )
            );
            setsTeam2.forEach(function (setDetail) {
              team2Row.append($("<td>").text(setDetail.point));
            });
  
            // Append the table to the card body
            table.appendTo(cardBody);
  
            // Append the card to the tables-container
            card.appendTo("#table-row");
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching data:", error);
        },
      });
    }
    fetchPlayerData();
  });