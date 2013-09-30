$(function(){
  $.ajax({
    url: '/data/rappers.json',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      var rappers = []
      $.each(data, function(k, rapper){
        rappers.push('<li><a class="playAudio" data-audio="'+rapper.className+'">'
          +'<img class="rapper-face" src="/img/'+rapper.className+'.png"></a>'
          +'<h4 class="rapper-name">'+rapper.displayName+'</h4>'
          +'<audio preload="false" id="audio-'+rapper.className+'">'
          +'<source src="/audio/'+rapper.className+'.mp3"></source>'
          +'<source src="/audio/'+rapper.className+'.ogg"></source>'
          +'Your browser isn\'t invited for super fun audio time.'
          +'</audio></li>')
      })
      $('#rappers ul').html(rappers)
    }
  });
  // $(document).on('click' , '.activity button' , function() {
   // $(this).closest(".activity").find(".action").show();
  // });
  $(document).on('click', '.playAudio', function(){
    var rapper_id = $(this).attr('data-audio')
    var audio = $('#audio-'+rapper_id);
    console.log(audio)
    audio.trigger('play');
    console.log(rapper_id)
  });
});