export function TestimonialsSection() {
  return <section className="py-16 md:py-20 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            What clients say about working with LP Web Studio.
          </p>
        </div>
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8 border border-slate-100">
          <div className="text-center py-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              We’re currently working on exciting projects with small businesses — testimonials coming soon!
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              We're in the process of gathering feedback from our amazing clients. Stay tuned to see their thoughts on our collaboration!
            </p>
            <div className="flex justify-center space-x-2">
              {[...Array(3)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-orange-300"></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
}