import { auth } from 'gigabot/auth';
import { CodePage } from 'gigabot/code';

export default async function CodeRoute({ params }) {
  const session = await auth();
  // Next.js 15: params is synchronous — no await needed
  const { codeWorkspaceId } = params;
  return <CodePage session={session} codeWorkspaceId={codeWorkspaceId} />;
}
