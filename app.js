/// <reference path="jquery.d.ts" />
/// <reference path="octokit.d.ts" />
// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"
$(function () {
    var commitUrl = "https://api.github.com/repos/Microsoft/TypeScript/commits?callback?";
    $.getJSON(commitUrl, function (data) {
        $('#commits').html(data.map(function (c) {
            return c.commit.message;
        }).join('<br>'));
    });
});
