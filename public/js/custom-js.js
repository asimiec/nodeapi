$(document).ready(function() {
  $(".vote-btn").click(function(e) {
    $(".popup").addClass("show");
    $(".vote-box").addClass("animation");
    e.preventDefault();
  });
  $(".green, .red, .yellow").click(function() {
    $(".vote-btn").addClass("selected");
    $(".vote-btn").unbind("click");
    $(".popup").removeClass("show");
    $(".vote-box").removeClass("animation");
  });
  $(".green").click(function() {
    $(".vote-btn").text("Yes");
  });
  $(".yellow").click(function() {
    $(".vote-btn").text("Not Sure");
  });
  $(".red").click(function() {
    $(".vote-btn").text("No");
  });

  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Extremely Satisfied", "Satisfied", "Average", "Not Satisfied"],
      datasets: [
        {
          label: "# of Votes",
          data: [4, 3, 4, 6],
          backgroundColor: ["#ff6702", "#ff6702", "#ff6702", "#ff6702"]
        }
      ]
    },
    options: {
      responsive: false
    }
  });
});
