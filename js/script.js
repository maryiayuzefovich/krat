var app = angular.module('lpApp', []);
app.controller('currencyCtrl', function ($scope, $http) {

	$http.get('http://www.nbrb.by/API/ExRates/Rates?Periodicity=0').then(function (res) {

		$scope.currencies = res.data;

		console.log($scope.currencies);

	});

});


(function ($) {
	$(document).ready(function () {

		function lpHeader() {
			if ($(window).scrollTop() == 0) {
				$('header').addClass('top');
			} else {
				$('header.top').removeClass('top');
			}
		}

		lpHeader();
		$(window).on('load scroll', lpHeader);

		var lpNav = $('header ul');

		lpNav.find('li a').on('click', function (e) {

			var linkTrgt = $($(this).attr('href'));
			if (linkTrgt.length > 0) {
				e.preventDefault();
				var offset = linkTrgt.offset().top;
				$('body, html').animate({
					scrollTop: offset - 95
				}, 750);
			}
		});

		function lpSetNavActive() {

			var curItem = '';

			$('section').each(function () {
				if ($(window).scrollTop() > $(this).offset().top - 200) {
					curItem = $(this).attr('id');
				}
			});

			if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active').length == 0) {
				lpNav.find('li.active').removeClass('active');
				lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');
			}

		}
		lpSetNavActive();
		$(window).on('load scroll', lpSetNavActive);



		$('.main-slider').owlCarousel({
			items: 1,
			nav: true,
			navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>']
		});

		$('.team').click(function () {
			$('.main-slider').trigger('to.owl.carousel', 1);
		});

		

		$('.tabs').each(function () {
			var tabs = $(this),
				tabsTitlesNames = [];

			tabs.find('div[data-tab-title]').each(function () {
				tabsTitlesNames.push($(this).attr('data-tab-title'));
			}).addClass('tab');

			tabs.wrapInner('<div class="tabs-content"></div>');
			tabs.prepend('<div class="tabs-titles"><ul></ul></div>');

			var tabsTitles = tabs.find('.tabs-titles'),
				tabsContent = tabs.find('.tabs-content'),
				tabsContentTab = tabs.find('.tab');

			tabsTitlesNames.forEach(function (value) {
				tabsTitles.find('ul').append('<li>' + value + '</li>');
			});

			var tabsTitlesItems = tabsTitles.find('ul li');

			tabsTitlesItems.eq(0).addClass('active');
			tabsTitlesItems.eq(2).css('padding', '5px 57px');

			tabsContentTab.eq(0).addClass('active').show();

			tabsContent.height(tabsContent.find('.active').outerHeight());

			tabsTitlesItems.on('click', function () {
				if (!tabs.hasClass('changing')) {
					tabs.addClass('changing');

					tabsTitlesItems.removeClass('active');
					$(this).addClass('active');

					var curTab = tabsContent.find('.active'),
						nextTab = tabsContentTab.eq($(this).index());

					var curHeight = curTab.outerHeight();
					nextTab.show();
					var nextHeight = nextTab.outerHeight();
					nextTab.hide();

					if (curHeight < nextHeight) {
						tabsContent.animate({
							height: nextHeight
						}, 10);
					}

					curTab.fadeOut(10, function () {
						if (curHeight > nextHeight) {
							tabsContent.animate({
								height: nextHeight
							}, 10);
						}

						nextTab.fadeIn(200, function () {
							curTab.removeClass('active');
							nextTab.addClass('active');
							tabs.removeClass('changing');
						});
					});


				}
			});


			$(window).on('load resize', function () {
				tabsContent.height(tabsContent.find('.active').outerHeight());
			});

		});




		$('#lp-fb1').wiFeedBack({
			fbScript: 'blocks/wi-feedback.php',
			fbLink: false,
			fbColor: 'rgba(118, 57, 64, 0.9)'
		});


		$('#lp-fb').wiFeedBack({
			fbScript: 'blocks/wi-feedback.php',
			fbLink: '.link1',
			fbColor: 'rgba(118, 57, 64, 0.9)'
		});




		$.fn.lpMapInit = function () {

			var lpMapOptions = {
				center: [53.863672, 27.573563],
				zoom: 16,
				controls: ['zoomControl', 'fullscreenControl']
			}

			if (window.innerWidth < 768) {
				lpMapOptions.behaviors = ['multiTouch'];
			} else {
				lpMapOptions.behaviors = ['drag'];
			}

			var Map = new ymaps.Map('map', lpMapOptions);

			var lpPlacemark = new ymaps.Placemark(lpMapOptions.center, {
				hintContent: 'Частное предприятие "КреативАудит"',
				balloonContentHeader: 'Частное предприятие "КреативАудит"',
				balloonContentBody: 'Бухгалтерские услуги',
				balloonContentFooter: 'ул. Маяковского, д.111'
			});

			Map.geoObjects.add(lpPlacemark);

		}


	});
})(jQuery);
