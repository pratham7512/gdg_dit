import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CreateRoadmap with SSR disabled
const CreateRoadmap = dynamic(() => import('@/components/components/CreateRoadmap'), { ssr: false });

const Page = () => {
  return (
    <>
      <CreateRoadmap />
    </>
  );
};

export default Page;
