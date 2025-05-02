import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-5 rounded-xl shadow-md bg-white dark:bg-[#1e1e2f] border border-gray-100 dark:border-gray-700 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        >
            <div className="mb-2">
                <h1 className="font-semibold text-lg text-gray-800 dark:text-white">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
            </div>

            <div className="my-3">
                <h1 className="font-bold text-xl text-[#6A38C2] dark:text-purple-400">{job?.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {job?.description}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 dark:text-blue-300 font-semibold" variant="ghost">
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge className="text-[#F83002] dark:text-red-400 font-semibold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] dark:text-purple-300 font-semibold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
