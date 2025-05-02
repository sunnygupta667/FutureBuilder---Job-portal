import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left text-gray-800 dark:text-white mb-8">
                <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
            </h1>

            {
                allJobs.length <= 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-20 text-lg">
                        🚫 No Job Available at the moment. Please check back later.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            allJobs.slice(0, 6).map((job) => (
                                <LatestJobCards key={job._id} job={job} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
};

export default LatestJobs;
