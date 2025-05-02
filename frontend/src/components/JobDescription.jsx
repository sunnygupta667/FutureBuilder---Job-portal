import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const alreadyApplied = res.data.job.applications.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(alreadyApplied);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [jobId, dispatch, user?._id]);

  const handleApply = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }],
          })
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  if (!singleJob) return null;

  return (
    <div className="bg-white dark:bg-[#0f172a] min-h-screen py-10 px-4 md:px-8 lg:px-16">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          ← Go Back
        </Button>
        <Button
          onClick={!isApplied ? handleApply : null}
          disabled={isApplied}
          className={`${
            isApplied
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } px-6 py-2 rounded-md transition`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Job Title & Details */}
      <div className="bg-gray-100 dark:bg-slate-800 rounded-xl p-6 shadow-md mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">{singleJob.title}</h1>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {singleJob.postion} Position
          </Badge>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {singleJob.jobType}
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            {singleJob.salary} LPA
          </Badge>
        </div>
      </div>

      {/* Detailed Info Section */}
      <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-6 shadow space-y-4">
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
          <div>
            <p className="font-medium">📍 Location:</p>
            <p>{singleJob.location}</p>
          </div>
          <div>
            <p className="font-medium">🧠 Experience:</p>
            <p>{singleJob.experience} years</p>
          </div>
          <div>
            <p className="font-medium">💰 Salary:</p>
            <p>{singleJob.salary} LPA</p>
          </div>
          <div>
            <p className="font-medium">🗓️ Posted On:</p>
            <p>{singleJob.createdAt?.split('T')[0]}</p>
          </div>
          <div>
            <p className="font-medium">👥 Total Applicants:</p>
            <p>{singleJob.applications?.length}</p>
          </div>
        </div>

        <div>
          <p className="font-medium mb-1 text-gray-800 dark:text-gray-100">📝 Job Description:</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{singleJob.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
