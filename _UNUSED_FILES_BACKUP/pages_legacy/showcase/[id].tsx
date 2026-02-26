import { useRouter } from 'next/router';
import { ShowcaseProject } from '../../src/pages/ShowcaseProject';
import { Layout } from '../../components/Layout';

export default function ShowcaseProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return (
    <Layout>
      <ShowcaseProject />
    </Layout>
  );
}

