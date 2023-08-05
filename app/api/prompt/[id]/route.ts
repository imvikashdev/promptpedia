import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';

declare type ParamDto = {
  id: string;
};

export const GET = async (req: Request, { params }: { params: ParamDto }) => {
  try {
    await connectToDatabase();

    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response('Prompts not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (e) {
    return new Response(`Failed to fetch prompt by ${params.id}`, {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request, { params }: { params: ParamDto }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response('Prompts not found', { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    return new Response('Failed to update the prompt', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: ParamDto },
) => {
  try {
    await connectToDatabase();

    await Prompt.findByIdAndRemove(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (e) {
    return new Response('Failed to delete the prompts', { status: 500 });
  }
};
