import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms of Service — Giga Bot by Gignaati",
  description: "Terms of Service for Giga Bot, Gignaati's autonomous AI agent platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-16 px-6">
        <div className="container max-w-3xl">
          <h1 className="mb-2">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: March 2025</p>

          <div className="prose prose-gray max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
              <p>
                By installing, accessing, or using Giga Bot (&quot;the Software&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Software.
              </p>
              <p className="mt-3">
                Giga Bot is open-source software developed by <strong>Gignaati</strong> (<a href="https://www.gignaati.com" target="_blank" rel="noopener noreferrer">www.gignaati.com</a>) and distributed under the MIT License.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. License</h2>
              <p>
                Giga Bot is licensed under the <strong>MIT License</strong>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the following conditions:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                <li>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</li>
                <li>Attribution to Gignaati must be maintained in the user interface and documentation.</li>
              </ul>
              <p className="mt-3">
                THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Acceptable Use</h2>
              <p>You agree to use Giga Bot only for lawful purposes. You must not use the Software to:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                <li>Violate any applicable laws or regulations, including India&apos;s IT Act and data protection laws</li>
                <li>Generate, distribute, or store illegal, harmful, or offensive content</li>
                <li>Infringe upon the intellectual property rights of others</li>
                <li>Conduct unauthorized access to computer systems or networks</li>
                <li>Engage in any activity that disrupts or interferes with third-party services</li>
                <li>Use the Software to train AI models without proper attribution and compliance with upstream licenses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Your Responsibilities</h2>
              <p>As the operator of a self-hosted Giga Bot instance, you are solely responsible for:</p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                <li>Securing your infrastructure, API keys, and credentials</li>
                <li>Complying with the terms of service of all integrated third-party providers (GitHub, Anthropic, OpenAI, etc.)</li>
                <li>Ensuring compliance with applicable data protection and privacy laws in your jurisdiction</li>
                <li>Managing access controls and user permissions on your instance</li>
                <li>All actions taken by the AI agent on your behalf</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Disclaimer of Warranties</h2>
              <p>
                Giga Bot is provided &quot;as is&quot; without any warranties, express or implied. Gignaati does not warrant that the Software will be error-free, uninterrupted, or free of security vulnerabilities. You use the Software at your own risk.
              </p>
              <p className="mt-3">
                AI-generated outputs may be inaccurate, incomplete, or inappropriate. You are responsible for reviewing and validating all agent outputs before acting on them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Gignaati shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of Giga Bot.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">7. Third-Party Services</h2>
              <p>
                Giga Bot integrates with third-party services (GitHub, Anthropic, OpenAI, Telegram, etc.). Your use of these services is governed by their respective terms of service. Gignaati is not responsible for the availability, accuracy, or conduct of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">8. Intellectual Property</h2>
              <p>
                The Giga Bot name, logo, and Gignaati branding are trademarks of Gignaati. The underlying software is open-source under the MIT License. You may fork and modify the software, but you may not use the Gignaati or Giga Bot trademarks to represent your modified version without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">9. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Gurugram, Haryana, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">10. Changes to Terms</h2>
              <p>
                Gignaati reserves the right to modify these Terms of Service at any time. Changes will be reflected in the &quot;Last updated&quot; date. Continued use of the Software after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">11. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact:{" "}
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
