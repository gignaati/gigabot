import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Security — Giga Bot by Gignaati",
  description: "Security practices and responsible disclosure for Giga Bot.",
};

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16 px-6">
        <div className="container max-w-3xl">
          <h1 className="mb-2">Security</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

          <div className="prose prose-gray max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-bold mb-3">Security Overview</h2>
              <p>
                Giga Bot is designed with security as a first-class concern. As a self-hosted platform, you have full control over your security posture. This page documents the built-in security features and best practices for operating Giga Bot safely.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Built-In Security Features</h2>
              <table className="w-full border-collapse border border-gray-200 text-sm mt-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Feature</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">API Key Authentication</td>
                    <td className="border border-gray-200 px-4 py-2">All API endpoints require a valid API key. Keys are stored as GitHub repository secrets.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium">Webhook Secret Validation</td>
                    <td className="border border-gray-200 px-4 py-2">Webhook payloads are validated using HMAC signatures. Invalid requests are rejected (fail-closed).</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">Session Encryption</td>
                    <td className="border border-gray-200 px-4 py-2">User sessions are encrypted using a randomly generated AUTH_SECRET.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium">Secret Filtering</td>
                    <td className="border border-gray-200 px-4 py-2">Secrets prefixed with AGENT_ are filtered from LLM context to prevent leakage.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium">Auto-Merge Path Restrictions</td>
                    <td className="border border-gray-200 px-4 py-2">Auto-merge is restricted to specific file paths to prevent unauthorized code changes.</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium">Docker Isolation</td>
                    <td className="border border-gray-200 px-4 py-2">Agent jobs run in isolated Docker containers on GitHub Actions, not on your server.</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Security Recommendations</h2>
              <p>To operate Giga Bot securely in production, follow these recommendations:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
                <li>Always use HTTPS in production. Use Let&apos;s Encrypt or a reverse proxy like Traefik.</li>
                <li>Keep your Node.js, Docker, and npm dependencies up to date.</li>
                <li>Rotate your AUTH_SECRET and API keys periodically using <code>npx gigabot reset-auth</code>.</li>
                <li>Review auto-merge ALLOWED_PATHS to restrict what the agent can modify automatically.</li>
                <li>Use a dedicated GitHub account or organization for your Giga Bot repository.</li>
                <li>Enable two-factor authentication on your GitHub account.</li>
                <li>If using ngrok for local development, be aware that your endpoints are publicly accessible.</li>
                <li>Regularly audit your GitHub Actions logs for unexpected behavior.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Responsible Disclosure</h2>
              <p>
                If you discover a security vulnerability in Giga Bot, please report it responsibly. Do not create a public GitHub issue for security vulnerabilities.
              </p>
              <p className="mt-3">
                Please report security issues to:{" "}
                <a href="mailto:support@gignaati.com">support@gignaati.com</a>
              </p>
              <p className="mt-3">
                Include in your report:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                <li>A description of the vulnerability</li>
                <li>Steps to reproduce the issue</li>
                <li>Potential impact assessment</li>
                <li>Any suggested mitigations</li>
              </ul>
              <p className="mt-3">
                We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Disclaimer</h2>
              <p>
                Giga Bot is provided as-is. While we implement security best practices, no software is completely free of vulnerabilities. You are responsible for securing your own infrastructure and for any consequences arising from the operation of your Giga Bot instance.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
