import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = () => {
        if (!query.trim()) return
        dispatch(setSearchedQuery(query.trim()))
        navigate("/browse")
    }

    return (
        <div className="text-center py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#F83002] font-semibold text-sm uppercase tracking-wide">
                    No. 1 Job Hunt Website
                </span>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                    Search, Apply & <br />
                    Get Your <span className="text-[#6A38C2] dark:text-purple-400">Dream Jobs</span>
                </h1>

                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
                    Discover thousands of opportunities across tech, marketing, design, and more. Your career starts here.
                </p>

                <div className="flex w-full max-w-2xl mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden bg-white dark:bg-gray-800">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream job..."
                        className="w-full px-5 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-none rounded-r-full bg-[#6A38C2] hover:bg-[#5930a5] dark:bg-purple-600 dark:hover:bg-purple-500"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
