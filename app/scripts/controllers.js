'use strict';
    angular.module("confusionApp")
        .controller('MenuController',['$scope','menuFactory',function($scope,menuFactory){
        $scope.tab =1;
       $scope.filtText = '';
        $scope.showDetails = true;
        
        $scope.dishes = {};
        menuFactory.getDishes()
            .then(
            function(response){
            $scope.dishes = response.data;
        });
      
        
        $scope.select = function(setTab) {
               $scope.tab = setTab;

                if (setTab === 2){
                    $scope.filtText = "appetizer";
                }else if (setTab === 3){
                    $scope.filtText = "mains"; 
                } else if (setTab === 4){
                     $scope.filtText = "dessert";
                } else{
                     $scope.filtText = "";
                }
                   
              
            };
         $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
        $scope.toggleDetails= function(){
           $scope.showDetails =!$scope.showDetails;
        };
    }]) 
    //takes care of contact page
    .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
        
        //for the telephone channel selection we create an array of objects to help feed mychannel in feedback objec.
         var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])
    //takes care of the feedback(dishdetailpage)
     .controller('FeedbackController', ['$scope',function($scope) {
            
             $scope.sendFeedback = function() {
                    console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")&& !$scope.feedback.mychannel) { 
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
    .controller('dishDetailController',['$scope','$stateParams','menuFactory', function($scope,$stateParams,menuFactory) {

        $scope.dish = {};
        menuFactory.getDish(parseInt($stateParams.id,10))
                        .then(
                             function(response){
                             $scope.dish=response.data;
                             $scope.showDish =true;
                        
        });  
        
        
       
            
           
            
        }])
    .controller('FormController',['$scope', function($scope){
            $scope.commentBoxIsTouched = false;
            $scope.defaultselectedrating={
                author :"",
                rating : '5',
                comment:"",
                date :new Date()
                
            };
            
            $scope.sendComment = function(defaultselectedrating){
                     $scope.dish.comments.push(defaultselectedrating);
                    $scope.defaultselectedrating = {author:"", rating:'5', comment:"",
                                        date :new Date() };
                  
                $scope.commentForm.$setPristine();
               
                
            };
            
            
        }])
        .controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
            
            var leaders = corporateFactory.getLeaders();
            
            $scope.corporateLeaders = leaders;
        
    }])
    .controller('IndexController',['$scope','$stateParams','menuFactory','corporateFactory',function($scope,$stateParams,menuFactory,corporateFactory){
            
            var promotion = menuFactory.getPromotion(parseInt($stateParams.id,10));
            
            $scope.promo = promotion;
            $scope.uttpizza ={};
                
                menuFactory.getDish(0)
                .then(function(response){
                     $scope.uttpizza = response.data;
                     $scope.showDish = true;
                });
       
        
        var promotion = menuFactory.getPromotion(0);
        $scope.monthPromo = promotion;
        
        var leaders = corporateFactory.getLeader(3);
        $scope.leader = leaders;
    }])


   