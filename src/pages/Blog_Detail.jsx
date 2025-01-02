import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Blog_Detail = () => {
    // const [blog, setBlog] = useState(null);
    // const { id } = useParams();
    const location = useLocation();
    const blog = location.state?.blog; // Access the blog post object from the URL state


    // const fetchBlog = async () => {
    //     try {
    //         // const response = await axios.get(
    //         //     `https://newsapi.org/v2/top-headlines?country=us&apiKey=b3d2f387bb514c2e80b6b706e5fb67c9`
    //         // );
    //         // // Find the blog post by index (since NewsAPI doesn't support fetching by ID)
    //         // const selectedBlog = response.data.articles[id];
    //         // // setBlog(selectedBlog);
    //         // setBlog(state.blog);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    //     fetchBlog();
    // }, [state]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-semibold text-gray-400">Fetching Blog...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="bg-black">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-white mb-6">
                        {blog.title}
                    </h1>

                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                        <img
                            src={blog.urlToImage || "https://via.placeholder.com/150"} // Fallback image
                            alt={blog.title}
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h3 className="font-semibold text-white">{blog.author || "Unknown Author"}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cover Image */}
            {blog.urlToImage && (
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <img
                        src={blog.urlToImage}
                        alt={blog.title}
                        className="w-full rounded-xl shadow-lg"
                    />
                </div>
            )}

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <p className="text-gray-300">{blog.description}</p>
                <p className="text-gray-300 mt-4">{blog.content}</p>

                {/* Additional Meta */}
                <div className="mt-12 pt-5 border-t border-gray-700">
                    <div className="flex justify-end flex-wrap gap-4 text-sm text-gray-400">
                        <span>Published on: {new Date(blog.publishedAt).toLocaleDateString()}</span>
                        <Link
                            to={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-300 hover:underline"
                        >
                            View original
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Blog_Detail;