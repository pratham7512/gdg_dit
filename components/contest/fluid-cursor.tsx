"use client";
import { useEffect } from "react";

import fluidCursor from "@/hooks/fluidCursor";

const FluidCursor = () => {

  useEffect(() => {
    fluidCursor();
  }, [])


  return (
    <div className='absolute inset-0 z-[-10] md:z-0'>
      <canvas id="fluid" className='w-screen h-screen' />
    </div>
  );
};
export default FluidCursor;
