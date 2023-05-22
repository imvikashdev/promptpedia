'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import Form from '@components/Form';
import { PostDto } from '@utils/Types';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<PostDto>({ prompt: '', tag: '' });
  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {};
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
