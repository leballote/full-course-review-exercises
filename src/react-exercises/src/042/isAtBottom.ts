export default function isAtBottom(element: HTMLElement) {
  return (
    Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <
    1
  );
}
