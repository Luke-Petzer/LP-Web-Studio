import { useRouter } from 'next/router';
import { ProjectDetail } from '../../src/pages/ProjectDetail';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <ProjectDetail />;
}