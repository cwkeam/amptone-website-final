$(document).ready(function(){
	if(oneOfThoseNotFancyPages){
		makeAnimateStuWhite();
	}
	$('.carousel').carousel({
        interval: 3000
    });
    $('.carousel').carousel('cycle');

    $("#navBack").hover(function(){
		$(".arrow").css("margin-right","5px");
	},function(){
		$(".arrow").css("margin-right","15px");
	});

	$("#toggle").hover(function(){
		$("#menuText").css("margin-right", "5px");
		$("#menuText").css("opacity","0.7");
		$("#toggle").css("opacity","0.7");
	},function(){
		$("#menuText").css("margin-right", "15px");
		$("#menuText").css("opacity","1.0");
		$("#toggle").css("opacity","1.0");
	});
	$("#menuText").hover(function(){
		$("#menuText").css("margin-right", "5px");
		$("#menuText").css("opacity","0.7");
		$("#toggle").css("opacity","0.7");
	},function(){
		$("#menuText").css("margin-right", "15px");
		$("#menuText").css("opacity","1.0");
		$("#toggle").css("opacity","1.0");
	});

	docHeight = $(window).height();
	$("#navBar").hover(function(){
		if($(window).scrollTop() > 0 && !oneOfThoseNotFancyPages){
			makeAnimateStuRed();
		}
	},function(){
		if(!isItBottom && !oneOfThoseNotFancyPages){
			if($(window).scrollTop() > 0){
			$("#animateStu").animate({
				backgroundColor: "#FFF",
				opacity: 1.0
			},{duration:500, queue: false});
			$("#navBar").children().children().animate({
				color: "#000"
			},{duration:500, queue: false});
			$("#menuText").animate({
				borderBottomColor:"#000"
			},{duration:500, queue: false});
			$(".icon-bar").animate({
				backgroundColor: "#000"
			},{duration:500, queue: false});
			$(".logoimg").toggleClass("blacklogoimg");
		}
	}
	});


});
var docHeight;
$(window).resize(function(){
	docHeight = $(window).height();
});

$("#toggle").click(function(){
	bringNavUp();
});

$("#menuText").click(function(){
	bringNavUp();
})

function bringNavUp(){
	$("#toggleNav").css("display","block");
	$("#toggleNav").animate({
		top: 0,
		bottom:0,
		opacity:1
	},{ duration: 300, queue: false });
	$("body").addClass("noscroll");
	$("#toggleNav").css("z-index",107);
}
$("#navBack").click(function(){
	var top1 = docHeight*2;
	console.log(top1);
	$("#toggleNav").css("height","docHeight");
	$("#toggleNav").animate({
		top: top1,
		bottom: top1/2
	},{duration:300, queue: true});
	$("body").removeClass("noscroll");
	$("#toggleNav").css("display","hidden");
});

var done = false;
var isItBottom = false;


$(window).scroll(function(){



		var scroll = $(window).scrollTop();
		var scrollDown = $(window).scrollBottom();
		if (scrollDown == 0){
			makeAnimateStuRed();
			isItBottom = true;
		}else{
			if(isItBottom){
				makeAnimateStuWhite();
				isItBottom = false;
			}
		}
		if (!isItBottom && !oneOfThoseNotFancyPages){
			if(scroll > 0){
				if(!done){
					makeAnimateStuWhite();
				}
			}else{
				makeAnimateStuTransparent();
			}
		}


});

function makeAnimateStuWhite(){
	$("#animateStu").animate({
			backgroundColor: "#FFF",
			opacity: 1.0
		},{duration:500, queue: false});
		$("#navBar").children().children().animate({
			color: "#000"
		},{duration:500, queue: false});
		$("#menuText").animate({
			borderBottomColor:"#000"
		},{duration:500, queue: false});
		$(".icon-bar").animate({
			backgroundColor: "#000"
		},{duration:500, queue: false});
		$(".logoimg").toggleClass("blacklogoimg");
		done = true;
}

function makeAnimateStuTransparent(){
	$("#animateStu").animate({
			opacity: 0.0
		},{duration:500, queue: false});
		$("#navBar").children().children().animate({
			color: "#FFF"
		},{duration:500, queue: false});
		$("#menuText").animate({
			borderBottomColor:"#FFF"
		},{duration:500, queue: false});
		$(".icon-bar").animate({
			backgroundColor: "#FFF"
		},{duration:500, queue: false});
		$(".logoimg").removeClass("blacklogoimg");
		done = false;
}

function makeAnimateStuRed(){
	$("#animateStu").animate({
			backgroundColor: "#0D121C"
		},{duration:500, queue: false});
		$("#navBar").children().children().animate({
			color: "#FFF"
		},{duration:500, queue: false});
		$("#menuText").animate({
			borderBottomColor:"#FFF"
		},{duration:500, queue: false});
		$(".icon-bar").animate({
			backgroundColor: "#FFF"
		},{duration:500, queue: false});
		$(".logoimg").toggleClass("blacklogoimg");
}

$.fn.scrollBottom = function() {
  return $(document).height() - this.scrollTop() - this.height();
};

//socketIO
var socket = io();

$('#emailform').on('submit', function(e){
	e.preventDefault();
	socket.emit('email-request', {
		email:$('[name=emailInput]').val()
	});
});

socket.on('processing', function(){
	$('#submitEmail').text('Processing...');
	$("#submitEmail").css('background-color', 'white');
	$('#submitEmail').css('color', '#dd5e5e');
	$('#submitEmail').attr('disabled','disabled');
});


socket.on('email-success', function(){
	$('.subscribe-og').css('display', 'none');
	$('.empty').toggleClass("subscribe-transition subscribe-done");
});

socket.on('email-failure', function(doc){
	if(doc.type == 'member exists'){
		alert('You are already subscribed!');
	}else{
		alert('Could not process request.');
	}
	$('#submitEmail').removeAttr('disabled');
	$('#submitEmail').css('background', 'none');
	$('#submitEmail').css('border','1px solid white')
	$('#submitEmail').css('color','white');
	$('#submitEmail').text('SUBMIT');
})
