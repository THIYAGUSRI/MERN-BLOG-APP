import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../Components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className='max-w-6xl mx-auto p-3 py-7'>
      {posts && posts.length > 0 && (
        <div className='flex flex-col gap-6'>
          <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Link
            to={'/search'}
            className='text-lg text-teal-500 hover:underline text-center mt-4'
          >
            View all posts
          </Link>
        </div>
      )}
    </div>
  );
}
