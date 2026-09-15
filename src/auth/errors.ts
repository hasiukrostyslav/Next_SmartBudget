import { CredentialsSignin } from 'next-auth';

export const RATE_LIMITED = 'rate_limited';

// Thrown from a provider's authorize() when a rate limit is hit. Auth.js passes
// CredentialsSignin subclasses through unchanged, so the Server Action can tell
// "too many attempts" from "wrong password" by the code. On the Auth.js route
// the code ends up in the redirect's ?code=, which says nothing about the
// account.
export class RateLimitedSignIn extends CredentialsSignin {
  code = RATE_LIMITED;
}
