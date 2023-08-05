'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Profile from '@components/Profile';
import { PromptDto } from '@utils/Types';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PromptDto[]>([]);
  const { data: session } = useSession();
  const handleEdit = (post: PromptDto) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PromptDto) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?',
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'Delete',
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (e) {
        console.log(e);
      }
    }
  };

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
