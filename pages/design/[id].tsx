import { useRouter } from 'next/router';
import { DesignConcept } from '../../src/pages/DesignConcept';
import { Layout } from '../../components/Layout';

export default function DesignConceptPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return (
    <Layout>
      <DesignConcept />
    </Layout>
  );
}
