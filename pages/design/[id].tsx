import { useRouter } from 'next/router';
import { DesignConcept } from '../../src/pages/DesignConcept';

export default function DesignConceptPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <DesignConcept />;
}
