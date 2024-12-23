import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 ">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <span className="ml-2 text-2xl font-bold">HD</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/sign-in" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-sm font-medium hover:underline underline-offset-4">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center ">
        <Image className='relative h-96 mx-auto bg-image w-full object-cover' src={'/image.png'} alt={'Background Image'} width={2000} height={1400} />
          <div className="absolute inset-auto text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
              Capture Your Thoughts with DH
            </h1>
            <p className="mx-auto max-w-[600px] text-xl text-white">
              Organize, collaborate, and bring your ideas to life with our intuitive note-taking app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/notes">
                <Button variant="outline" className="bg-transparent p-6 text-xl backdrop-blur font-bold text-white border-white hover:border hover:bg-white hover:text-blue-500">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
      </main>
      <footer className="py-4 text-center text-blue-700 text-sm">
        © 2024 DH Note-Taking App. Actually no rights reserved.
      </footer>
    </div>
  )
}

