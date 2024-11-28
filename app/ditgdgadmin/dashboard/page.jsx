"use client";
import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import  AppSidebar  from '@/components/components/AppSidebar'


const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      
    </SidebarProvider>
  )
}

export default Page
