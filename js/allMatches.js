$(document).ready(function () {
  const sportCategories = [
    { id: 1, tabDiv: "#badmintonTabDiv" },
    { id: 2, tabDiv: "#carromTabDiv" },
    { id: 3, tabDiv: "#chessTennisTabDiv" },
    { id: 4, tabDiv: "#tableTennisTabDiv" },
    { id: 5, tabDiv: "#lawnTennisTabDiv" },
    { id: 6, tabDiv: "#longJumpTabDiv" },
    { id: 7, tabDiv: "#runningTabDiv" },
    { id: 8, tabDiv: "#shortputTabDiv" },
    { id: 9, tabDiv: "#cricketTabDiv" },
  ];

  sportCategories.forEach(function (category) {
    fetchDataAndDisplay(category.id, category.tabDiv);
  });

  function fetchDataAndDisplay(categoryId, tabDiv) {
    $.ajax({
      url: "http://10.244.1.180:8080/sportCategory/" + categoryId,
      method: "GET",
      dataType: "json",
      success: function (data) {
        displayCategories(data, tabDiv);
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the fetch operation:", error);
      },
    });
  }

  function displayCategories(categories, tabDiv) {
    const navbarTabDiv = $(tabDiv);
    navbarTabDiv.empty();
    $.each(categories, function (index, category) {
      const label = $("<label>")
        .attr("for", "tab" + (index + 1))
        .text(category.categoryName);
      label.addClass("lab" + (index + 1)).attr("id", "label" + (index + 1));
      navbarTabDiv.append(label);
    });
  }
});

$(document).ready(function() {
  // Function to fetch data from the API
  function playerData() {
      $.ajax({
          url: 'http://10.244.1.180:8080/events/3',
          method: 'GET',
          dataType: 'json', // Response type expected
          success: function(response) {
            console.log(">>>>>>>>>points", response[0]?.points)
            let parseJSON = JSON.parse(response[0]?.points)
            // Player names
            $('#team1player1').text(response[0]?.team1[0].partName);
            $('#team1player2').text(response[0]?.team1[1].partName);   
            $('#team2player1').text(response[0]?.team2[0].partName);
            $('#team2player2').text(response[0]?.team2[1].partName);

            // Players sets
            if (Array.isArray(parseJSON)) {
              parseJSON.forEach(function(teamData, teamIndex) {
                  var teamName = teamData.name;
                  var teamSets = teamData.sets;
                  console.log("setsssss", teamSets)
          
                  // Update labels with team's sets points
                  if (teamName === "Team 1") {
                      updateLabels(teamSets, "#team1Set");
                  } else if (teamName === "Team 2") {
                      updateLabels(teamSets, "#team2Set");
                  } else {
                      console.log("Unknown team:", teamName);
                  }
              });
          } else {
              console.log("parseJSON is not in the expected format.");
          }
   
          },
          error: function(xhr, status, error) {
              console.error(status + ': ' + error);
          }
      });
  }
  playerData();
});

function updateLabels(sets, labelPrefix) {
    // Check if sets is an array
    if (Array.isArray(sets)) {
        sets.forEach(function(set, index) {
            $(labelPrefix + (index + 1)).text(set.point);
        });
    } else {
        console.log("Sets data is not an array.");
    }
}
