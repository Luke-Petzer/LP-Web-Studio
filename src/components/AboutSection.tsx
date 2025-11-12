import { Button } from './ui/Button';
export function AboutSection() {
  return <section className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-x-hidden">
          <div className="relative max-w-sm mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/Me1.JPG"
                alt="Luke Petzer, founder of LP Web Studio, professional web developer from Cape Town specializing in responsive website design"
                className="w-full h-auto object-cover aspect-[3/4]"
                loading="eager"
                style={{ display: 'block' }}
              />
            </div>
            <div className="absolute w-12 h-12 md:w-24 md:h-24 -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-orange-500 rounded-full"></div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Meet the Founder</h2>
            <div className="space-y-4 text-lg">
              <p>
                Hi, I’m Luke Petzer — the developer behind LP Web Studio. I started this venture to help small businesses establish a professional online presence through clean, effective, and affordable web design.
              </p>
              <p>
                At LP Web Studio, I focus on usability, performance, and giving clients tools that make it easy for their customers to connect and convert.
              </p>
              <p>
                Every project is a collaboration — your goals, combined with my technical expertise, to build something that truly works for your business.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/contact" variant="outline">
                Let's Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
}