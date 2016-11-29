function getContent(){
  $("#inputW").val(event.currentTarget.innerHTML)
}

function citySearch() {
  var div = document.getElementById("autoDrop");
  $("#autoDrop").val('')
  $.ajax({
    url: "https://autocomplete.wunderground.com/aq?query=" + $("#inputW").val(),
    dataType: "jsonp",
    type: 'GET',
    jsonp: 'cb',
    success: function(parsed_json) {
      $("#autoDrop").empty()
      let list = $("<ul style='text-align: right; list-style-type: none;'>")
      for (var i = 0; i < parsed_json['RESULTS'].length; i++) {
        li = $("<li>")
        // console.log(parsed_json['RESULTS'][i]['name'])
        var a = "bleh"
        // for (let k = 0; k < parsed_json['RESULTS'][k]['name'].length; k++){
        //   a += parsed_json['RESULTS'][i]['name'][k]
        // }
        // debugger
        btn = $("<button>", {html: parsed_json['RESULTS'][i]['name'], onClick: `getContent()`})
        btn.appendTo(li)
        li.appendTo(list)
      }
      list.appendTo($("#autoDrop"))
    }
  });
}

function getWeather() {
  $.ajax({
    url: "https://api.wunderground.com/api/31effe126c93bdf6/geolookup/conditions/q/" + $("#inputW").val() + ".json",
    dataType: "jsonp",
    success: function(parsed_json) {
      var location = parsed_json['location']['city'];
      var temp_f = parsed_json['current_observation']['temp_f'];
      var image = parsed_json['current_observation']['icon_url']
      $("#geo").html(location + ": " + temp_f);
      var img = new Image();
      var div = document.getElementById("imgIcon");
      img.onload = function() {
        if (div.childNodes.length == 1) div.appendChild(img);
        else {
          div.replaceChild(img, div.childNodes[1]);
        }
      };
      img.src = image;
      document.getElementById("results").className += " wBG";
    }
  });
}

// $(document).ready(function($) {
//   geoLocate();
// });

function geoLocate() {
  navigator.geolocation.getCurrentPosition(function(position) {
    $.ajax({
      url: "http://api.wunderground.com/api/31effe126c93bdf6/geolookup/conditions/q/" + position.coords.latitude + "," + position.coords.longitude + ".json",
      dataType: "jsonp",
      success: function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        var image = parsed_json['current_observation']['icon_url']
        $("#geo").html(location + ": " + temp_f);
        var img = new Image();
        var div = document.getElementById("imgIcon");
        img.onload = function() {
          div.appendChild(img);
        };
        img.src = image;
      }
    });
  });
}
