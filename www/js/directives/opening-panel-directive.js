app.directive("openingPanel", [function() {

	return {
		restrict: "E",
		replace: true,
		templateUrl: 'view/opening-panel.html',
		link: function(scope, elem, attrs) {
			/* Properties
			========================================================================== */
			scope.openOn = false;
			scope.panelCurrent = ''; //positive : negative
			scope.topText = 'VASCO';
			scope.bottomText = 'DE GAMA';

			

			/* Watch
			========================================================================== */
			scope.$watch('panelCurrent', function(newVal, oldVal){
				if(newVal == oldVal) return;  // eg, first run

				
				
				// scope.openOn = true;

				// if(newVal == 'pos'){
				// 	//Positive
				// 	scope.openPos = true;
				// 	scope.openNag = false;	
				// }else{
				// 	//Negative
				// 	scope.openPos = false;
				// 	scope.openNag = true;	
				// }
			});



			/* Method
			========================================================================== */
			scope.init = function(){
				// scope.mainTitleCalc();
			}

			scope.open = function(pos){
				pos == 'pos'? scope.panelCurrent = 'pos' : scope.panelCurrent = 'nag';

				scope.panelChange();
			}


			scope.panelChange = function(){
				var val = scope.panelCurrent;

				scope.openOn = true;

				if(val == 'pos'){
					//Positive
					scope.openPos = true;
					scope.openNag = false;	
				}else{
					//Negative
					scope.openPos = false;
					scope.openNag = true;	
				}

				// scope.insertContent();
			};


			scope.insertContent = function(){
				var year = "2016";
				var content = "Vasco de Gama s’est frotté au combat lors des guerres contre castille, s’est distingué et a montré de remarquables aptitudes en tant que marin intrépide lors des batailles maritimes.";
				var contentCover = angular.element(document.getElementsByClassName('content-cover'));
				
				c('?');
				c(contentCover)
				
				var html = scope.contentGenerator(year, content);

				html = angular.element(html);
				
				if(scope.panelCurrent = 'pos'){
					contentCover.prepend(html);
				}else{
					contentCover.prepend(html);
				}
			}


			scope.contentGenerator = function(y, c){
				var res = '';

				res += '<div class="panel-content">\
							<span class="year">' + y + '</span>\
						</div>\
						<div class="panel-description">' + c + '</div>';

				return res;
			}


			//안쓰는거
			scope.mainTitleCalc = function(){
				// var top = angular.element(elem[0].getElementsByClassName('top-title'));
				// var bottom = angular.element(elem[0].getElementsByClassName('bottom-title'));
				// var tLen = scope.topText.length;
				// var bLen = scope.bottomText.length;
				// // var wd = document.querySelectorAll("body")[0].clientWidth;
				
				// // c(wd);
				// var space = 1.4;
				// var topRes = ((100 / tLen) * space) / 100;
				// var bottomRes = ((100 / bLen) * space) / 100;

				// c(bLen);


				// top.css('transform' , 'scale(' + topRes + ', 1)');
				// bottom.css('transform' , 'scale(' + bottomRes + ', 1)');

			}

			scope.init();


		}
	}
}]);