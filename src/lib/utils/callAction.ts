import { unstable_rethrow } from 'next/navigation';

import { ERROR_MESSAGES } from '../constants/messages';

export interface ActionTransportFailure {
  success: false;
  error: string;
}

/**
 * Calls a Server Action from a client event handler.
 *
 * Actions catch their own errors and return `{ success: false }`, but the POST
 * behind the action can still fail — offline, a deploy mid-request, a proxy
 * answering with HTML, a body over the action size limit. That rejection used
 * to escape the transition and replace the whole page with Next's error
 * screen; here it becomes an ordinary failure result the form can show.
 *
 * Router errors are rethrown: a redirect from an action (sign-in, sign-up)
 * deliberately rejects the client promise while Next performs the navigation.
 */
export async function callAction<T>(
  action: () => Promise<T>,
): Promise<T | ActionTransportFailure> {
  try {
    return await action();
  } catch (error) {
    unstable_rethrow(error);
    console.error('[callAction]', error);
    return { success: false, error: ERROR_MESSAGES.NETWORK };
  }
}
