import type { NextConfig } from 'next';

// Sent on every response. The CSP only restricts framing: a full script and
// style policy would need a nonce for the inline theme script and Next's own
// inline scripts, which is a separate change.
const securityHeaders = [
  // Nobody may frame the app (clickjacking on the sign-in and delete forms).
  { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
  { key: 'X-Frame-Options', value: 'DENY' },
  // Browsers only honour this over HTTPS; it is ignored on localhost.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains',
  },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
