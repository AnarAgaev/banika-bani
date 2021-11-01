var resultItemTpl = '<div class="col-lg-4">';
resultItemTpl += '<div class="result-podborka__item podborka-item">';
resultItemTpl += '<div class="podborka-item__header">';
resultItemTpl += '<div class="row row--no-margin">';
resultItemTpl += '<div class="col col--no-padding col--podborka-item__square">';
resultItemTpl += '<div class="podborka-item__square">';
resultItemTpl += 'Площадь ';
resultItemTpl += '{{area}} м2';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '<div class="col col--no-padding col-podborka-item__name">';
resultItemTpl += '<div class="podborka-item__name">';
resultItemTpl += '{{type}}';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '<div class="col col--no-padding col--podborka-item__size">';
resultItemTpl += '<div class="podborka-item__size">';
resultItemTpl += 'Размеры <br/>';
resultItemTpl += '{{big_size}}х{{small_size}}м';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '<ul class="podborka-slider list-unstyled cS-hidden" id="{{galleryId}}"">';
resultItemTpl += '{{galleryItems}}';
resultItemTpl += '</ul>';
resultItemTpl += '<div class="result-podborka__articul">';
resultItemTpl += '{{name}}';
resultItemTpl += '</div>';
resultItemTpl += '<div class="result-podborka__price">';
resultItemTpl += '<div class="result-podborka__price-text">Стоимость проекта</div>';
resultItemTpl += '<div class="result-podborka__price-old-price">';
resultItemTpl += '{{price_ind}} руб.';
resultItemTpl += '</div>';
resultItemTpl += '<div class="result-podborka__price-current-price">';
resultItemTpl += '{{price}} руб.';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '<div class="result-podborka__options">';
resultItemTpl += '<div class="result-podborka__options-option"><span class="result-podborka__options-option-left">Фундамент:</span>';
resultItemTpl += '{{typefund}}';
resultItemTpl += '</div>';
resultItemTpl += '<div class="result-podborka__options-option"><span class="result-podborka__options-option-left"> Спальня:</span>';
resultItemTpl += '{{bedrooms}}';
resultItemTpl += '</div>';
resultItemTpl += '<div class="result-podborka__options-option"><span class="result-podborka__options-option-left">Этажей:</span>';
resultItemTpl += '{{floors}}';
resultItemTpl += '</div>';
resultItemTpl += '<div class="result-podborka__options-option"><span class="result-podborka__options-option-left">Санузел</span>';
resultItemTpl += '{{bathrooms}}';
resultItemTpl += '</div>';
resultItemTpl += '</div>';
resultItemTpl += '<div class="clear"></div>';
resultItemTpl += '<a href="{{link}}" class="result-podborka__order" target="_blank">заказать</a>';
resultItemTpl += '<a href="{{link}}" class="result-podborka__more" target="_blank">подробнее</a>';
resultItemTpl += '<div class="clear"></div>';
resultItemTpl += '</div>';
resultItemTpl += '</div>';

var $ = jQuery;

var resultItemGalleryItemTpl = '<li data-thumb="{{thumb}}" data-src="{{src-lg}}" class="lslide">';
resultItemGalleryItemTpl += '<img src="{{src-md}}"/>';
resultItemGalleryItemTpl += '</li>';


var ID = function () {
  return '' + Math.random().toString(36).substr(2, 9);
};

var viewedHouses = 0;
var viewedDoppostroyki = 0;


function renderResultItems(parent, data){

	if(parent.hasClass('js-result-podborka__cards--houses')){
		viewedHouses += data.products.length;
		if(viewedHouses == data.count){
			parent.parent().find('.result-podborka__see-more').hide();
		}
	}


	if(parent.hasClass('js-result-podborka__cards--doppostroyki')){
		viewedDoppostroyki += data.products.length;
		if(viewedDoppostroyki == data.count){
			parent.parent().find('.result-podborka__see-more').hide();
		}
	}


	$.each(data.products, function(index, value) {
		var tpl = resultItemTpl;
		tpl = tpl.replace(/{{area}}/gi, value.area);
		tpl = tpl.replace(/{{type}}/gi, value.type);
		tpl = tpl.replace(/{{big_size}}/gi, value.big_size);
		tpl = tpl.replace(/{{small_size}}/gi, value.small_size);
		tpl = tpl.replace(/{{name}}/gi, value.name);
		tpl = tpl.replace(/{{price_ind}}/gi, value.price_ind);
		tpl = tpl.replace(/{{price}}/gi, value.price);
		tpl = tpl.replace(/{{typefund}}/gi, value.typefund);
		tpl = tpl.replace(/{{bedrooms}}/gi, value.bedrooms);
		tpl = tpl.replace(/{{bathrooms}}/gi, value.bathrooms);
		tpl = tpl.replace(/{{link}}/gi, value.link);
		tpl = tpl.replace(/{{floors}}/gi, value.floors);
		var galleryId = 'gallery_' + ID();
		tpl = tpl.replace(/{{galleryId}}/gi, galleryId);


		var galleryItems = '';
		var query_product = 'https://xn----itbehiwgini.xn--p1ai/wp-json/bev/v1/getproduct/?id=' + value.id;
		var appKey = 'cXVpejI0am9iOjdNSzRtWlNQWE5OdUladjUzSlNjMnNEMw==';
		var request = $.ajax({
			url: query_product,
			method: "GET",
			headers: {'Authorization': 'Basic ' + appKey}
		}).done(function (data) {


			if(typeof data['images-thumbnail'] !== 'undefined'){
				$.each(data['images-thumbnail'].vis, function(idx, value){
					//console.log(value);
					var imgThumbSrc = $(value).attr('src');
					var imgMdSrc = $(data['images-lowres'].vis[idx]).attr('src');
					var imgLgSrc = data['images'].vis[idx][0];
					var galleryItem = resultItemGalleryItemTpl;
					galleryItem = galleryItem.replace(/{{thumb}}/gi, imgThumbSrc);
					galleryItem = galleryItem.replace(/{{src-md}}/gi, imgMdSrc);
					galleryItem = galleryItem.replace(/{{src-lg}}/gi, imgLgSrc);
					galleryItems += galleryItem;
				});
			
			
			
				$.each(data['images-thumbnail'].plan, function(idx, value){
					//console.log(value);
					var imgThumbSrc = $(value).attr('src');
					var imgMdSrc = $(data['images-lowres'].plan[idx]).attr('src');
					var imgLgSrc = data['images'].plan[idx][0];
					var galleryItem = resultItemGalleryItemTpl;
					galleryItem = galleryItem.replace(/{{thumb}}/gi, imgThumbSrc);
					galleryItem = galleryItem.replace(/{{src-md}}/gi, imgMdSrc);
					galleryItem = galleryItem.replace(/{{src-lg}}/gi, imgLgSrc);
					galleryItems += galleryItem;
				});
			}else{

				if(data['images']['main'] !== false){
					var imgThumbSrc = data['images']['main'][0];
					var imgMdSrc = data['images']['main'][0];
					var imgLgSrc = data['images']['main'][0];
					var galleryItem = resultItemGalleryItemTpl;
					galleryItem = galleryItem.replace(/{{thumb}}/gi, imgThumbSrc);
					galleryItem = galleryItem.replace(/{{src-md}}/gi, imgMdSrc);
					galleryItem = galleryItem.replace(/{{src-lg}}/gi, imgLgSrc);
					galleryItems += galleryItem;
				}
					
			}

			tpl = tpl.replace(/{{galleryItems}}/gi, galleryItems);

			parent.append(tpl);

			initResultSliderGallery($('#' + galleryId));

		});

	});

}


/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String}        Count + plural form for word
 */
function pluralize(count, words) {
    var cases = [2, 0, 1, 1, 1, 2];
    return count + ' ' + words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}




var emptyResult = false;

function queryHouses( limit, cat, floor, bedroom, area, dlina, shirina, page, renderTo, countEl){
	
	if(!emptyResult){
		query_houses = 'https://xn----itbehiwgini.xn--p1ai/wp-json/bev/v1/getproducts/?';
		query_houses += 'limit=' + limit;
		query_houses += '&view=grid';
		query_houses += '&floor=' + floor;
		query_houses += '&mans=';
		query_houses += '&bedroom=' + bedroom;
		query_houses += '&bathroom=';
		query_houses += '&sl=';
		query_houses += '&sqfor=' + area + '&sqto=' + area;
		query_houses += '&dl=' + dlina;
		query_houses += '&sh=' + shirina;
		query_houses += '&price=';
		query_houses += '&popular=';
		query_houses += '&area=';
		query_houses += '&page=' + page;
		query_houses += '&cat=' + cat;
	}else{
		query_houses = 'https://xn----itbehiwgini.xn--p1ai/wp-json/bev/v1/getproducts/?';
		query_houses += 'limit=' + limit;
		query_houses += '&view=grid';
		query_houses += '&floor=';
		query_houses += '&mans=';
		query_houses += '&bedroom=';
		query_houses += '&bathroom=';
		query_houses += '&sl=';
		query_houses += '&sqfor=&sqto=';
		query_houses += '&dl=';
		query_houses += '&sh=';
		query_houses += '&price=';
		query_houses += '&popular=';
		query_houses += '&area=';
		query_houses += '&page=' + page;
		query_houses += '&cat=' + cat;
	}
	

	var appKey = 'cXVpejI0am9iOjdNSzRtWlNQWE5OdUladjUzSlNjMnNEMw==';
	var request = $.ajax({
		url: query_houses,
		method: "GET",
		headers: {'Authorization': 'Basic ' + appKey}
	}).done(function (data) {
		// Если пришёл хотя бы один результат
		if(data.count !== 0){
			renderResultItems(renderTo, data);
			countEl.text(pluralize(data.count, ['проект', 'проекта', 'проектов']));
		}else{

			emptyResult = true;

			query_houses = 'https://xn----itbehiwgini.xn--p1ai/wp-json/bev/v1/getproducts/?';
			query_houses += 'limit=' + limit;
			query_houses += '&view=grid';
			query_houses += '&floor=';
			query_houses += '&mans=';
			query_houses += '&bedroom=';
			query_houses += '&bathroom=';
			query_houses += '&sl=';
			query_houses += '&sqfor=&sqto=';
			query_houses += '&dl=';
			query_houses += '&sh=';
			query_houses += '&price=';
			query_houses += '&popular=';
			query_houses += '&area=';
			query_houses += '&page=' + page;
			query_houses += '&cat=' + cat;

			var appKey = 'cXVpejI0am9iOjdNSzRtWlNQWE5OdUladjUzSlNjMnNEMw==';
			var request = $.ajax({
				url: query_houses,
				method: "GET",
				headers: {'Authorization': 'Basic ' + appKey}
			}).done(function (data) {
				renderResultItems(renderTo, data);
				$(countEl).parents('.result-podborka__title').text('К сожалению, система не нашла проекты под ваши параметры. Посмотрите другие решения и выберите понравившийся вариант');
			});
		}
		
	});
}

var podborkaHousePage = 1;
var podborkaDopPostroykiPage = 1;


function resulPodborkaHouseQuery(count){
	var limit = count;
	var floor = $('.question-2-radio:checked').val();
	var bedroom = $('.question-4-radio:checked').val(); 
	
	var area = $('.js-question-3__area').val();
	var dlina = $('.js-question-3__length').val();
	var shirina = $('.js-question-3__width').val();
	
	if(area!=='' && dlina!=='' && shirina!==''){
		area = '';
	}

	if(area!==''){
		if( dlina =='' || shirina!==''){
			dlina = '';
			shirina = '';
		}
	}

	var cat = $('.question-1-radio:checked').val(); 

	var page = 1;
	var renderTo = $('#' + $('.question-5-radio:checked').val() + ' .js-result-podborka__cards--houses');
	var countEl = $('#' + $('.question-5-radio:checked').val() + ' .js-result-podborka__count--houses');

	queryHouses( limit, cat, floor, bedroom, area, dlina, shirina, podborkaHousePage, renderTo, countEl);
	podborkaHousePage ++;
}


function resulPodborkaDopPostroykiQuery(count){
	var cat = $('.question-6-radio:checked').val(); 
	var renderTo = $('#' + $('.question-5-radio:checked').val() + ' .js-result-podborka__cards--doppostroyki');
	var countEl = $('#' + $('.question-5-radio:checked').val() + ' .js-result-podborka__count--doppostroyki');

	queryHouses( count, cat, '', '', '', '', '', podborkaDopPostroykiPage , renderTo, countEl);
	podborkaDopPostroykiPage++;
}




