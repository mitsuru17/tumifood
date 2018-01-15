
$(document).ready(function() {
	// MENU
	$('#toggle').click(function() {
		$(this).toggleClass('active');
		$('#overlay').toggleClass('open').show();
	});
	$('#overlay li').on('click', function(){
		$('#toggle').toggleClass('active');
		$('#overlay').toggleClass('open');
	});

	sID = setInterval(function(){
		$(".slidenav__item--next").trigger("click");
	}, 10000);

	// Select all links with hashes
	$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&& 
			location.hostname == this.hostname
		){
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 500, function() {
					// Callback after animation
					// Must change focus!
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					}
					else {
						$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});

	// HOVER PANELS
	$('.hover').hover(function(){
		$(this).addClass('flip');
	},function(){
		$(this).removeClass('flip');
	});

	$('#panel1').appear(function() {
		$(this).toggleClass('flip');
		backToNormal = setTimeout(function(){
			$('#panel1').toggleClass('flip');
		}, 3000);
	});

	// OWLCAROUSEL
	var owl = $('#dispositivosCarousel');
	owl.owlCarousel({
		loop:true,
		center:true,
		items:1
	});

	$('.arrow-carousel.arrow-left').click(function() {
		owl.trigger('prev.owl.carousel');
	})
	$('.arrow-carousel.arrow-right').click(function() {
		owl.trigger('next.owl.carousel');
	})

	// VIDEOSLIDER
	var videoslider = $('#videoslider');
	videoslider.owlCarousel({
		center: true,
		items: 1,
		loop:true,
		margin: 0
	});

	// TESTIMONIOS
	var testimonioslider = $('#testimonioslider');
	testimonioslider.owlCarousel({
		loop:true,
		responsiveClass:true,
		responsive:{
			0:{
				center: true,
				items:1
			},
			460:{
				items: 2,
				margin: 50
			},
			768 : {
	        	items : 3,
	    	}
		}
	});

	//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
	function autoPlayYouTubeModal(){
	  var trigger = $("body").find('[data-toggle="modal"]');
	  trigger.click(function() {
		var theModal = $(this).data( "target" ),
		videoSRC = $(this).attr( "data-theVideo" ), 
		videoSRCauto = videoSRC+"?rel=0&showinfo=0&autoplay=1" ;
		$(theModal+' iframe').attr('src', videoSRCauto);
		$(theModal+' button.close').click(function () {
			$(theModal+' iframe').attr('src', videoSRC);
		});   
	  });
	}

	autoPlayYouTubeModal();

	$('#videoModal').on('hidden.bs.modal', function () {
		$('#videoModal iframe').removeAttr('src');
	})

	// RESPONSIVE ELEMENTS
	function ele_adjust() {
		if ($(".caracteristicas p").css("display") == "none" ) {
			// TOOLTIPS
			$(function () {
			  $('[data-toggle="tooltip"]').tooltip()
			})
		}
		else {
		}
	};
	
	ele_adjust();
	
	$(window).resize(ele_adjust);

	// FORMU CONTACTO
    $("#form-contacto").submit(function(e) {
        e.preventDefault(); //prevent default action 
        
        var post_url = $(this).attr("action"); //get form action url
        var request_method = $(this).attr("method"); //get form GET/POST method

        $.ajax({ //ajax form submit
            url: post_url,
            type: request_method,
            data: $(this).serialize(),
            beforeSend: function (){
                $('#resultform').html("<strong>Procesando...</strong>").fadeIn();
            },
            success: function(res) {
                if (res == "OK") {
                    $("#resultform").html('<strong>Mensaje Enviado!</strong>').fadeIn();
                    $("#resultform").delay(10000).fadeOut();
                    $('#form-contacto')[0].reset();
                }
                if (res == "error") {
                    $("#resultform").html('<strong>Hubo un error!</strong>').fadeIn();
                    $("#resultform").delay(10000).fadeOut();
                    $('#form-contacto')[0].reset();
                }
            }
        })
        return false;
    });

});