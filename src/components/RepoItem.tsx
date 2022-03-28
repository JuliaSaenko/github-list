import React from 'react';
import { StarIcon } from '@heroicons/react/outline';

type Owner = {
    html_url: string;
    login: string;
    avatar_url: string;
};

export type Repository = {
    id?: number;
    html_url: string;
    name: string;
    stargazers_count: number;
    description: string | null;
    owner: Owner;
};

function RepoItem({ html_url, name, stargazers_count, description, owner }: Repository) {
    return (
        <li className="pt-2 pb-4 border-dashed border-b-2 border-indigo-600">
            <div className="flex items-baseline mb-1">
                <a className="text-indigo-600 text-xl hover:text-indigo-900 font-bold pr-4" href={html_url}>
                    {name}
                </a>
                <p className="flex items-center">
                    <span className="mr-2 text-sm text-gray">{stargazers_count}</span>
                    <StarIcon width={16} height={16} />{' '}
                </p>
            </div>
            <div className="flex flex-wrap items-baseline">
                <p className="w-full text-gray-600 text-md mb-2">
                    {description ? description : 'No additional information'}
                </p>
                <a className="flex items-center" href={owner.html_url}>
                    <img
                        className="mr-1"
                        src={owner.avatar_url}
                        width={24}
                        height={24}
                        alt={'Avatar of ' + owner.login}
                    />
                    {owner.login}
                </a>
            </div>
        </li>
    );
}

export default RepoItem;
