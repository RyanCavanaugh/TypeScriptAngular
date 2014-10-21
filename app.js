/// <reference path="jquery.d.ts" />
// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"
$(function () {
    var commitUrl = "https://api.github.com/repos/Microsoft/TypeScript/commits?callback?";
    $.getJSON(commitUrl, function (data) {
        $('#commits').html(JSON.stringify(data));
    });
});
