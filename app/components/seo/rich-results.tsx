interface RichResultsProps {
  type: "Organization" | "Product" | "Article" | "FAQPage" | "WebSite" | "SoftwareApplication"
  data: Record<string, any>
}

export function RichResults({ type, data }: RichResultsProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
