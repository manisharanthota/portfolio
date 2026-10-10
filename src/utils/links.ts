// Spread onto <a> tags: external URLs open in a new tab, internal links are left alone.
export function linkAttrs(href: string) {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
