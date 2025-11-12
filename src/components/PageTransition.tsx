import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export function PageTransition({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [displayPath, setDisplayPath] = useState(router.pathname);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (router.pathname !== displayPath) {
      setTransitionStage('fadeOut');
    }
  }, [router.pathname, displayPath]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayPath(router.pathname);
    }
  };

  return <div key={router.pathname} className={`page-transition ${transitionStage}`} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>;
}