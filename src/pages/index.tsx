import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../redux/effects/Posts';
import { Post } from '../redux/interfaces/Post';
import { AppState } from '../redux/store';

import { getShifts } from '../redux/effects/Shifts';
import { Shift } from '../redux/interfaces/Shift';

export default function Posts() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
		dispatch(getShifts());
	}, [dispatch]);
	const posts = useSelector((state: AppState) => state.posts);

	const shifts = useSelector((state: AppState) => state.shifts);

	console.log('shift', shifts)

	const shiftItems = shifts.shifts.map((post: Shift) => (
		<div style={{textAlign:"left"}} key={post.shiftId}>
			<h1>{post.name}</h1>
			<p>{post.date}</p>
			<p>{post.startTime}</p>
			<p>{post.endTime}</p>
		</div>
	));

	const postItems = posts.posts.map((post: Post) => (
		<div key={post.id}>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	));
	return <div>{shiftItems}</div>;
}