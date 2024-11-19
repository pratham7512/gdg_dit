"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CarouselEventSkeleton() {
  return (
    <div className="w-full h-full md:py-[5%] max-sm:py-[5%] bg-black">
      {/* Skeleton Carousel Section */}
      <div className="container mb-16 w-3/5">
        <Skeleton className="w-full h-[60vh] rounded-xl" />
      </div>

      {/* Skeleton Event Details Section */}
      <div className=" container md:pb-10 ">
        <div className="flex flex-col items-center space-y-4 mb-8 justify-center">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-10 w-[400px]" />
        </div>
        <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem] mx-10">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`md:flex rounded-xl bg-n-6`}
            >
              <Card className="w-full bg-n-8 ">
                <CardContent className="p-8 xl:p-15">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-8">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-6 w-[80px] rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="mt-8">
                    <Skeleton className="h-10 w-[100px]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}