export declare type PostDto = {
  prompt: string;
  tag: string;
};

export declare type CreatorDto = {
  email: string;
  image: string;
  username: string;
  __v: number;
  _id: string;
};

export declare type PromptDto = {
  creator: CreatorDto;
  prompt: string;
  tag: string;
  __v: number;
  _id: string;
};
