/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />
// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"
angular.module('myApp', []).controller('CommitController', function () {
    var commitUrl = "https://api.github.com/repos/Microsoft/TypeScript/commits?callback?";
    $.getJSON(commitUrl, function (data) {
        $('#commits').html(data.map(function (c) {
            return c.commit.message;
        }).join('<br>'));
    });
});
