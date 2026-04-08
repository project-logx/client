export type TagValue = string;

export interface TagInfo {
  val: TagValue;
  colorClass: string;
}

export interface StateTags {
  [category: string]: TagInfo;
}

export const CATEGORY_TAGS = {
  direction: [
    { val: 'Long', optClass: 'opt-long', stagClass: 'stag-profit' },
    { val: 'Short', optClass: 'opt-short', stagClass: 'stag-loss' },
  ],
  strategy: [
    { val: 'Breakout', optClass: 'opt-breakout', stagClass: 'stag-info' },
    { val: 'Pullback', optClass: 'opt-pullback', stagClass: 'stag-purple' },
    { val: 'Reversal', optClass: 'opt-reversal', stagClass: 'stag-warn' },
  ],
  market: [
    { val: 'Trending', optClass: 'opt-trending', stagClass: 'stag-profit' },
    { val: 'Range', optClass: 'opt-range', stagClass: 'stag-info' },
    { val: 'Expiry', optClass: 'opt-expiry', stagClass: 'stag-warn' },
    { val: 'News', optClass: 'opt-news', stagClass: 'stag-loss' },
  ],
  execution: [
    { val: 'Perfect', optClass: 'opt-perfect', stagClass: 'stag-profit' },
    { val: 'Mistimed', optClass: 'opt-mistimed', stagClass: 'stag-warn' },
    { val: 'Premature Exit', optClass: 'opt-premature', stagClass: 'stag-loss' },
    { val: 'Late Exit', optClass: 'opt-late', stagClass: 'stag-loss' },
  ],
  quality: [
    { val: 'A+', optClass: 'opt-aplus', stagClass: 'stag-profit' },
    { val: 'Followed Plan', optClass: 'opt-followed', stagClass: 'stag-info' },
    { val: 'Rule Break', optClass: 'opt-rulebreak', stagClass: 'stag-warn' },
    { val: 'Impulsive', optClass: 'opt-impulsive', stagClass: 'stag-loss' },
  ],
  outcome: [
    { val: 'Target Hit', optClass: 'opt-target', stagClass: 'stag-profit' },
    { val: 'Stop Hit', optClass: 'opt-stop', stagClass: 'stag-loss' },
    { val: 'Partial', optClass: 'opt-partial', stagClass: 'stag-warn' },
    { val: 'Time Exit', optClass: 'opt-timex', stagClass: 'stag-info' },
    { val: 'Manual', optClass: 'opt-manual', stagClass: 'stag-neutral' },
  ],
};
