export function calculateReadTimeFromContent (content, wordsPerMinute = 225) {
  if (!content || typeof content !== 'string') {
    return '5 min read'
  }

  // More sophisticated content cleaning
  const cleanContent = content
    // Remove frontmatter export block (more comprehensive)
    .replace(/export\s+const\s+frontmatter\s*=\s*\{[\s\S]*?\n\}/g, '')
    // Remove import statements
    .replace(/^import\s+.*$/gm, '')
    // Remove code blocks (``` and `` blocks) but count some words
    .replace(/```[\s\S]*?```/g, ' [CODE_BLOCK] ')
    .replace(/``[\s\S]*?``/g, ' [CODE_BLOCK] ')
    // Remove inline code but keep the text content
    .replace(/`([^`\n]+)`/g, '$1')
    // Remove markdown headers but keep the text
    .replace(/#{1,6}\s+/g, '')
    // Remove markdown formatting but keep the text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/__([^_]+)__/g, '$1') // Bold
    .replace(/_([^_]+)_/g, '$1') // Italic
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove list markers but keep content
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Remove blockquote markers but keep content
    .replace(/^\s*>\s+/gm, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim()

  // Count actual words
  const words = cleanContent
    .split(/\s+/)
    .filter(word => word.length > 0 && /[a-zA-Z0-9]/.test(word))

  const wordCount = words.length
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute))

  return `${minutes} min read`
}
