'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';
import { PromptDto } from '@utils/Types';

const page = () => {
  const [posts, setPosts] = useState<PromptDto[]>([]);
  const { data: session } = useSession();
  const handleEdit = () => {};
  const handleDelete = async () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data: PromptDto[] = await response.json();
      setPosts(data);
    };
    if (session?.user?.id) fetchPosts();
  }, [session?.user?.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
