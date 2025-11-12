import { useRouter } from 'next/router';
import { ShowcaseProject } from '../../src/pages/ShowcaseProject';

export default function ShowcaseProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <ShowcaseProject />;
}

