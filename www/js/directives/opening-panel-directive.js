app.directive("openingPanel", [function() {

	return {
		restrict: "E",
		replace: true,
		templateUrl: 'view/opening-panel.html',
		link: function(scope, elem, attrs) {
			/* Properties
			========================================================================== */
			scope.openOn = false;
			scope.panelCurrent = ''; 	//positive : negative
			scope.endOfStory = 5;		//Limit of story
			scope.chosenStory = '';		//Chosen by user. Mobile version will be one way syory telling
			scope.isShown = {			//Keep the panel that is shown
				pos : [],
				neg : []
			}
			scope.storyOver = false;	//It becomes true when story is over.
			
			// scope.topText = 'VASCO';
			// scope.bottomText = 'DE GAMA';

			

			/* Watch
			========================================================================== */
			// scope.$watch('panelCurrent', function(newVal, oldVal){
			// 	if(newVal == oldVal) return;  // eg, first run

				
				
			// 	// scope.openOn = true;

			// 	// if(newVal == 'pos'){
			// 	// 	//Positive
			// 	// 	scope.openPos = true;
			// 	// 	scope.openNeg = false;	
			// 	// }else{
			// 	// 	//Negative
			// 	// 	scope.openPos = false;
			// 	// 	scope.openNeg = true;	
			// 	// }
			// });



			/* Method
			========================================================================== */
			scope.init = function(){
				// scope.mainTitleCalc();
			}

			scope.open = function(pos){
				pos == 'pos'? scope.panelCurrent = 'pos' : scope.panelCurrent = 'neg';

				scope.panelChange();
			}


			scope.panelChange = function(){
				
				if(scope.storyOver){
					//Then rerboot
					scope.isShown = {
						pos : [],
						neg : []
					}

					scope.storyOver = false;
				}

				var val = scope.getPanelValue();

				scope.openOn = true;
				
				if(val == 'pos'){
					//Positive
					scope.openPos = true;
					scope.openNeg = false;
				}else{
					//Negative
					scope.openPos = false;
					scope.openNeg = true;	
				}


				scope.insertContent();

				--scope.endOfStory;				
			};


			//Return panel value. pos : neg
			scope.getPanelValue = function(){
				var res;
				if(scope.chosenStory == ''){
					res = scope.panelCurrent;

					scope.chosenStory = scope.panelCurrent;
				}else{
					res = scope.chosenStory;
				}

				return res;
			}




			scope.insertContent = function(){
				var contentNum = scope.randomGenerator();
				var current = scope.chosenStory;

				var year = current + "_" + contentNum + "_date.jpg";
				var content = current + "_" + contentNum + "_txt.jpg";
				
				var contentCoverNeg = angular.element(document.getElementsByClassName('content-cover')[0]);
				var contentCoverPos = angular.element(document.getElementsByClassName('content-cover')[1]);
				
				var html = scope.contentGenerator(year, content);


				var panelDesc = angular.element(document.getElementsByClassName('panel-description'));
				panelDesc.remove();


				if(scope.panelCurrent == 'pos'){
					contentCoverNeg.prepend(html.year);
					contentCoverPos.prepend(html.content);
				}else{
					contentCoverPos.prepend(html.year);
					contentCoverNeg.prepend(html.content);
				}
			}




			scope.contentGenerator = function(y, c){
				var res = {};
				var resY;
				var resC;

				resY = '<div class="panel-content">\
							<span class="year">\
								<img src="img/' + y + '" alt="">\
							</span>\
						</div>';

				resC = '<div class="panel-description">\
								<img src="img/' + c + '" alt="">\
							</div>';
				
				res.year = resY;
				res.content = resC;

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

			
			
			scope.randomGenerator = function(){
				var n;

				n = Math.random() * 100;
				n = Math.floor(n);
				n = n % 5;
				n = n + 1;

				c('random : ' + n);

				scope.registerNum(n);

				c('scope.isShown');
				c(scope.isShown.pos);
				
				return n;
			}



			scope.registerNum = function(n){
				var current = scope.chosenStory;

				if(scope.isShown[current].indexOf(n) == -1){
					scope.isShown[current].push(n);	
				}else{
					//Generate random number again
					scope.randomGenerator();
				}

				if(scope.isShown[current].length == 5) scope.storyOver = true;
				
			}



			scope.init();


		}
	}
}]);