"use client"
import { NotionRenderer } from "react-notion-x";
import Link from "next/link";
import dynamic from 'next/dynamic'
import { ExtendedRecordMap } from "notion-types";

import '@/lib/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'
import Image from "next/image";

function getRandomImageLink() {
  const imageLinks = [
      "https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1582561879360-b5f835317f05?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1584727638120-6819c82e954b?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=1917&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dq=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const randomIndex = Math.floor(Math.random() * imageLinks.length);
  return imageLinks[randomIndex];
}
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
)

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}
export const NotionPage = ({
  recordMap,
  rootPageId
}: NotionPageProps) => {
  if (!recordMap) {
    return null;
  }

  return (
    <div className="notion__container">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        disableHeader={true}
        rootPageId={rootPageId}
        previewImages
        defaultPageCover={getRandomImageLink()}
        components={{
          nextLink: Link,
          nextImage:Image,
           Code,
           Collection,
           Equation,
           Modal
        }}
      />
    </div>
  );
};
