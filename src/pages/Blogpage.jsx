import { useCallback, useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import BoxPopup from "../components/BoxPopup";
import { motion } from "framer-motion";
import axios from "axios";
import Category from "../components/Category";

const Blogpage = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); // Track the selected blog post
    const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || 'devchallenge');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`https://dev.to/api/articles?tag=${selectedCategory}`, {
                    // params: {
                    //     tag: selectedCategory // Dev.to uses tags instead of categories
                    // }
                });
                setBlogPosts(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
    }, [selectedCategory]);

    const handleCardClick = useCallback((post) => {
        setSelectedPost(post); // Set the selected blog post
        console.log(post);
    }, []);

    return blogPosts.length === 0 ? <div className="text-2xl font-semibold text-center w-full flex justify-center items-center h-screen">Loading...</div> :
        <section className="h-auto max-w-[var(--maxWidth)] pt-12 flex items-center flex-col gap-10">
            <header className="text-5xl font-semibold flex flex-col items-center">Latest Articles
                <div className="text-[1rem] mt-2 font-normal text-gray-400 text-center">Get the latest articles from Dev.to.</div>
            </header>
            {/* Category Component */}
            <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            <motion.div className="flex flex-wrap gap-4 h-auto w-full justify-center">
                {
                    blogPosts.map((post, index) => {
                        return <BlogCard
                            isOdd={index % 2 === 1}
                            key={index}
                            index={index}
                            id={post.id}
                            image={post.cover_image || 'https://via.placeholder.com/300x200'}
                            title={post.title}
                            description={post.description}
                            readingTime={post.reading_time_minutes}
                            post={post}
                            isEven={index % 2 === 0}
                            onClick={() => handleCardClick(post)}
                        />
                    })
                }
            </motion.div>

            {/* Box to show in the bottom right corner */}
            <BoxPopup selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
        </section>
}

export default Blogpage;