// Made to demonstrate how to use JQuery and TheDogAPI to load breed list, and show a breed image and data on selection. Any questions hit me up at - https://forum.thatapiguy.com - Aden
$(document).ready(function() {
  $('#example').DataTable();
} );



function getCatByBreed(breed_id) {
  //alert(breed_id);
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  ajax_get('https://api.thecatapi.com/v1/images/search?breed_ids=' + breed_id, function(data) {

    if (data.length == 0) {
      // if there are no images returned
      clearBreed();
      $("#breed_data_table").append("<tr><td>Sorry, no Image for that breed yet</td></tr>");
    } else {
      //else display the breed image and data
      displayBreedCatData(data[0])
    }
  });
}


  
  
  function displayBreedCatData(image) {

//    $("#catdata tr").remove();

  //alert('ttt');
    var breed_data = image.breeds[0]
      // as 'weight' and 'height' are objects that contain 'metric' and 'imperial' properties, just use the metric string
      // add a row to the table
      $("#catdata").append('<tr><td>' + breed_data.id + '</td><td>' + breed_data.name + '</td><td>' +breed_data.origin+ '</td><td>' +breed_data.description+ '</td><td><img src="' +image.url+ '" class="my-cat-img view-all-img"/></td></tr>');
 
  }









// Setup the Controls
var $breed_select = $('select.breed_select');
$breed_select.change(function() {
  var id = $(this).children(":selected").attr("id");
 // getDogByBreed(id)
});

var $cat_select = $('select.cat_select');
$cat_select.change(function() {
  var id = $(this).children(":selected").attr("id");
 // getDogByBreed(id)
});


// Load all the Breeds
function viewAllBreeds() {
  ajax_get('https://api.thecatapi.com/v1/breeds', function(data) {
    populateBreedsData(data)
  });
}
// Put the breeds in the Select control
function populateBreedsData(breeds) {
  $breed_select.empty().append(function() {
    var output = '';
    $.each(breeds, function(key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}


function populateBreedsData1(cat) {
  $cat_select.empty().append(function() {
    var output = '';
    $.each(cat, function(key, value) {
      output += '<option id="' + value.id + '">' + value.name + '</option>';
    });
    return output;
  });
}
function getBreeds() {
  ajax_get('https://api.thecatapi.com/v1/breeds', function(data) {
    populateBreedsSelect(data)
  });
}
function getBreeds1() {
  ajax_get('https://api.thecatapi.com/v1/breeds', function(data) {
    populateBreedsData(data)
  });
}

function getCategories() {
  ajax_get('https://api.thecatapi.com/v1/categories', function(data) {
    populateBreedsData1(data)
  });
}

// Put the breeds in the Select control
function populateBreedsSelect(breeds) {
  $("#catdata tr").remove();
  $("#catdata").append(function() {
  //  var output = '';
    $.each(breeds, function(key, value) {
      getCatByBreed(value.id);
      //output += '<tr><td>' + value.id + '</td><td>' + value.name + '</td><td>' +value.origin+ '</td><td>' +value.description+ '</td><td>' +value.url+ '</td></tr>';
    });
   // return output;
  });
}
// triggered when the breed select control changes
function getDogByBreed(breed_id) {
//	alert(breed_id);
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  ajax_get('https://api.thecatapi.com/v1/images/search?include_breed=1&breed_id=' + breed_id, function(data) {

    if (data.length == 0) {
      // if there are no images returned
      clearBreed();
      $("#breed_data_table").append("<tr><td>Sorry, no Image for that breed yet</td></tr>");
    } else {
      //else display the breed image and data
      displayBreed(data[0])
    }
  });
}

function getCats() {
  // search for images that contain the breed (breed_id=) and attach the breed object (include_breed=1)
  ajax_get('https://api.thecatapi.com/v1/images/search?limit=12&page=10&has_breeds=1', function(data) {

    if (data.length == 0) {
      // if there are no images returned
      clearBreed();
	      $(".test").append(" <div class='col-sm-4'> <p>Sorry, no Image for that breed yet</p></div>");

    } else {
      //else display the breed image and data
      displayAllBreed(data);
	  
    }
  });
}

// display the breed image and data
function displayAllBreed(data) {
	//console.log(data);
for (var key in data) {

	var val=data[key];
	//alert(data[key]['breeds'][0]['id']);
     ajax_get('https://api.thecatapi.com/v1/images/search?include_breed=1&breed_id=' + data[key]['breeds'][0]['id'], function(data1) {

    if (data1.length == 0) {
      // if there are no images returned
      clearBreed();
      $("#breed_data_table").append("<tr><td>Sorry, no Image for that breed yet</td></tr>");
    } else {
		//	alert('test');
//console.log(data1);
      //else display the breed image and data
      displayBreed(data1)
    }
  });
  
}



}


// clear the image and table
function clearBreed() {
  $('#breed_image').attr('src', "");
  $("#breed_data_table tr").remove();
}
// display the breed image and data
function displayBreed(image) {

    // add a row to the table
    $(".test").append(" <div class='col-sm-4'> <img id='' src='" +image[0]['url']+"' class='img-responsive my-cat-img' /><p>ID:" + image[0]['breeds'][0]['id'] + "</p></div>");

}

// make an Ajax request
function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //  console.log('responseText:' + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
// call the getBreeds function which will load all the Dog breeds into the select control
getBreeds();
getBreeds1();

  getCats();

  getCategories();
