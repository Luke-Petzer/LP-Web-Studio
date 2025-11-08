import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export function PageTransition({
  children
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);
  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };
  return <div key={location.pathname} className={`page-transition ${transitionStage}`} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>;
}