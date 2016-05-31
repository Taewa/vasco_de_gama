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
			
			scope.imgList = [];
			

			


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




			// scope.insertContent = function(){
			// 	var contentNum = scope.randomGenerator();
			// 	var current = scope.chosenStory;

			// 	var year = current + "_" + contentNum + "_date.png";
			// 	var content = current + "_" + contentNum + "_txt.png";
				
			// 	var contentCoverNeg = angular.element(document.getElementsByClassName('content-cover')[0]);
			// 	var contentCoverPos = angular.element(document.getElementsByClassName('content-cover')[1]);
				
			// 	var html = scope.contentGenerator(year, content);


			// 	scope.postInsertProcess();

			// 	if(scope.panelCurrent == 'pos'){
			// 		contentCoverNeg.prepend(html.year);
			// 		contentCoverPos.prepend(html.content);
			// 	}else{	//neg
			// 		contentCoverPos.prepend(html.year);
			// 		contentCoverNeg.prepend(html.content);
			// 	}
			// }



			scope.insertContent = function(){
				var contentNum = scope.randomGenerator();
				var current = scope.chosenStory;

				// var year = current + "_" + contentNum + "_date.png";
				// var content = current + "_" + contentNum + "_txt.png";

				var year = "sm/neg_1_date.min.png";
				var content = "sm/neg_1_txt.min.png";
				
				

				// scope.imgList[scope.chosenStory] = [contentNum];
				
				// if(scope.imgList[scope.chosenStory]){
				// 	scope.imgList[scope.chosenStory].shift();	
				// }

				if(typeof scope.imgList[scope.chosenStory] != "object"){
					scope.imgList[scope.chosenStory] = [];
				}
				
				

				scope.imgList[scope.chosenStory] = [contentNum];

				
				console.log('push');
				console.log(scope.imgList[scope.chosenStory])

				scope.contentGenerator(year, content);
			}






			// scope.postInsertProcess = function(){
			// 	var year = angular.element(document.getElementsByClassName('year')[0]);
			// }




			// scope.contentGenerator = function(y, c){
			// 	var res = {};
			// 	var resY;
			// 	var resC;

			// 	// resY = '<div class="panel-content">\
			// 	// 				<img class="year" src="img/' + y + '">\
			// 	// 		</div>';

			// 	resY = '<img class="year" src="img/' + y + '" ng-show="">';

			// 	resC = '<div class="panel-description">\
			// 					<img class="desc-img" src="img/' + c + '">\
			// 				</div>';
				
			// 	res.year = resY;
			// 	res.content = resC;

			// 	return res;
			// }






			scope.contentGenerator = function(y, c){
				scope.currentYear = 'img/' + y;

				scope.currentParagraph = 'img/' + c;
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

				c('scope.isShown.neg');
				c(scope.isShown.neg);
				
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