import { SocialIcons } from "@/components/ui/social-icons";

export default function Home() {
  return (
    <div className="flex relative min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <SocialIcons />
      <div className="h-[300vh]"></div>
    </div>
  );
}