import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CourseItem from './CourseItem';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CourseList() {
    const [courseList, setCourseList] = useState([]);
    const [filter, setFilter] = useState('all');
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search'); // Get search query from URL

    useEffect(() => {
        getAllCourses();
    }, [filter, searchQuery]); // Re-fetch courses when filter or search query changes

    const getAllCourses = async () => {
        const resp = await GlobalApi.getAllCourseList();
        const allCourses = resp?.courseLists || [];
        const filteredCourses = allCourses.filter(course => {
            if (filter === 'all') return true;
            if (filter === 'paid') return !course.free;
            if (filter === 'free') return course.free;
        });

        // If there is a search query, filter by course name or description
        const searchedCourses = searchQuery
            ? filteredCourses.filter(course => 
                course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase()))
            : filteredCourses;

        setCourseList(searchedCourses);
    }

    return (
        <div className='p-4 bg-white rounded-lg mt-5'>
            <div className='flex flex-col sm:flex-row items-center justify-between'>
                <h2 className='text-[20px] font-bold text-primary mb-3 sm:mb-0'>All Courses</h2>
                <Select onValueChange={(value) => setFilter(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {/* Display an error message if no courses are found */}
            {courseList.length === 0 ? (
                <div className='text-center mt-5 text-primary font-semibold'>
                    No courses found.
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {courseList.map((item, index) => (
                        <Link href={'/course-preview/' + item.slug} key={index}>
                            <div>
                                <CourseItem course={item} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CourseList;

