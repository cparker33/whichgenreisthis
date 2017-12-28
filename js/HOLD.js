$(document).ready(function() {

  $('#main').on('input', function(event) {


    $.ajax({
      url: 'https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + event.target.value + '&api_key=bf3e244da691d8a28c50f8d7aa265d35&format=json',
      success: function(data) {
        
        var tags = data.results.artistmatches.artist;
        var tagsSliced = tags.slice(0, 1);
        var tagsSlicedRes = tagsSliced[0].name;
        tagsSlicedRes = tagsSlicedRes.toUpperCase();

        $('#autocomplete').val(tagsSlicedRes);

        //console.log('from api: ' + tagsSlicedRes);
      }

    })

    var userInput = '';
    var autocomplete = '';
    userInput = $('#main').val();
    userInput = userInput.toUpperCase()
    autocomplete1 = $('#autocomplete').val();
    autocomplete = autocomplete1.replace(userInput, '');

    //userInput == autocomplete1.slice(0,userInput.length)
    var firstChars = autocomplete1.slice(0, userInput.length);

    if (userInput === firstChars) {
      $('#autocomplete').show();
      $('#main').removeClass('white');
    } else {
      $('#autocomplete').hide();
      $('#main').addClass('white');
    }

    if ($('#main').val().length < 3) {
      $('#autocomplete').hide();
    }

  });







  $('#main').keypress(function(e) {
    var key = e.which;
    if($('#main').val().length){

    }
    if($('#main').val().length<2){
      autocomplete1=null;
    }
    if (key === 13) {
      if($('#main').val().length>1){
      if (autocomplete1.length) {
        document.getElementById("tags").innerHTML ='';

        $.ajax({
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + autocomplete1 +'&api_key=bf3e244da691d8a28c50f8d7aa265d35&format=json',
         success: function(data) {
         $('.display').css('opacity','1');
           var tags = data.artist.tags.tag

             for (var I = 0; I < tags.length; I++){
             nameList = "<li>" + tags[I].name + "</li>";
              document.getElementById("tags").innerHTML += nameList;


         }
       var theName = data.artist.name

       document.getElementById("name").innerHTML = theName;

       var thePic = data.artist.image[3]['#text']
       console.log(thePic);
       $('.box1').css('background-image','url('+thePic+'),linear-gradient(to top right, #FE6BBE, #FAD865)')
       //document.getElementById("img").src = thePic;
         }
         })
      }

    }

    }
  });

});
