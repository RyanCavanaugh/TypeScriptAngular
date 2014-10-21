/// <reference path="jquery.d.ts" />

// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"

$(() => {
    var commitUrl = "https://api.github.com/repos/Microsoft/TypeScript/commits?callback?";
    $.getJSON(commitUrl, (data) => {
        $('#commits').html(JSON.stringify(data));
    });
});
