<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:supabase-agent-rules -->
# Supabase CLI Cloud Deployment Authorization
When needing to deploy database schemas, Edge Functions, or Storage buckets to the Supabase Cloud project, do NOT ask the user to manually copy/paste scripts into the Supabase Dashboard.
Instead, make it an explicit rule to:
1. Instruct the user to physically run `npx supabase login` in their terminal and provide their Personal Access Token.
2. Instruct the user to run `npx supabase link --project-ref <their-project-id>` using their Database Password.
3. Once they explicitly authorise the terminal session, you (the AI) must autonomously harness the terminal tools to actively execute `npx supabase db push`, `npx supabase functions deploy`, etc., ensuring a seamless developer flow.
<!-- END:supabase-agent-rules -->
