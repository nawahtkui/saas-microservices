import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout
      title="Nawah Platform"
      description="Nawah is a SaaS + Web3 platform for scalable systems and cultural empowerment."
    >
      <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Nawah Platform
        </h1>

        <p style={{ fontSize: '1.2rem', maxWidth: 700, margin: '0 auto 2rem' }}>
          A modern <strong>SaaS + Web3</strong> platform combining scalable
          microservices, secure authentication, and transparent tokenomics —
          inspired by cultural and social empowerment.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link
            className="button button--primary button--lg"
            to="/saas-microservices/docs"
          >
            📘 Documentation
          </Link>

          <Link
            className="button button--secondary button--lg"
            to="https://github.com/nawahtkui/saas-microservices"
          >
            💻 GitHub
          </Link>
        </div>
      </main>
    </Layout>
  );
}
