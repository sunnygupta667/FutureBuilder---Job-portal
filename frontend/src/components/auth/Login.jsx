import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) navigate("/");
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] transition-colors">
            <Navbar />
            <div className="flex items-center justify-center px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full sm:w-[500px] bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-6 my-16 space-y-5 transition-all"
                >
                    <h1 className="font-bold text-2xl text-gray-800 dark:text-white text-center">Login</h1>

                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label className="text-gray-700 dark:text-gray-300">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="mt-1"
                        />
                    </div>

                    <div className="mt-4">
                        <Label className="text-gray-700 dark:text-gray-300 block mb-2">Role</Label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                Student
                            </label>
                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                Recruiter
                            </label>
                        </div>
                    </div>

                    <div>
                        {loading ? (
                            <Button className="w-full" disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        )}
                    </div>

                    <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 dark:text-blue-400 underline">
                            Signup
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
