import React, { useEffect, useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Product Manager"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // Optional: Auto-scroll animation
    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto my-16 px-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Explore By Categories</h2>

            <div className="relative">
                <Carousel className="overflow-hidden" ref={carouselRef}>
                    <CarouselContent className="flex gap-4 transition-transform duration-300 ease-in-out">
                        {categories.map((cat, index) => (
                            <CarouselItem key={index} className="min-w-[200px] md:min-w-[250px] flex-shrink-0">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="w-full text-center py-3 rounded-full border border-gray-300 dark:border-gray-600 dark:text-white dark:bg-gray-800 hover:bg-[#6A38C2] hover:text-white transition-colors duration-300"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
                    <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10" />
                </Carousel>
            </div>
        </div>
    );
};

export default CategoryCarousel;
