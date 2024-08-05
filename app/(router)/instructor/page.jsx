"use client";
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function InstructorPage() {
    const { user } = useUser();
    const [courseData, setCourseData] = useState({
        name: '',
        title: '',
        description: '',
        preview: '',
        banner: null,
        totalChapters: 0,
        free: true,
        chapter: '',
        tag: '',
        sourceCode: '',
        author: user?.fullName || '',
        youtubeUrl: '',
        demoUrl: '',
        slug: '',
        video: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setCourseData({ ...courseData, [name]: files[0] });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Perform API request to save course data
        try {
            const response = await GlobalApi.createCourse(courseData);
            if (response) {
                toast.success('Course uploaded successfully!');
            }
        } catch (error) {
            toast.error('Error uploading course.');
        }
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Upload a New Course</h1>
            <form onSubmit={handleFormSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div>
                    <label className="block mb-2 font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={courseData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={courseData.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Preview</label>
                    <textarea
                        name="preview"
                        value={courseData.preview}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Banner</label>
                    <input
                        type="file"
                        name="banner"
                        onChange={handleFileChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Total Chapters</label>
                    <input
                        type="number"
                        name="totalChapters"
                        value={courseData.totalChapters}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Is the course free?</label>
                    <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="free"
                                value={true}
                                checked={courseData.free}
                                onChange={() => setCourseData({ ...courseData, free: true })}
                            />
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="free"
                                value={false}
                                checked={!courseData.free}
                                onChange={() => setCourseData({ ...courseData, free: false })}
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Chapter</label>
                    <input
                        type="text"
                        name="chapter"
                        value={courseData.chapter}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Tag</label>
                    <input
                        type="text"
                        name="tag"
                        value={courseData.tag}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Source Code</label>
                    <input
                        type="text"
                        name="sourceCode"
                        value={courseData.sourceCode}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={courseData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">YouTube URL</label>
                    <input
                        type="text"
                        name="youtubeUrl"
                        value={courseData.youtubeUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Demo URL</label>
                    <input
                        type="text"
                        name="demoUrl"
                        value={courseData.demoUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Slug (Unique)</label>
                    <input
                        type="text"
                        name="slug"
                        value={courseData.slug}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Video</label>
                    <input
                        type="file"
                        name="video"
                        onChange={handleFileChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded"
                    />
                </div>

                <Button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default InstructorPage;
