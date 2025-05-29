import type { Metadata } from "next"
import { Users, MessageCircle, Heart, Share2, TrendingUp, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Community - BetterU",
  description: "Connect with others, share your progress, and stay motivated together in the BetterU community.",
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001a1a] to-black opacity-70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Connect with like-minded individuals, share your journey, and achieve your goals together
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Users className="w-12 h-12 text-[#00f2fe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Share Workouts</h3>
              <p className="text-gray-400">
                Post your workout sessions and inspire others with your progress and achievements.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <TrendingUp className="w-12 h-12 text-[#00f2fe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Track Runs</h3>
              <p className="text-gray-400">
                Share your running achievements and connect with fellow runners in the community.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Calendar className="w-12 h-12 text-[#00f2fe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Mental Sessions</h3>
              <p className="text-gray-400">
                Share mindfulness practices and mental wellness journeys with supportive community members.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Heart className="w-12 h-12 text-[#00f2fe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Like & Support</h3>
              <p className="text-gray-400">
                Show appreciation for others' achievements and receive encouragement for your own progress.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <MessageCircle className="w-12 h-12 text-[#00f2fe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Comment & Engage</h3>
              <p className="text-gray-400">
                Engage in meaningful conversations and provide support to fellow community members.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <Share2 className="w-12 h-12 text-[#00f2fe] mb-4" />
              <h3 className="text-xl font-bold mb-2">Share Progress</h3>
              <p className="text-gray-400">
                Celebrate milestones and transformations with a supportive community that cheers you on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#00f2fe]/10 to-[#00b4ff]/10 rounded-2xl p-12 border border-[#00f2fe]/20">
            <h2 className="text-3xl font-bold mb-4">Community Features Coming Soon</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We're building an amazing community experience where you can connect, share, and grow together. Join our
              beta to be among the first to experience these features.
            </p>
            <button className="bg-gradient-to-r from-[#00f2fe] to-[#00b4ff] text-black font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">
              Join iOS Beta
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
