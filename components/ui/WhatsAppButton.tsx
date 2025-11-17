// WhatsAppButton.tsx
const WHATSAPP_NUMBER = "27673852286"; // Correct format: country code + number without spaces or symbols
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I'm%20interested%20in%20your%20web%20design%20services.`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
      style={{
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }}
    >
      <img
        src="/whatsapp-logo.jpg"
        alt="Chat on WhatsApp"
        className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-lg hover:scale-105 transition-transform rounded-lg min-h-[44px] min-w-[44px]"
      />
    </a>
  );
}
