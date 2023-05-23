'use client';
import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { PromptDto } from '@utils/Types';

declare type PromptCardListProps = {
  data: PromptDto[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  console.log(data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [prompts, setPrompts] = useState<PromptDto[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data: PromptDto[] = await response.json();
      setPrompts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
