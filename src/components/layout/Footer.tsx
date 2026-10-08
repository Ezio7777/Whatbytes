import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const socials = [
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { name: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
];

const linkClass =
  "w-fit text-[15px] text-white/90 transition-all duration-200 hover:translate-x-0.5 hover:text-white";

export function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="container-page py-10 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          <div>
            <h3 className="text-xl font-semibold">Filters</h3>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/?category=all" className={linkClass}>
                All
              </Link>
              <Link href="/?category=electronics" className={linkClass}>
                Electronics
              </Link>
              <Link href="/?category=clothing" className={linkClass}>
                Clothing
              </Link>
              <Link href="/?category=home" className={linkClass}>
                Home
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">About Us</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/" className={linkClass}>
                About Us
              </Link>
              <Link href="/" className={linkClass}>
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-lg"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-[15px] text-white/90">© 2024 American</p>
      </div>
    </footer>
  );
}
