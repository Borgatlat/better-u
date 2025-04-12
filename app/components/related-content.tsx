import Link from "next/link"

interface RelatedContentItem {
  title: string
  href: string
  description: string
}

interface RelatedContentProps {
  title?: string
  items: RelatedContentItem[]
}

export function RelatedContent({ title = "Related Content", items }: RelatedContentProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="block p-6 border border-gray-800 rounded-lg hover:border-[#00f2fe]/50 transition-colors"
          >
            <h3 className="font-medium mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
