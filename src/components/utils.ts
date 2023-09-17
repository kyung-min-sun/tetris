/**
 * Shortens text over 20 characters with ellipsis
 * @param {string} text
 * @return {string}
 */
export function ellipsisOverflow(text: string): string {
  const shortenedText = text
      .substring(0, Math.min(text.length, 20));
  const isShortened = text && text.length > 20;
  const displayText =
    `${shortenedText ? shortenedText : ''}${isShortened ? '...': ''}`;
  return displayText;
}
