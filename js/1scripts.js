$ = $;
$('[type="tel"]').inputmask('+7 (999) 999-99-99',
{ 
	"greedy": true ,
	"digits": 9
});
function getCheckBoxVal(selector){
	$ = $;

	var input_val = [];
	$(selector).each(function(index, el) {
		if($(this).is(":checked")){
			input_val.push($(this).val());
		}
	});
	return input_val;
}
let dopCards = $('.result-podborka result-podborka--doppostroyki');

// sort
function sklonenie(number, txt) {
	var cases = [2, 0, 1, 1, 1, 2];
	return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function setProduct (product, arr) {
	console.log('product');
	console.log(product);
	if (typeof product !== 'undefined') {
		// заголовок
		$('.js-ostalos-voprosov__header-text--tmp-result').html(`№${product.id}`);
		$('.js-ostalos-voprosov__header-text--tmp-count').html(`${arr.length-1}`)
		// изображение
		$('.ostalos-voprosov__photo').find('img').attr('src', product.img[0]);
		// вариант склонение
		$('.variable_text').text(sklonenie( (arr.length-1), ['вариант', 'варианта', 'вариантов']));
	}
}

let sorted_goods_array = [];

let floorAmount  = 0,
areaAmount   = 0,
priceAmount  = 0;
function makeSort (e) {
	// console.log('e');
	// console.log(e);
	// console.log('e.currentTarget');
	// console.log(e.currentTarget);
	// по этажам
	if ( $(e).hasClass('floors_amount') ) {
		sorted_goods_array = [];
		
		let floorAmount = +$(e).data('floors');

		// сформиловали новый массив с подходящими товарами
		for (let key in zhilie) {
			if(floorAmount  == 0){
				sorted_goods_array.push(zhilie[key])
			}
			else{
				if(zhilie[key].floors == floorAmount){
					sorted_goods_array.push(zhilie[key])
				}		
			}	
		}
	}
	// console.log('sorted_goods_array = ' + sorted_goods_array);
	// сформиловали новый массив с подходящими товарами
	setProduct (sorted_goods_array[0], sorted_goods_array);
}
let sorted_goods_array_area = [];

function makeSortArea (e) {	
	// по площади
	if ( $(e).hasClass('area_amount') ) {
		sorted_goods_array_area = [];
		areaAmount = +$(e).data('area');

		for (let key in sorted_goods_array) {
			if(areaAmount == 0){
				if(sorted_goods_array[key].area > 1){
					sorted_goods_array_area.push(sorted_goods_array[key])
				}	
			}else{
				if(areaAmount == 1){
					if(sorted_goods_array[key].area < 60){
						sorted_goods_array_area.push(sorted_goods_array[key])
					}	
				}

				else if(areaAmount == 2){
					if(sorted_goods_array[key].area >= 60 && sorted_goods_array[key].area <= 120){
						sorted_goods_array_area.push(sorted_goods_array[key])
					}
				}

				if(areaAmount == 3){
					if(sorted_goods_array[key].area > 120){
						sorted_goods_array_area.push(sorted_goods_array[key])
					}
				}
			}
			if(sorted_goods_array_area.length < 1){
				for (let key in sorted_goods_array) {
					if(sorted_goods_array[key].area > 1){
						sorted_goods_array_area.push(sorted_goods_array[key])
					}	
				}
			}
				// $('.result-podborka--main .result-podborka__title').text('К сожалению, система не нашла проекты под ваши параметры. Посмотрите другие решения и выберите понравившийся вариант');
			// }else{
			// 	let prText = sklonenie( (sorted_goods_array_area.length), ['проект', 'проекта', 'проектов']);
			// 	$('.result-podborka--main .result-podborka__title').text(`По итогам теста Вам подходит ${sorted_goods_array_area.length}  ${prText}  каркасных домов для постоянного проживания`)
			// }
		}
		// console.log('sorted_goods_array_area = ' + sorted_goods_array_area);
		// сформиловали новый массив с подходящими товарами
		setProduct (sorted_goods_array_area[0], sorted_goods_array_area);
	}
}

let sorted_goods_array_final = [];
function makeSortPrice (e) {	
	// по площади
	if ( $(e).hasClass('price_amount') ) {
		sorted_goods_array_final = [];
		priceAmount = +$(e).data('price');

		for (let key in sorted_goods_array_area) {
			if(priceAmount == 0){
				if(sorted_goods_array_area[key].price > 1){
					sorted_goods_array_final.push(sorted_goods_array_area[key])
				}
			}else{
				if(priceAmount == 1){
					if(sorted_goods_array_area[key].price < 2000000){
						sorted_goods_array_final.push(sorted_goods_array_area[key])
					}	
				}

				else if(priceAmount == 2){
					if(sorted_goods_array_area[key].price >= 2000000 && sorted_goods_array_area[key].price <= 2500000){
						sorted_goods_array_final.push(sorted_goods_array_area[key])
					}
				}

				if(priceAmount == 3){
					if(sorted_goods_array_area[key].price > 2500000){
						sorted_goods_array_final.push(sorted_goods_array_area[key])
					}
				}
			}
		}
		if(sorted_goods_array_final.length < 1){
			for (let key in sorted_goods_array_area) {
				if(sorted_goods_array_area[key].price > 1){
					sorted_goods_array_final.push(sorted_goods_array_area[key])
				}
			}
			$('.result-podborka--main .result-podborka__title').text('К сожалению, система не нашла проекты под ваши параметры. Посмотрите другие решения и выберите понравившийся вариант');
		}else{
			let prText = sklonenie( (sorted_goods_array_area.length-1), ['проект', 'проекта', 'проектов']);
			$('.result-podborka--main .result-podborka__title').text(`По итогам теста Вам подходит ${sorted_goods_array_area.length-1} ${prText} каркасных домов для постоянного проживания`)
		}
		// console.log('sorted_goods_array_final = ' + sorted_goods_array_final);
		// сформиловали новый массив с подходящими товарами
		setProduct (sorted_goods_array_final[0], sorted_goods_array_final);
		console.log('sorted_goods_array_final.length =' + sorted_goods_array_final.length)
	} 
}
function setProductResult (arr) {
	// console.log('productRezult');
	// вывод карточек
	for (let key in sorted_goods_array_final) {
		let slides = [];
		let previews = [];
		if (sorted_goods_array_final[key].img.length > 0) {
			for (var i = 0; i < sorted_goods_array_final[key].img.length; i++) {
				let slide = `<a href="${sorted_goods_array_final[key].img[i]}" class="podborka-slider-item"><img src="${sorted_goods_array_final[key].img[i]}" class="img-responsive" alt="alt"></a>`;
				slides.push(slide);
				let preview = `<div class="podborka-small-img"><img src="${sorted_goods_array_final[key].img[i]}" class="img-responsive" alt="alt"></div>`;
				previews.push(preview);
			}				
		}

		let objPrice = sorted_goods_array_final[key].price;
		objPrice = (objPrice-(objPrice%1000))/1000;
		let card = ` 
		<div class="col-lg-4">
		<div class="result-podborka__item podborka-item">
		<div class="result-podborka__label">ВЫБОР<br>ПОКУПАТЕЛЕЙ</div>
		<div class="podborka-item__header flex aic">
		<div class="result-podborka__articul">
		<!-- {{name}} -->
		${sorted_goods_array_final[key].name}
		</div>	
		<div class="podborka-item__floors">												
		этажей 
		<span>
		<!-- {{floors}} -->
		${sorted_goods_array_final[key].floors}
		</span>
		</div>											
		</div>							
		<div class="podborka-slider slider-for">${slides.join("")}</div>
		<div class="podborka-slider-small slider-nav">${previews.join("")}</div>
		<div class="result-podborka__footer flex aic">	
		<div class="result-podborka__price-text">Стоимость с чистовой отделкой</div>							
		<div class="result-podborka__price">										
		<div class="result-podborka__price-current-price">
		<!-- {{price}}  -->
		<span>${objPrice}</span>
		млн. руб
		</div>
		</div>
		<div class="result-podborka__options">
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Размеры:</span>
		<!-- {{big_size}}х{{small_size}} -->
		${sorted_goods_array_final[key].length} × ${sorted_goods_array_final[key].width} м
		</div>
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Спальня:</span>
		<!-- {{bedrooms}} -->
		${sorted_goods_array_final[key].bedrooms}
		</div>
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Площадь:</span>
		<!-- {{area}} -->
		${sorted_goods_array_final[key].area}м²
		</div>
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Санузел:</span>
		<!-- {{bathrooms}} -->
		${sorted_goods_array_final[key].bathrooms}
		</div>
		</div>
		</div>	
		<a href="${sorted_goods_array_final[key].link}" class="result-podborka__order" download>СКАЧАТЬ ПРОЕКТ</a>
		</div>
		<a href="#see_modal" class="result-podborka__video" data-fancybox>ПОСМОТРЕТЬ ПРОЕКТ <br> ВЖИВУЮ НА ВЫСТАВКЕ</a>
		</div>
		`;
		$('.js-result-podborka__cards--houses').append(card);
	}
	if(sorted_goods_array_final.length < 4){
		console.log('sorted_goods_array_final.length =' + sorted_goods_array_final.length);
		$('.result-podborka--main .result-podborka__see-more-btn').hide();
	}else{
		$('.result-podborka--main .result-podborka__see-more-btn').show();
		console.log('sorted_goods_array_final.length =' + sorted_goods_array_final.length);
	}
}
function setDopBani (arr) {
	console.log('вывод доп построек');
	// вывод доп построек
	for (let key in arr) {
		let slides = [];
		let previews = [];
		if (arr[key].img.length > 0) {
			for (var i = 0; i < arr[key].img.length; i++) {
				let slide = `<a href="${arr[key].img[i]}" class="podborka-slider-item"><img src="${arr[key].img[i]}" class="img-responsive" alt="alt"></a>`;
				slides.push(slide);
				let preview = `<div class="podborka-small-img"><img src="${arr[key].img[i]}" class="img-responsive" alt="alt"></div>`;
				previews.push(preview);
			}				
		}

		let objPrice = arr[key].price;
		objPrice = (objPrice-(objPrice%1000))/1000;
		let card = ` 
		<div class="col-lg-4">
		<div class="result-podborka__item podborka-item">
		<div class="result-podborka__label">ВЫБОР<br>ПОКУПАТЕЛЕЙ</div>
		<div class="podborka-item__header flex aic">
		<div class="result-podborka__articul">
		<!-- {{name}} -->
		${arr[key].name}
		</div>	
		</div>							
		<div class="podborka-slider slider-for">${slides.join("")}</div>
		<div class="podborka-slider-small slider-nav">${previews.join("")}</div>
		<div class="result-podborka__footer flex aic">	
		<div class="result-podborka__price-text">Стоимость с чистовой отделкой</div>							
		<div class="result-podborka__price">										
		<div class="result-podborka__price-current-price">
		<!-- {{price}}  -->
		<span>${objPrice}</span>
		млн. руб
		</div>
		</div>
		<div class="result-podborka__options">
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Размеры:</span>
		<!-- {{big_size}}х{{small_size}} -->
		${arr[key].length} × ${arr[key].width} м
		</div>
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Площадь:</span>
		<!-- {{area}} -->
		${arr[key].area}м²
		</div>
		<div class="result-podborka__options-option">
		${arr[key].rooms}
		</div>		
		</div>
		</div>	
		<a href="${arr[key].link}" class="result-podborka__order" download>СКАЧАТЬ ПРОЕКТ</a>
		</div>
		<a href="#see_modal" class="result-podborka__video" data-fancybox>ПОСМОТРЕТЬ ПРОЕКТ <br> ВЖИВУЮ НА ВЫСТАВКЕ</a>
		</div>
		`;
		$('.js-result-podborka__cards--doppostroyki').append(card);
	}
	if(arr.length < 4){
		console.log('arr.length =' + arr.length);
		$('.result-podborka--doppostroyki .result-podborka__see-more-btn').hide();
	}else{
		$('.result-podborka--doppostroyki .result-podborka__see-more-btn').show();
	}
	$('.js-result-podborka__count--doppostroyki').text(arr.length);
	$('.prText').text(sklonenie( arr.length, ['проект', 'проекта', 'проектов']));
}
function setDopGril (arr) {
	console.log('вывод доп построек');
	// вывод доп построек
	for (let key in arr) {
		let slides = [];
		let previews = [];
		if (arr[key].img.length > 0) {
			for (var i = 0; i < arr[key].img.length; i++) {
				let slide = `<a href="${arr[key].img[i]}" class="podborka-slider-item"><img src="${arr[key].img[i]}" class="img-responsive" alt="alt"></a>`;
				slides.push(slide);
				let preview = `<div class="podborka-small-img"><img src="${arr[key].img[i]}" class="img-responsive" alt="alt"></div>`;
				previews.push(preview);
			}				
		}

		let objPrice = arr[key].price;
		objPrice = (objPrice-(objPrice%1000))/1000;
		let card = ` 
		<div class="col-lg-4">
		<div class="result-podborka__item podborka-item">
		<div class="result-podborka__label">ВЫБОР<br>ПОКУПАТЕЛЕЙ</div>
		<div class="podborka-item__header flex aic">
		<div class="result-podborka__articul">
		<!-- {{name}} -->
		${arr[key].name}
		</div>	
		</div>							
		<div class="podborka-slider slider-for">${slides.join("")}</div>
		<div class="podborka-slider-small slider-nav">${previews.join("")}</div>
		<div class="result-podborka__footer flex aic">	
		<div class="result-podborka__price-text">Стоимость с чистовой отделкой</div>							
		<div class="result-podborka__price">										
		<div class="result-podborka__price-current-price">
		<!-- {{price}}  -->
		<span>${objPrice}</span>
		млн. руб
		</div>
		</div>
		<div class="result-podborka__options">
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Размеры:</span>
		<!-- {{big_size}}х{{small_size}} -->
		${arr[key].size} м
		</div>
		<div class="result-podborka__options-option">
		<span class="result-podborka__options-option-left">Площадь:</span>
		<!-- {{area}} -->
		${arr[key].area}м²
		</div>
		<div class="result-podborka__options-option">
		${arr[key].descr}
		</div>		
		</div>
		</div>	
		<a href="${arr[key].link}" class="result-podborka__order" download>СКАЧАТЬ ПРОЕКТ</a>
		</div>
		<span class="result-podborka__video see_modal_btn">ПОСМОТРЕТЬ ПРОЕКТ <br> ВЖИВУЮ НА ВЫСТАВКЕ</span>
		</div>
		`;
		$('.js-result-podborka__cards--doppostroyki').append(card);
	}
	if(arr.length < 4){
		console.log('arr.length =' + arr.length);
		$('.result-podborka--doppostroyki .result-podborka__see-more-btn').hide();
	}else{
		$('.result-podborka--doppostroyki .result-podborka__see-more-btn').show();
	}
	$('.js-result-podborka__count--doppostroyki').text(arr.length);
	$('.prText').text(sklonenie( arr.length, ['проект', 'проекта', 'проектов']));
}
function showResult(){
	// console.log('start showResult');

	$('body').trigger('resize');
	$('.js-quiz--result').removeClass('quiz-result--locked').removeClass('quiz-result--locked--animated').addClass('quiz-result--unlocked');

	$('.js-quiz--result').animate({
		top: '0px'
	},'slow', function() {

		$('.js-quiz-questions').hide();
		$('.js-quiz--result').css('position', 'relative');
		$('.quiz-bg').removeClass('quiz-bg--last-question').addClass('quiz-bg--result');

	});

	$('html, body').animate({
		scrollTop: $(".cards-wrapper").offset().top
	}, 100);

	$('.slider-for').each(function (idx) {
		var carouselId = "carousel" + idx;
		this.id = carouselId;
		var newClassFor = '#'+carouselId +'.slider-nav';
		$(this).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			nextArrow: '<button type="button" class="slick-next flex aic"><img src="/img/arr_slick.svg" class="icon" alt="arrow_next" /></button>',
			prevArrow: '<button type="button" class="slick-prev flex aic"><img src="/img/arr_slick.svg" class="icon" alt="arrow_prev" /></button>',
			fade: true,
			asNavFor: newClassFor
		});
	});

	$('.slider-nav').each(function (idx) {
		var carouselId = "carousel" + idx;
		this.id = carouselId;
		var newClass = '#'+carouselId +'.slider-for';

		$(this).slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: newClass,
			dots: false,
			arrows:false,
			centerMode: false,
			focusOnSelect: true,
		});
	});

	$('.podborka-slider').each(function (idx){
		var carouselId = "carousel" + idx;
		this.id = carouselId;
		var newClassFor = '#' + carouselId + '.slider-for .slick-slide:not(.slick-cloned)';
		$().fancybox({            
			selector : newClassFor,
			backFocus : false
		});
	});

	$(document).on('click', '.slick-cloned', function(e) {
		var $slides = $(this)
		.parent()
		.children('.slick-slide:not(.slick-cloned)');
		$slides
		.eq( ( $(this).attr("data-slick-index") || 0) % $slides.length )
		.trigger("click.fb-start", { $trigger: $(this) });
		return false;
	});
	$('.more_people-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: '<button type="button" class="slick-next flex aic"><img src="/img/arr_slick.svg" class="icon" alt="arrow_next" /></button>',
		prevArrow: '<button type="button" class="slick-prev flex aic"><img src="/img/arr_slick.svg" class="icon" alt="arrow_prev" /></button>',
	});

	// show_cards
	let objCards = $('.js-result-podborka__cards--houses .col-lg-4') ;
	
	setTimeout(function() { 
		objCards.hide();
		objCards.slice(0, 3).show();
	}, 3000);

	let objDop = $('.js-result-podborka__cards--doppostroyki .col-lg-4') ;
	if(objDop.length > 0){
		setTimeout(function() { 
			objDop.hide();
			objDop.slice(0, 3).show();
		}, 3000);
	}
}

let workSlider = $('.s_adv-images');
let initWorkSlider = $('.s_adv-images.slick-initialized');
$(window).on("load resize", function(){
	var width = $(document).width();
	if (width > 1200) {
		if (initWorkSlider.length > 0) {
			workSlider.slick('unslick');
		}			
	}
	else {
		workSlider.not('.slick-initialized').slick({  
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			autoplay: !0,
			dots: true,
			centerMode: true,
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					centerMode: true
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					centerMode: true
				}
			}
			]
		});
	}
});
$(window).on("load resize", function(){
	let wrapwidth = 0;

	var width = $(document).width();
	if (width > 991){
		wrapwidth = $('.cards-wrapper').width();

		$('.more_people-before').css('width',wrapwidth );
		$('.wellcome_before').css('width',wrapwidth );
		// console.log('wrapwidth = '+ wrapwidth);
	}else{
		$('.more_people-before').css('width',width );
		$('.wellcome_before').css('width',width );
		// console.log('wrapwidth = '+ width);
	}
})
// show_more
$(".result-podborka--main .result-podborka__see-more-btn").on('click', function(e) {
	e.preventDefault();
	let btnMore = $(this);
	$(".js-result-podborka__cards--houses .col-lg-4:hidden").slice(0, 3).show();
	if (!$(".js-result-podborka__cards--houses .col-lg-4").is(":hidden")) {
		btnMore.remove()
	}
});
$(".result-podborka--doppostroyki .result-podborka__see-more-btn").on('click', function(e) {
	e.preventDefault();
	let btnMore2 = $(this);
	$(".js-result-podborka__cards--doppostroyki .col-lg-4:hidden").slice(0, 3).show();
	if (!$(".js-result-podborka__cards--doppostroyki .col-lg-4").is(":hidden")) {
		btnMore2.remove()
	}
});
$('.f_iframe').fancybox({
	autoFocus:false,
	transitionEffect: "rotate",
	transitionDuration: 700
});
let seeModal = $('#see_modal');
$('.see_modal_btn').on('click', function(){
	console.log('open(seeModal)');
	// $.fancybox.open(seeModal);
})
let florsRadio = $('.question-1-radio');
florsRadio.on('change', function(){
	$.each(florsRadio, function(index, val) {

		if ( $(florsRadio[index]).prop('checked') ) {
			if(index < 3){
				$('.raschet-tabs__img').hide();
				$('.raschet-tabs__img').eq(index).show();
				let spanText = $('.question-1-radio').eq(index).data('accent');
				$('.raschet-tables__header-text span').text(spanText);
			}	else{
				$('.raschet-tabs__img').eq(2).show();
			}
		}

	});
})
$('.arrow_right').on('click', function(){
	$('.second__header').addClass('active');
})
$('form button').attr('disabled', 'disabled');
$('[type="tel"]').on('click input blur focus change keyup keydown', checkPhone);
function checkPhone() {
	if ( $(this).val().length >  1 && !$(this).val().includes('_') ) {
		$('form button').removeAttr('disabled');
	}
	else{
		$('form button').attr('disabled', 'disabled');
	}
}
let phoneInput = $('#consult_input');
let secondInputs = $('.second_input');

let succesModal = $('#consultation_thank_you');

$(".modal_window form").submit(function() {
	var th = $(this);
	let secondInputs = phoneInput.val();
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		console.log('send');

		parent.jQuery.fancybox.getInstance().close();
		$.fancybox.open(succesModal);
		setTimeout(function () {
			// $.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});
// changeNumberForm
let succesModalChange = $('#change_number_thank_you');
$('#changeNumber').submit(function() {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		console.log('send');
		$.fancybox.open(succesModalChange);
		setTimeout(function () {
			$.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});
// vieszdInzheneraForm
$("#vieszd-inzhenera").submit(function() {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		console.log('send');
		$.fancybox.open(succesModal);
		setTimeout(function () {
			// $.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});
// wellcome__yes
$("#wellcome__yes").submit(function() {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		console.log('send');
		$.fancybox.open(succesModal);
		setTimeout(function () {
			// $.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});
let quizPhoneInput = $('.js-question-7-phone');

function openbox(){
	let inputArr = $('.more_arr');
	$(this).toggleClass('active');
	$(this).siblings('.hidden__text-wrap').slideToggle('swim');
	return false;
}
$('.more_arr').on('click', openbox);

$(function($){

	var progressAnimationComplete = false;

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Кнопка Смотреть еще в подборке
/// 
/// 

// $('.js-result-podborka__see-more-btn--houses').click(function(event) {
// // resulPodborkaHouseQuery(2);
// // resulPodborkaHouseQuery(2);
// // resulPodborkaHouseQuery(2);
// });

// $('.js-result-podborka__see-more-btn--doppostroyki').click(function(event) {
// // resulPodborkaDopPostroykiQuery(3);
// // resulPodborkaDopPostroykiQuery(3);
// });



/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// raschet-tabs
/// 
/// 

$('.raschet-tabs__item-radio').click(function(event) {
	$(this).parents('.raschet-tabs').find('.raschet-tabs__item-radio.raschet-tabs__item-radio--active').removeClass('raschet-tabs__item-radio--active');
	$(this).addClass('raschet-tabs__item-radio--active');
	var index = $(this).index();
	$(this).parents('.raschet-tabs').find('.raschet-tabs__item--active').removeClass('raschet-tabs__item--active');
	$(this).parents('.raschet-tabs').find('.raschet-tabs__item').eq(index).addClass('raschet-tabs__item--active');
	$(this).parents('.raschet-tables').find('.raschet-tables__header-bage-text').text($(this).data('title'));
});





/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Header

// js-header__cta-button scroll to quiz
$('.js-header__cta-button').click(function(event) {
	var quizStartPosition = $('.quiz').offset().top;
	$('html, body').animate({
		scrollTop: quizStartPosition
	}, 500);
});



/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Bottom menu
/// 

$(window).scroll(function(event) {
	var visibilityEndPosition = $('.quiz-bg').offset().top - $(window).height() + 300;
	var scroll = $(window).scrollTop();
	if(! $('.bottom-menu').hasClass('bottom-menu--open') ){
		if(scroll > visibilityEndPosition){
			$('.bottom-menu').removeClass('bottom-menu--hidden');
		}else{
			$('.bottom-menu').addClass('bottom-menu--hidden');
		}
	}
});

function bottomMenuOpen(el){
	$('.bottom-menu').addClass('bottom-menu--open');
	$('.js-bottom-menu__slide--active').removeClass('js-bottom-menu__slide--active');
	el.parents('.js-bottom-menu__slide').addClass('js-bottom-menu__slide--active');
	$('.js-bottom-menu__overlay').show();
}


$('.js-bottom-menu__bell, .js-bottom-menu__img').click(function(event) {
	bottomMenuOpen($(this));
});

function bottomMenuClose(){
	$('.bottom-menu').removeClass('bottom-menu--open');
	$('.js-bottom-menu__slide--active').find('.js-bottom-menu__bell').removeClass('bottom-menu__bell--active');
	$('.js-bottom-menu__overlay').hide();
}
$('.js-bottom-menu__close, .js-bottom-menu__overlay').click(function(event) {
	bottomMenuClose();
});

$('.js-bottom-menu__arrow').click(function(event) {
	if($(this).parents('.bottom-menu').hasClass('bottom-menu--open')){
		bottomMenuClose();
	}else{
		bottomMenuOpen($(this));
	}
});


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Video

$(document).on("click", ".video-close", function(){
	$(".video-open").removeClass("video-open");
	media = document.querySelector('#video_full');
	media.pause();
	media.currentTime = 0;
})
$(document).on("click", ".video-close-always", function(){
	$(".video").remove()
})
$(document).on("click", ".video", function(e){
	if($(e.target).is(".video-close") || $(e.target).is(".video-close-always")) return false
		var vd = $(this)
	if(!vd.hasClass("video-open")){
		vd.addClass("video-open");
		media = document.querySelector('#video_full');
		media.play();
	}
});

$(window).scroll(function(event) {

	var scroll = $(window).scrollTop();
	if($(window).width() < 1416){
		var visibilityEndPosition = $('.js-quiz-questions').offset().top - $(window).height();
	}
	if(scroll > visibilityEndPosition){
		$(".video").hide();
		media = document.querySelector('#video_full');
		media.pause();
		$('.video').removeClass('video-open');
	}else{
		$(".video").show();
	}


});




/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// File input

$('body').on('change', 'input[type="file"]', function (e) {
	var file_name = this.value.replace(/\\/g, '/').replace(/.*\//, ''),
	reader = new FileReader()
	parent_file_load = $(this).parents('.form-file')
	if(file_name){
		parent_file_load.addClass("select-file")
		parent_file_load.find('.file-text').text(file_name)
	}
});


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Prev / Next buttons

// Prev button
$('.question__prev-btn, .bottom-menu__btn-back').click(function(event) {
// Big slides
var thisSlideSelector = '.js-quiz__question--' + $(this).data('parent');
var prevSlideSelector = '.js-quiz__question--' + (parseInt($(this).data('parent')) - 1);
$(thisSlideSelector).addClass('quiz__question--hidden');
$(prevSlideSelector).show();
$(thisSlideSelector).fadeOut('slow');
$( ".quiz__questions" ).animate({
	height: $(prevSlideSelector).height()
}, 'slow', function(){
	$( ".quiz__questions" ).css('height', 'auto');
});

// Small slides
var thisSlideSelectorSmall = '.js-bottom-menu__slide--' + $(this).data('parent');
var prevSlideSelectorSmall = '.js-bottom-menu__slide--' + (parseInt($(this).data('parent')) - 1);
$(thisSlideSelectorSmall).hide();
$(prevSlideSelectorSmall).show();

$('html, body').animate({
	scrollTop: $(".quiz__questions").offset().top
}, 500);
// tempResult();
});


// Next button
$('.question__next-btn, .bottom-menu__btn-next').click(function(event) {
	var thisSlideSelector = '.js-quiz__question--' + $(this).data('parent');
	var nextStep = parseInt($(this).data('parent')) + 1;
	var nextSlideSelector = '.js-quiz__question--' + nextStep;

	$(nextSlideSelector).fadeIn('slow', function(){
		$(thisSlideSelector).hide();
		$(this).removeClass('quiz__question--hidden');

	});
	$( ".quiz__questions" ).animate({
		height: $(nextSlideSelector).height()
	}, 'slow', function(){
		$( ".quiz__questions" ).css('height', 'auto');
	});

// Small slides
var thisSlideSelectorSmall = '.js-bottom-menu__slide--' + $(this).data('parent');
var nextSlideSelector = '.js-bottom-menu__slide--' + (parseInt($(this).data('parent')) + 1);
$(thisSlideSelectorSmall).hide();
$(nextSlideSelector).show();

$('html, body').animate({
	scrollTop: $(".quiz__questions").offset().top
}, 500);

// tempResult();




});
$('.js-quiz-submit').attr('disabled', 'disabled');
$('.js-question-7-phone').keyup(function(event) {
	var this_val = $(this).val();
	this_val = this_val.replace(/-/gi, ''); 
	this_val = this_val.replace(/_/gi, '');
	this_val = this_val.replace(/\+/gi, ''); 
	this_val = this_val.replace(/\)/gi, '');
	this_val = this_val.replace(/\(/gi, '');
	this_val = this_val.replace(/\s/g, ''); 
	if(this_val.length !== 11){
		$('.js-quiz-submit').attr('disabled', 'disabled');
	}else{
		$('.js-quiz-submit').removeAttr('disabled');
	}
});
$('.js-quiz-submit').on('click', function(){
	let userPhone = $('.js-question-7-phone').val();
	$('.js-change-number-phone').val(userPhone);
	$('.js-change-number-phone').val(userPhone);
	$('.second_input').val(userPhone);
	let radios = $('.quiz-bg ').find('input[type="radio"]');
	if ( radios.length > 0 ) {
		$.each(radios, function(index, val) {
			if ( $(radios[index]).prop('checked') ) {
				$(this).clone().appendTo('#quiz');
			}
		});
	}
	// send_quiz
	var quizForm = $('#quiz');
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: quizForm.serialize()
	}).done(function() {
		// console.log('send_quiz');			
		quizForm.trigger("reset");			
	});
	showResult();
})





/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Speech

// Открывается-закрывается
$('.quiz-speech__text-hidden').click(function () {
	var hiddenEl = $(this).find('.quiz-speech__text-hidden__inner');
	var button = $(this).find('.quiz-speech__text-btn');
	var firstString = $(this).find('.quiz-speech__text-first-string');
	if ( hiddenEl.is( ":hidden" ) ) {
		hiddenEl.slideDown( "slow" );
		button.addClass('quiz-speech__text-btn--open');
		firstString.addClass('quiz-speech__text-first-string--open');
	} else {
		hiddenEl.slideUp();
		button.removeClass('quiz-speech__text-btn--open');
		firstString.removeClass('quiz-speech__text-first-string--open');
	}
});








/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Cirle progress bar

var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;
percent = 0;
var progress_intervalID;

var animationStart = false;
function circleAnimationStart(){
	$(window).scroll(function(event) {
		var circleVisiblePosition = $('.after-get-user-phone').offset().top - 100;
		if(animationStart == false){
			if( ($(window).scrollTop() + $(window).height()) >  circleVisiblePosition){
				progress_intervalID = setInterval(setProgress, 10);
				animationStart = true;
			}
		}
	});
	$(window).trigger('scroll');
}

function setProgress() {
	percent++;
	if(percent<=100){

		const offset = circumference - percent / 100 * circumference;
		if(offset>=0){
			circle.style.strokeDashoffset = offset;
		}
		$('.progress-circle__value').text(percent + "%");
	}else{
		clearInterval(progress_intervalID);
		showCompleteSign();
		$('.js-quiz--result').addClass('quiz-result--locked--animated').show();
		progressAnimationComplete = true;
	}

}

function showCompleteSign(){
	$('.progress-circle__complete').show();
	$('.progress-circle__value').hide();
	$('.after-get-user-phone').css('opacity', 1);
}


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Question 1

$('.question-1-radio').change(function(event) {
	if($('.question-1-radio').is(':checked')){
		// tempQueryParams.cat = $('.question-1-radio:checked').val();
		makeSort($(this));
		$('.js-question-1-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--1 .bottom-menu__btn-next').removeAttr('disabled');
		$('.js-question-1-next-btn').trigger('click');
	}else{
		$('.js-question-1-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--1 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
});




/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Question 2

$('.question-2-radio').change(function(event) {
	if($('.question-2-radio').is(':checked')){
		// tempQueryParams.floor = $('.question-2-radio:checked').val();
		makeSortArea($(this));
		$('.js-question-2-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').removeAttr('disabled');
		$('.js-question-2-next-btn').trigger('click');
	}else{
		$('.js-question-2-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').attr('disabled', 'disabled');
		// tempQueryParams.floor = '';
	}
});



// очищаем предыдущий шаг
$('.js-question-2-prev-btn, .js-bottom-menu__slide--2 .bottom-menu__btn-back').click(function(event) {
	$('.question-1-radio').prop('checked', false);
	$('.js-question-1-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--1 .bottom-menu__btn-next').attr('disabled', 'disabled');
	// tempQueryParams.cat = '';
});




/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Question 3

$('.question-3-radio').change(function(event) {
	if($('.question-3-radio').is(':checked')){
		makeSortPrice($(this));
		$('.js-question-3-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').removeAttr('disabled');
		$('.js-question-3-next-btn').trigger('click');
	}else{
		$('.js-question-3-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
});


// очищаем предыдущий шаг
$('.js-question-3-prev-btn, .js-bottom-menu__slide--3 .bottom-menu__btn-back').click(function(event) {
	$('.question-2-radio').prop('checked', false);
	$('.js-question-2-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').attr('disabled', 'disabled');
	// tempQueryParams.floor = '';
});


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Question 4

$('.question-4-radio').change(function(event) {
	if($('.question-4-radio').is(':checked')){
		// tempQueryParams.bedroom = $('.question-4-radio:checked').val();
		$('.js-question-4-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').removeAttr('disabled');
		$('.js-question-4-next-btn').trigger('click');
		console.log('публикуем проекты');
		setProductResult (sorted_goods_array_final);
	}else{
		$('.js-question-4-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').attr('disabled', 'disabled');
		// tempQueryParams.bedroom = '';
	}
});



// очищаем предыдущий шаг
$('.js-question-4-prev-btn, .js-bottom-menu__slide--4 .bottom-menu__btn-back').click(function(event) {
	$('.question-3-radio').prop('checked', false);
	$('.js-question-3-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').attr('disabled', 'disabled');
});


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Question 5

$('.question-5-radio').change(function(event) {
	if($('.question-5-radio').is(':checked')){
		$('.js-question-5-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').removeAttr('disabled');
		$('.js-question-5-next-btn').trigger('click');
	}else{
		$('.js-question-5-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
	if($('#question-5-radio-1').is(':checked')){
		setDopBani(bani);
	}
	if($('#question-5-radio-2').is(':checked')){
		setDopGril(gril);
	}
});



// очищаем предыдущий шаг
$('.js-question-5-prev-btn, .js-bottom-menu__slide--5 .bottom-menu__btn-back').click(function(event) {
	$('.question-4-radio').prop('checked', false);
	$('.js-question-4-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').attr('disabled', 'disabled');
	// tempQueryParams.bedroom = '';
});




/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Question 6

$('.question-6-radio').change(function(event) {
	if($('.question-6-radio').is(':checked')){
		$('.js-question-6-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').removeAttr('disabled');
		$('.js-question-6-next-btn').trigger('click');
	}else{
		$('.js-question-6-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
});


$('.js-question-5-next-btn').click(function(event) {
	$('.quiz-bg').addClass('quiz-bg--last-question');
	circleAnimationStart();
	$('.bottom-menu').hide();
});



// очищаем предыдущий шаг
$('.js-question-6-prev-btn, .js-bottom-menu__slide--6 .bottom-menu__btn-back').click(function(event) {
	$('.question-5-radio').prop('checked', false);
	$('.js-question-5-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').attr('disabled', 'disabled');
});


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
///
///
/// Result


//start  Дата в акции
var options = {
	month: 'long',
	day: 'numeric',
};
let addDays = 45;
let date = new Date();
date.setDate(date.getDate() + addDays);
let m = date.getMonth()+1;
let d = date.getDate();
date = date.toLocaleString("ru", options)
$('.JSdate').html( date );

let addDays2 = 5;
let date2 = new Date();
date2.setDate(date2.getDate() + addDays2);
let m2 = date2.getMonth()+1;
let d2 = date2.getDate();
date2 = date2.toLocaleString("ru", options)
$('.JSdate2').html( date2 );
//end  Дата в акции

});
$(document).ready(function()  {

	$(".youtube").each(function() {
		$(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
		$(this).append($('<div/>', {'class': 'play'}));
		$(document).delegate('#'+this.id, 'click', function() {
			var iframe_url = "https://www.youtube.com/embed/" + this.id + "?&autohide=1";
			if ($(this).data('params')) iframe_url+='&'+$(this).data('params')+'&rel=0';
			var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() ,'allow':'fullscreen'})
			$(this).replaceWith(iframe);
		});
	});
});
setTimeout(function(){ 


}, 3000);

$( '.more_people-slider' ).on('beforeChange', function(event, slick, currentSlide, nextSlide){
	console.log('beforeChange');
	$('.more_people-slider-item .happy__cell iframe').each(function(index) {
		$(this).attr('src',$(this).attr('src'));
		console.log('afterChange');
		return false;
	});
});


