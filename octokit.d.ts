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
        };
        html_url: string;
    }[];
}
