import { Github, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export const SocialIcons = () => {
    return (
        <div className="absolute w-fit bottom-0 left-12 gap-2 z-100 flex flex-col-reverse items-center justify-center">
            <div className="w-1 h-12 bg-red-900 rounded-lg"></div>

            <Link href="https://github.com/yourusername" className="p-2 bg-zinc-600 rounded-full">
                <Github className="size-6" />
            </Link>
            <Link href="https://x.com/yourusername" className="p-2 bg-red-600 rounded-full">
                <Twitter className="size-6" />
            </Link>
            <Link href="https://www.instagram.com/yourusername" className="p-2 bg-purple-600 rounded-full">
                <Instagram className="size-6" />
            </Link>
            <Link href="https://www.linkedin.com/in/yourusername" className="p-2 bg-blue-600 rounded-full">
                <Linkedin className="size-6" />
            </Link>
        </div>
    )
}