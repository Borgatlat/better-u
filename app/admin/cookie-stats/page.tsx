import { getCookieConsentStats, getPageViewStats } from "../../actions/cookie-analytics"

export default async function CookieStatsPage() {
  const consentStats = await getCookieConsentStats()
  const pageViewStats = await getPageViewStats()

  // Calculate percentages
  const preferencesPercentage =
    consentStats.total > 0 ? Math.round((consentStats.preferences / consentStats.total) * 100) : 0

  const analyticsPercentage =
    consentStats.total > 0 ? Math.round((consentStats.analytics / consentStats.total) * 100) : 0

  // Sort page views by count (descending)
  const sortedPageViews = Object.entries(pageViewStats).sort(
    ([, countA], [, countB]) => Number.parseInt(countB as string) - Number.parseInt(countA as string),
  )

  return (
    <div className="container max-w-4xl mx-auto px-4 py-24 mt-safe-top pt-14">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
        Cookie & Analytics Dashboard
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-black/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Cookie Consent Statistics</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Total Consent Decisions</p>
              <p className="text-2xl font-bold">{consentStats.total}</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-400">Preferences Cookies</p>
                <p className="text-sm text-gray-400">{preferencesPercentage}%</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-[#00f2fe] h-2.5 rounded-full" style={{ width: `${preferencesPercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{consentStats.preferences} users</p>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-gray-400">Analytics Cookies</p>
                <p className="text-sm text-gray-400">{analyticsPercentage}%</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-[#00f2fe] h-2.5 rounded-full" style={{ width: `${analyticsPercentage}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{consentStats.analytics} users</p>
            </div>
          </div>
        </div>

        <div className="bg-black/30 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Page View Statistics</h2>

          {sortedPageViews.length > 0 ? (
            <div className="space-y-3">
              {sortedPageViews.map(([path, count]) => (
                <div key={path} className="flex justify-between items-center">
                  <p className="text-sm truncate max-w-[70%]">{path}</p>
                  <p className="text-sm font-semibold bg-[#00f2fe]/10 text-[#00f2fe] px-2 py-1 rounded">
                    {count} views
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No page view data collected yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
