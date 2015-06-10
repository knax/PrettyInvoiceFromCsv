/* global angular */
// Code goes here

var app = angular.module('Main', []);

app.controller('MainController', function ($scope) {

  $scope.parse = function () {
    var reader = new FileReader();
    var csvFile = angular.element('input#csvFile')[0].files[0];

    reader.onload = function (onLoadEvent) {
      $scope.$apply(function () {

        var lines = onLoadEvent.target.result.replace(/\r\n|\r/g, '\n').replace(/,,,/g, '');

        var content = {
          csv: lines,
          separator: ','
        };

        $scope.content = content.csv;
        $scope.pages = csvToJSON(content);
        
        console.log($scope.pages);
        
        angular.element('#input').addClass('hidden');
        angular.element('#pages').removeClass('hidden');

      });
    };

    reader.readAsText(csvFile);
    
    
  };

  var csvToJSON = function (content) {
    var lines = content.csv.split('\n');
    var result = [];
    var columnCount = lines[0].split(content.separator).length;

    var headers = [];

    headers = lines[0].split(content.separator);

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(new RegExp(content.separator + '(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));

      if (currentline.length === columnCount) {
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j].replace(/"/g, '');
        }
        result.push(obj);
      }
    }
    return result;
  };
  
  angular.element('#pages').addClass('hidden');
})