import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem, { Repository } from './RepoItem';

function RepoList() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [searchTerm, setSearchTerm] = useState('react');
    const [delayError, setDelayError] = useState(false);

    useEffect(() => {
        axios
            .get<{ items: Repository[] }>(
                `https://api.github.com/search/repositories?q=/${searchTerm}&sort=stars&order=desc`
            )
            .then((response) => {
                const data = response.data.items;
                setRepositories(data);
            })
            .catch((err) => {
                if (err.response.status === 403) setDelayError(true);
            });
    }, [searchTerm]);

    return (
        <div className="container xl mx-auto py-10">
            <div className="mb-4 pb-4 border-solid border-b-2 border-indigo-600">
                <label className="text-gray-2xl font-bold block mb-4" htmlFor="repoSearch">
                    Search GitHub Repository:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-indigo-600 focus:shadow-outline"
                    id="repoSearch"
                    placeholder="e.g. React"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
            {delayError ? (
                <div className="text-xl text-indigo-600 text-bold">
                    GitHub allows limited number of request, please try again later :(
                </div>
            ) : (
                <ul className="repoList">
                    {repositories.map((repository) => {
                        return <RepoItem key={repository.id} {...repository} />;
                    })}
                </ul>
            )}
        </div>
    );
}

export default RepoList;
