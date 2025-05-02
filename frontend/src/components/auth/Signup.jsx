import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="min-h-screen  bg-gray-100 dark:bg-[#0f172a]  transition-colors duration-300">
            <Navbar />
            <div className="flex justify-center px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-lg border bg-white dark:bg-[#1e293b]  border-gray-200 dark:border-gray-700 shadow-lg rounded-md p-6 my-10"
                >
                    <h1 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">Create Account</h1>

                    {/* Full Name */}
                    <div className="mb-4">
                        <Label className="text-zinc-700 dark:text-zinc-200">Full Name</Label>
                        <Input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <Label className="text-zinc-700 dark:text-zinc-200">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="example@example.com"
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <Label className="text-zinc-700 dark:text-zinc-200">Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="1234567890"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <Label className="text-zinc-700 dark:text-zinc-200">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Role & File Upload */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <RadioGroup className="flex gap-6">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className="text-zinc-700 dark:text-zinc-200">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label className="text-zinc-700 dark:text-zinc-200">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex flex-col gap-1">
                            <Label className="text-zinc-700 dark:text-zinc-200">Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button disabled className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Signup
                        </Button>
                    )}

                    <p className="text-sm text-center text-zinc-600 dark:text-zinc-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
