import type { SupportedLanguage } from '../lib/i18n'

interface BaseHtmlProps {
  children: string
  title?: string
  lang: SupportedLanguage
  seoTags?: string
}

export function BaseHtml({ children, title = 'Elysia App', lang, seoTags }: BaseHtmlProps): string {
  return `
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="/public/css/main.css" />
        ${seoTags || ''}
      </head>
      <body>
        ${children}
      </body>
    </html>
  `
}