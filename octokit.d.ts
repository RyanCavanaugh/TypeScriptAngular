interface CommitData {
    data: CommitInfo[];
}

interface CommitInfo {
    sha: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: string;
        };
        message: string;
    };
    html_url: string;
}