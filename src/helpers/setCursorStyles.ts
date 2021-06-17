import { Element, Options } from "../types";
import appendStyleBlock from './appendStyleBlock';

export const cursorFontStyles = [
  'font-family',
  'font-weight',
  'font-size',
  'font-style',
  'line-height',
  'color'
] as const;

export const setCursorStyles = (id: string, options: Options, element: Element) => {
  let rootSelector = `[data-typeit-id='${id}']`;
  let cursorSelector = `${rootSelector} .ti-cursor`;
  let computedStyles = getComputedStyle(element);

  let customProperties = cursorFontStyles.reduce((accumulator, item: typeof cursorFontStyles[number]) => {
    return `${accumulator} ${item}: var(--ti-${item}, ${computedStyles[item]});`;
  }, '');

  // Set animation styles & custom properties.
  appendStyleBlock(
    `@keyframes blink-${id} { 0% {opacity: 0} 49% {opacity: 0} 50% {opacity: 1} } ${cursorSelector} { display: inline; ${customProperties} animation: blink-${id} ${options.cursorSpeed / 1000}s infinite; } ${cursorSelector}.with-delay { animation-delay: 500ms; } ${cursorSelector}.disabled { animation: none; }`,
    id
  );
}
