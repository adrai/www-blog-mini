import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

const baseUrl = 'https://my-mini-blog-test.com'
const distDir = './dist/client'
const currentDate = new Date().toISOString()

// Route priority mapping
const routePriorities = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  // '/docs': { priority: '0.8', changefreq: 'weekly' },
  '/blog': { priority: '0.7', changefreq: 'weekly' },
  '/blog/*': { priority: '0.6', changefreq: 'monthly' }, // Blog posts
}

function scanDirectory (dir, basePath = '') {
  const routes = []

  try {
    const items = readdirSync(dir)

    for (const item of items) {
      const fullPath = join(dir, item)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        // Skip certain directories
        if (['assets', '_vike', 'img', 'css', 'js', 'fonts', '_worker.js'].includes(item)) {
          continue
        }

        const routePath = basePath + '/' + item

        // Check if directory has an index.html
        const indexPath = join(fullPath, 'index.html')
        try {
          statSync(indexPath)
          routes.push(routePath === '/index' ? '/' : routePath)
        } catch {
          // No index.html, continue scanning subdirectories
        }

        // Recursively scan subdirectories
        routes.push(...scanDirectory(fullPath, routePath))
      } else if (item === 'index.html' && basePath === '') {
        // Root index.html
        routes.push('/')
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dir}:`, error.message)
  }

  return routes
}

function generateSitemap () {
  console.log('🔍 Scanning dist/client directory for routes...')

  // Check if dist/client exists
  try {
    statSync(distDir)
  // eslint-disable-next-line no-unused-vars
  } catch (e) {
    console.error(`❌ Error: ${distDir} directory not found. Please run 'npm run build' first.`)
    process.exit(1)
  }

  const routes = scanDirectory(distDir)

  // Remove duplicates and sort
  const uniqueRoutes = [...new Set(routes)].sort()

  console.log(`📄 Found ${uniqueRoutes.length} routes:`)
  uniqueRoutes.forEach(route => console.log(`  ${route}`))

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes.map(route => {
  const config = routePriorities[route] || { priority: '0.5', changefreq: 'monthly' }
  return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>`
}).join('\n')}
</urlset>`

  const sitemapPath = join(distDir, 'sitemap.xml')
  writeFileSync(sitemapPath, sitemap)
  console.log(`✅ Sitemap generated successfully at ${sitemapPath}`)
  console.log(`🌐 Available at: ${baseUrl}/sitemap.xml`)
}

generateSitemap()
