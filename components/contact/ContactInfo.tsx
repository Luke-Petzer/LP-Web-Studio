import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, Info } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
export function ContactInfo() {
  const infoRef = useAnimateOnScroll<HTMLDivElement>();
  return <div ref={infoRef} className="lg:pr-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-slate-800/40 backdrop-blur-sm border border-teal-200 dark:border-slate-700/50 text-sm text-teal-900 dark:text-slate-300 mb-6 transition-colors duration-300">
          <Info className="w-4 h-4 text-teal-500 dark:text-teal-400" />
          <span>Contact Details</span>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-50 transition-colors duration-300">Contact Information</h2>
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed transition-colors duration-300">
          I'm based in Cape Town, South Africa and available for freelance
          projects, consultations, and collaborations. Feel free to reach out
          through any of the following channels:
        </p>
      </div>

      <div className="space-y-6">
        <ContactInfoItem
          icon={<MapPinIcon size={24} className="text-orange-500" />}
          title="Location"
          content="Cape Town, South Africa"
        />
        <ContactInfoItem
          icon={<PhoneIcon size={24} className="text-teal-400" />}
          title="Phone"
          content="(067) 385-2286"
          link="tel:0673852286"
        />
        <ContactInfoItem
          icon={<MailIcon size={24} className="text-orange-500" />}
          title="Email"
          content="contact@lpwebstudio.co.za"
          link="mailto:contact@lpwebstudio.co.za"
        />
        <ContactInfoItem
          icon={<ClockIcon size={24} className="text-teal-400" />}
          title="Working Hours"
          content="Monday - Friday: 9am - 5pm"
        />
      </div>

      <div className="mt-12 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg hover:border-orange-500/50 transition-all duration-300">
        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100 transition-colors duration-300">Quick Response Guarantee</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
          I aim to respond to all inquiries within 48 hours during business
          days. Your project is important to me, and I'm committed to providing
          timely and professional communication throughout our collaboration.
        </p>
      </div>
    </div>;
}
interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
}
function ContactInfoItem({
  icon,
  title,
  content,
  link
}: ContactInfoItemProps) {
  return <div className="flex items-start bg-white/80 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-all duration-300">
      <div className="mr-4 mt-1 p-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl transition-colors duration-300">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300">{title}</h3>
        {link ? <a href={link} className="text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors duration-300">
            {content}
          </a> : <p className="text-slate-700 dark:text-slate-300 transition-colors duration-300">{content}</p>}
      </div>
    </div>;
}