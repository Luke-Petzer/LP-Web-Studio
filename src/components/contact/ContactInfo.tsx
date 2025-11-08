import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from 'lucide-react';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
export function ContactInfo() {
  const infoRef = useAnimateOnScroll<HTMLDivElement>();
  return <div ref={infoRef} className="lg:pr-8">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
        <p className="text-lg text-gray-600 mb-8">
          I'm based in Cape Town, South Africa and available for freelance
          projects, consultations, and collaborations. Feel free to reach out
          through any of the following channels:
        </p>
      </div>
      <div className="space-y-6">
        <ContactInfoItem icon={<MapPinIcon size={24} className="text-orange-500" />} title="Location" content="Cape Town, South Africa" />
        <ContactInfoItem icon={<PhoneIcon size={24} className="text-orange-500" />} title="Phone" content="(067) 385-2286" link="tel:0673852286" />
        <ContactInfoItem icon={<MailIcon size={24} className="text-orange-500" />} title="Email" content="contact@lpwebstudio.co.za" link="mailto:contact@lpwebstudio.co.za" />
        <ContactInfoItem icon={<ClockIcon size={24} className="text-orange-500" />} title="Working Hours" content="Monday - Friday: 9am - 5pm" />
      </div>
      <div className="mt-12 bg-slate-50 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Quick Response Guarantee</h3>
        <p className="text-gray-600">
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
  return <div className="flex items-start">
      <div className="mr-4 mt-1 p-2 bg-orange-100 rounded-full">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {link ? <a href={link} className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
            {content}
          </a> : <p className="text-gray-600">{content}</p>}
      </div>
    </div>;
}