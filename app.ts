/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"

angular.module('myApp', []).controller('CommitController', () => {
    var commitUrl = "https://api.github.com/repos/Microsoft/TypeScript/commits?callback?";
    $.getJSON(commitUrl, (data: Octokit.Commit[]) => {
        $('#commits').html(data.map(c => c.commit.message).join('<br>'));
    });
});
