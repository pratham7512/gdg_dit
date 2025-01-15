"use client";
import MaskedVideo from "@/components/ui/masked-video";
import mImage from "@/public/images/maskImage.jpg"
export default function MaskedVideoDemo() {
  return <MaskedVideo imageSrc={mImage} />;
}