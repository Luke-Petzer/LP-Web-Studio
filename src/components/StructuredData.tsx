import { Helmet } from 'react-helmet';
interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    city: string;
    region: string;
    country: string;
  };
  priceRange: string;
}
export function LocalBusinessStructuredData({
  business
}: {
  business: LocalBusinessData;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: business.name,
    description: business.description,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      addressCountry: business.address.country
    },
    priceRange: business.priceRange
  };
  return <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>;
}
export function WebsiteStructuredData({
  url
}: {
  url: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: url,
    name: 'LP Web Studio',
    description: 'Affordable websites for small businesses in Cape Town',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  return <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>;
}
export function PersonStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luke Petzer',
    jobTitle: 'Web Developer',
    description: 'Web developer specializing in affordable websites for small businesses in Cape Town',
    knowsAbout: ['Web Development', 'React', 'JavaScript', 'Responsive Design', 'SEO'],
    url: 'https://lpwebstudio.com'
  };
  return <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>;
}