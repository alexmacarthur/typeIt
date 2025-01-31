import TypeIt from "./TypeIt";

export type Character = {
  node: El | null;
  content: string | Node;
};

export interface CursorAnimationOptions {
  frames?: AnimationKeyFrame[];
  options?: Partial<AnimationEffectTiming>;
}

export interface CursorOptions {
  autoPause?: boolean;
  autoPauseDelay?: number;
  animation?: CursorAnimationOptions;
}

export interface Options {
  breakLines?: boolean;
  cursorChar?: string;
  cursor?: CursorOptions | boolean;

  // @todo: Remove in next major release.
  cursorSpeed?: number;
  deleteSpeed?: null | number;
  html?: boolean;
  lifeLike?: boolean;
  loop?: boolean;
  loopDelay?: number | number[];

  // @todo Rename to something like "betweenStringDelay"
  nextStringDelay?: number | number[];
  speed?: number;
  startDelay?: number;
  startDelete?: boolean;
  strings?: string[] | string;
  waitUntilVisible?: boolean;
  beforeString?: (string: String, instance: TypeIt) => void | ((string: String, instance: TypeIt) => Promise<void>);
  afterString?: (string: String, instance: TypeIt) => void | ((string: String, instance: TypeIt) => Promise<void>);
  beforeStep?: (instance: TypeIt) => void | ((instance: TypeIt) => Promise<void>);
  afterStep?: (instance: TypeIt) => void | ((instance: TypeIt) => Promise<void>);
  afterComplete?: (instance: TypeIt) => void | ((instance: TypeIt) => Promise<void>);
}

export interface Statuses {
  started: boolean;
  completed: boolean;
  frozen: boolean;
  destroyed: boolean;
  firing: boolean;
}

export type ActionOpts = Options & {
  to?: Sides;
  instant?: boolean;
  delay?: number;
};

export type QueueItem = {
  done?: boolean;
  func?: () => any;
  delay?: number;
  char?: any;

  // A queue item that can be visibly 'typed' to the
  // screen, including those queued with ".type()" and ".break()"
  typeable?: boolean;

  deletable?: boolean;

  // An explicit indicator that a queue item should pause
  // the cursor animation during execution.
  cursorable?: boolean;

  // An item should pause the cursor of it's
  // EITHER "typeable," "cusorable," or "deleteable."
  shouldPauseCursor?: () => boolean;
};

export type QueueMapPair = [Symbol, QueueItem];

export type El = (HTMLElement | HTMLInputElement) & {
  originalParent?: HTMLElement;
};

// export type NewEl = (HTMLElement | HTMLInputElement) & { originalParent?: HTMLElement };

export type Sides = "START" | "END";
