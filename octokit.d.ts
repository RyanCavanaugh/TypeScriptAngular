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
    author: {
        login: string;
    };
}

interface UserData {
    data: UserInfo;
}

interface UserInfo {
    login: string;
    avatar_url: string;
    name: string;
    company: string;
    location: string;
}
