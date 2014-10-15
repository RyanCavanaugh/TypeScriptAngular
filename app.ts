/// <reference path="angular.d.ts" />

interface CommitData {
    data: {
        sha: string;
        commit: {
            author: {
                name: string;
                email: string;
                date: string;
            };
            message: string;
            html_url: string;
        };
    }[];
}

function jsonp(url: string) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

function acceptData(data: CommitData) {
    var descriptions: string[] = data.data.map(c => c.commit.message);
    document.getElementById('results').innerHTML = descriptions.join('<br>');
}

window.onload = function () {
    var url = 'https://api.github.com/repos/Microsoft/TypeScript/commits?callback=acceptData';
    jsonp(url);
}

