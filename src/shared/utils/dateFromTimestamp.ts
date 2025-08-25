export function dateFromTimestamp(timestamp: Date | string, options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}): string {
  const date = new Date(timestamp);

  return date.toLocaleDateString('ru-RU', options);
}

export function timeFromTimestamp(timestamp: Date | string, options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
}): string {
  const date = new Date(timestamp);

  return date.toLocaleTimeString('ru-RU', options);
}
