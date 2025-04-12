interface Feature {
  title: string
  description: string
}

interface FeatureSectionProps {
  features: Feature[]
}

export function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-full flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
