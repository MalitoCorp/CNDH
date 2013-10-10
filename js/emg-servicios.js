// cuando la secciòn de servicios se carga...
$('#emg-servicios').on('pageshow',function(e,data){    
  $('#index-content').css('margin-top',($(window).height() - $('[data-role=header]').height() - $('[data-role=footer]').height() - $('#index-content').outerHeight())/2);
  alert('algo');
});
