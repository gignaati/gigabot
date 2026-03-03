import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy — Giga Bot by Gignaati",
  description: "Privacy Policy for Giga Bot, Gignaati's autonomous AI agent platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16 px-6">
        <div className="container max-w-3xl">
          <h1 className="mb-2">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

          <div className="prose prose-gray max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
              <p>
                Giga Bot (&quot;the Software&quot;) is an open-source autonomous AI agent platform developed and maintained by{" "}
                <strong>Gignaati</strong> (<a href="https://www.gignaati.com" target="_blank" rel="noopener noreferrer">www.gignaati.com</a>).
                This Privacy Policy explains how Giga Bot handles data when you install and operate the software on your own infrastructure.
              </p>
              <p className="mt-3">
                Because Giga Bot is self-hosted software, <strong>you control your own data</strong>. Gignaati does not collect, store, or process any personal data from your Giga Bot instance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Data You Control</h2>
              <p>When you run Giga Bot on your infrastructure, the following data is stored <strong>locally on your systems</strong>:</p>
              <table className="w-full border-collapse border border-gray-200 text-sm mt-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Data Type</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Storage Location</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Chat messages</td>
                    <td className="border border-gray-200 px-4 py-2">Local SQLite database</td>
                    <td className="border border-gray-200 px-4 py-2">Conversation history</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">User accounts</td>
                    <td className="border border-gray-200 px-4 py-2">Local SQLite database</td>
                    <td className="border border-gray-200 px-4 py-2">Authentication</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">API keys &amp; secrets</td>
                    <td className="border border-gray-200 px-4 py-2">GitHub repository secrets / .env file</td>
                    <td className="border border-gray-200 px-4 py-2">LLM and service authentication</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2">Agent job logs</td>
                    <td className="border border-gray-200 px-4 py-2">GitHub Actions logs</td>
                    <td className="border border-gray-200 px-4 py-2">Audit trail and debugging</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2">Uploaded files</td>
                    <td className="border border-gray-200 px-4 py-2">Your server / GitHub repository</td>
                    <td className="border border-gray-200 px-4 py-2">Agent task context</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Third-Party Services</h2>
              <p>
                Giga Bot integrates with third-party services that you configure. Each service has its own privacy policy. You are responsible for reviewing and accepting their terms:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                <li><strong>GitHub</strong> — Repository hosting, Actions, and webhooks (<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement</a>)</li>
                <li><strong>Anthropic Claude</strong> — LLM provider (<a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic Privacy Policy</a>)</li>
                <li><strong>OpenAI</strong> — LLM provider (<a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">OpenAI Privacy Policy</a>)</li>
                <li><strong>Telegram</strong> — Optional messaging integration (<a href="https://telegram.org/privacy" target="_blank" rel="noopener noreferrer">Telegram Privacy Policy</a>)</li>
                <li><strong>ngrok</strong> — Optional local tunnel (<a href="https://ngrok.com/privacy" target="_blank" rel="noopener noreferrer">ngrok Privacy Policy</a>)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Data Security</h2>
              <p>
                Giga Bot includes several built-in security measures: API key authentication, webhook secret validation (fail-closed), session encryption, and secret filtering in the Docker agent. However, <strong>you are responsible for securing your own infrastructure</strong>.
              </p>
              <p className="mt-3">
                If you are running Giga Bot locally with a public tunnel (ngrok, Cloudflare Tunnel, or port forwarding), be aware that your server endpoints are publicly accessible. We strongly recommend enabling authentication and using HTTPS in production.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Data Retention</h2>
              <p>
                Since all data is stored on your own infrastructure, you have full control over data retention. You can delete chat history, user accounts, and job logs at any time by modifying your local database or GitHub repository.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Children&apos;s Privacy</h2>
              <p>
                Giga Bot is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be reflected in the &quot;Last updated&quot; date at the top of this page. Continued use of the software after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Contact</h2>
              <p>
                For privacy-related questions, please contact Gignaati at:{" "}
                <a href="mailto:support@gignaati.com">support@gignaati.com</a>
              </p>
              <p className="mt-2">
                <strong>Gignaati</strong><br />
                <a href="https://www.gignaati.com" target="_blank" rel="noopener noreferrer">www.gignaati.com</a>
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
