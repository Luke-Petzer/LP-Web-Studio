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
      className="fixed bottom-6 right-6 z-50"
    >
      <img
        src="/whatsapp-logo.jpg"
        alt="Chat on WhatsApp"
        className="w-16 h-16 drop-shadow-lg hover:scale-105 transition-transform rounded-lg"
      />
    </a>
  );
}
