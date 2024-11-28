import Image from "next/image"
import Link from "next/link"
import {  Instagram, Linkedin, Mail, Phone } from 'lucide-react'
import GDSC from "../assets/GDSC-logo.svg";

export default function Component() {
  const socials = [
    { id: 1, title: "Instagram", url: "#", icon: Instagram },
    { id: 2, title: "LinkedIn", url: "#", icon: Linkedin },
    { id: 3, title: "WhatsApp", url: "https://chat.whatsapp.com/Jt2uFQ1vQf249FHpFCnPGh", icon: Phone },
    { id: 4, title: "Mail", url: "mailto:contactus@gdgdit.tech", icon: Mail },
  ]

  const links = {
    "Quick Links": [
      { title: "Leaderboard", href: "/leaderboard" },
      { title: "About Us", href: "/aboutus" },
      { title: "Upcoming Events", href: "/events" },
      { title: "Roadmaps", href: "/roadmap" },
    ],
    Resources: [
      { title: "Documentation", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Community", href: "#" },
      { title: "Contact", href: "mailto:contactus@gdgdit.tech" },
    ],
    Community: [
      { title: "Join whatsapp", href: "https://chat.whatsapp.com/Jt2uFQ1vQf249FHpFCnPGh" },
      { title: "Code of Conduct", href: "#" },
    ],
  }

  return (
    <footer className="w-full bg-black/90 text-white border-t border-white/10">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src={GDSC} alt="GDG DIT Logo" width={40} height={40} className="dark:invert" />
              <span className="text-xl font-semibold">GDG DIT</span>
            </div>
            <p className="text-sm text-gray-400">
            Google Developer Groups DIT. Building a community of developers.
            </p>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} GDG DIT. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="sr-only">{item.title}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}