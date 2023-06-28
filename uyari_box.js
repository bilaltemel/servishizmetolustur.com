$(document).on('submit', 'form', function(event){
  $(this).find('button').attr("disabled", true);
  var $this = $(this);
  event.preventDefault();
  var action    = $(this).attr('action');
  var method    = $(this).attr('method');
  var formData  = new FormData($(this)[0]);
	$.ajax({
	  url:  action,
	  type: method,
	  dataType: 'json',
	  data: formData,
	  cache: false,
	  contentType: false,
	  processData: false
	})
	.done(function(result){
		$("#uyari_box").slideDown();
		$("#uyari_box_yaz").html(result.m);
		$("#uyari_box").attr("class","alert alert-dismissible alert-"+result.s+" m-t-10");
		if (result.r!=null) {
		  setTimeout(function(){
			window.location.href  = result.r;
		  },2100);
		}else{
		  setTimeout(function(){
			$("#uyari_box").slideUp();
		  },1750);
		  $('form').find('button').attr("disabled", false);
		}
		$this[0].reset();
	})
	.fail(function(){
	  $('form').find('button').attr("disabled", false);
	  $("#uyari_box").show();
	  $("#uyari_box").html("İstek gerçekleştirilemedi");
	  $("#uyari_box").attr("class","alert alert-dismissible alert-danger m-t-10");
	})
});
