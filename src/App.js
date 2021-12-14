import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);

			const res = await axios.get('https://jsonplaceholder.typicode.com/posts');

			setPosts(res.data);
			setLoading(false);
		};

		fetchPosts();
	}, []);

	// Get current page posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPsgePosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className='container'>
			<h3 className='text-primary mt-5 mb-4'>My Blog</h3>
			<Posts posts={currentPsgePosts} loading={loading} />
			<Pagination
				postPerPage={postsPerPage}
				totalPosts={posts.length}
				paginate={paginate}
			/>
		</div>
	);
};

export default App;
