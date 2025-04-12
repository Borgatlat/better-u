interface LastUpdatedProps {
  date: string | Date
}

export function LastUpdated({ date }: LastUpdatedProps) {
  const formattedDate =
    typeof date === "string"
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })

  return <div className="text-sm text-gray-400 italic">Last updated: {formattedDate}</div>
}
