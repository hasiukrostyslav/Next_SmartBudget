// What every transaction Server Action returns. `error` is always a sentence
// a person can read, so a form can show it as-is; per-field details, when there
// are any, are in `fieldErrors`.
export type ActionFailure = {
  success: false;
  status: number;
  error: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export type ActionSuccess<T> = {
  success: true;
  status: number;
  data: T;
};

export type ActionResult<T> = ActionSuccess<T> | ActionFailure;
