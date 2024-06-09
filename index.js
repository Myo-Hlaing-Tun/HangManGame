var myApp = angular.module("myApp",[]);
myApp.controller("myController",function($scope, $compile){
    $scope.words = ["hat","success","assassin","regenerate","summer"];

    $scope.init = function(){
        $scope.startGame = false;
        $scope.guessWords = [];
        $scope.guesses = 6;
        $scope.guess = "";
        $scope.winning = false;
        $scope.elements = ['head','body','rhand','lhand','lleg','rleg'];
        for(let i=0; i< 6; i++){
            document.querySelector('.'+$scope.elements[i]).style.display = "block";
        }
        $scope.guessCodes = [];
    }

    $scope.random = function(){
        let randomNum = Math.floor($scope.words.length * Math.random());
        $scope.randomWord = $scope.words[randomNum];
        $scope.startGame = true;
        $scope.showWord = "";
        for(let i=0; i<$scope.randomWord.length;i++){
            $scope.showWord += "*";
        }
        for(let i=0; i< $scope.guesses; i++){
            document.querySelector('.'+$scope.elements[i]).style.display = "none";
        }
        document.querySelector('.keyboard').innerHTML = "";
        for(let i=65; i<91; i++){
            document.querySelector('.keyboard').innerHTML += `<button id="input-${i}" ng-click="submit(${i});" ng-disabled="guessCodes.includes(${i})">${String.fromCharCode(i)}</button>`;
        }
        $scope.addDynamicContent();
    }

    $scope.addDynamicContent = function() {        
        // Get the dynamic content container
        var dynamicContentContainer = angular.element(document.getElementById('keyboard'));
        
        // Compile the new content
        $compile(dynamicContentContainer.contents())($scope);
    };

    $scope.submit = function(word){
        $scope.guessCodes.push(word);
        let guessWord = String.fromCharCode(word+32);
        $scope.guessWords.push(guessWord);
        if($scope.randomWord.includes(guessWord)){
            document.getElementById('input-'+word).style.backgroundColor = "green";
            document.getElementById('input-'+word).style.color = "white";
            $scope.showWord = "";
            for(let i=0; i< $scope.randomWord.length; i++){
                if($scope.guessWords.includes($scope.randomWord[i])){
                    $scope.showWord += $scope.randomWord[i];
                }else{
                    $scope.showWord += "*";
                }
            }
        }
        else{
            document.getElementById('input-'+word).style.backgroundColor = "red";
            document.getElementById('input-'+word).style.color = "white";
            $scope.guesses -= 1;
            for(let i=0; i<(6-$scope.guesses); i++){
                document.querySelector('.'+$scope.elements[i]).style.display = "block";
            }
        }
        $scope.success = true;
        for(let i=0; i<$scope.showWord.length; i++){
            if($scope.showWord[i] == "*"){
                $scope.success = false;
                break;
            }
        }
        if($scope.success){
            $scope.winning = true;
            $scope.startGame = false;
        }

        if($scope.guesses == 0){
            $scope.startGame = false;
        }
    }
})