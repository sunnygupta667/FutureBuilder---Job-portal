import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Days ago
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="p-5 lg:p-7   rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      {/* Time & Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {daysAgo === 0 ? 'Posted Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mt-4">
        <Avatar className="h-14 w-14 border border-gray-300 dark:border-slate-600">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-4">
        <h1 className="text-xl font-bold">{job?.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{job?.description}</p>
      </div>

      {/* Badges for Job Position, Type, and Salary */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge
          variant="outline"
          className="border-blue-600 text-blue-700 dark:border-blue-400 dark:text-blue-300 font-medium"
        >
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge
          variant="outline"
          className="border-red-600 text-red-700 dark:border-red-400 dark:text-red-300 font-medium"
        >
          {job?.jobType}
        </Badge>
        <Badge
          variant="outline"
          className="border-purple-700 text-purple-800 dark:border-purple-400 dark:text-purple-300 font-medium"
        >
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons: Details & Save */}
      <div className="flex flex-wrap gap-3 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          View Details
        </Button>
        <Button className="bg-purple-700 hover:bg-purple-800 text-white transition-all">
          Save for Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
