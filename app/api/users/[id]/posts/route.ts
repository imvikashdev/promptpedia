import Prompt from '@models/prompt';
import { connectToDatabase } from '@utils/database';

declare type ParamType = {
  id: string;
};

export const GET = async (req: Request, { params }: { params: ParamType }) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      'creator',
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
