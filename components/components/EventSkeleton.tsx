import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function EventSkeleton() {
  return (
    <div className="container mx-auto p-2 sm:p-4 backdrop-blur-lg bg-gradient from-[#28206C] to-[#28206C]/0 to-70% text-foreground my-4 sm:my-10">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 mx-2 sm:mx-4 lg:mx-20">
        <div className="flex-grow overflow-y-auto max-h-screen pb-4 sm:pb-8 lg:w-2/3 scrollbar-hidden sm:mx-2 lg:mx-10">
          <div className="w-full space-y-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4 sm:w-96" />
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>

          <Card className="mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mb-6 sm:mb-8 rounded-xl overflow-hidden">
            <Skeleton className="h-48 sm:h-64 w-full" />
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[...Array(4)].map((_, sectionIndex) => (
              <section key={sectionIndex}>
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <Skeleton className="h-6 w-40" />
                  <div className="flex-1 h-px bg-border" />
                </div>
                <Card className="bg-background/60 backdrop-blur">
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    {[...Array(3)].map((_, paragraphIndex) => (
                      <Skeleton key={paragraphIndex} className="h-4 w-full" />
                    ))}
                  </CardContent>
                </Card>
              </section>
            ))}

            <section>
              <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <Skeleton className="h-6 w-40" />
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full max-w-md" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, faqIndex) => (
                    <Skeleton key={faqIndex} className="h-12 w-full" />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-4">
            <div className="md:flex justify-center items-center w-full h-full p-[0.0525rem] rounded-[1.5rem] bg-n-6">
              <Card className="w-full h-full bg-black rounded-[1.4475rem] text-card-foreground">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {[...Array(3)].map((_, infoIndex) => (
                      <div key={infoIndex}>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full mt-6 sm:mt-8" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}