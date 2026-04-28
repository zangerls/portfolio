import Image from "next/image"
import { IconArrowUpRight } from "@tabler/icons-react"
import { Container } from "./container"
import { CursorDrivenParticleTypography } from "./ui/cursor-driven-particle-typography"
import { getTranslations } from "next-intl/server"

type ContactPoint = {
  name: string
  image: {
    src: string
    alt: string
  }
  href?: string
}

export async function Contact() {
  const t = await getTranslations("Contact")
  const contactPoints: ContactPoint[] = [
    {
      name: t("contactPoints.github"),
      href: "https://github.com/zangerls",
      image: {
        src: "/github.svg",
        alt: `${t("contactPoints.github")} Logo`,
      },
    },
    {
      name: t("contactPoints.linkedIn"),
      href: "https://www.linkedin.com/in/szangerl/",
      image: {
        src: "/linkedin.webp",
        alt: `${t("contactPoints.linkedIn")} Logo`,
      },
    },
    {
      name: t("contactPoints.location"),
      image: {
        src: "/map-pin.svg",
        alt: t("contactPoints.location"),
      },
    },
  ]

  return (
    <section
      id="get-in-touch"
      aria-label={t("title")}
      className="w-full border-t"
    >
      <Container>
        <div className="grid grid-cols-1 divide-y border-x md:h-[50vh] md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="col-span-1 flex items-center justify-center p-6 py-12 md:p-10">
            <div className="relative w-full">
              <h2 className="sr-only">{t("title")}</h2>
              <CursorDrivenParticleTypography
                text={t("title").toUpperCase()}
                particleDensity={2}
                particleSize={1}
                fontSize={70}
              />
            </div>
          </div>
          <div className="group col-span-1 flex flex-col justify-center p-6 py-12 md:p-10">
            {contactPoints.map((c) => {
              const content = (
                <>
                  <Image
                    src={c.image.src}
                    height={32}
                    width={32}
                    alt={c.image.alt}
                    aria-hidden="true"
                    className="invert dark:invert-0"
                  />
                  <span className="text-2xl sm:text-3xl">{c.name}</span>
                  {c.href && (
                    <IconArrowUpRight
                      size="2rem"
                      className="opacity-0 transition-opacity [.contact-item:hover_&]:opacity-100"
                    />
                  )}
                </>
              )

              const baseClasses =
                "contact-item flex items-center gap-4 transition-all group-has-[.contact-item:hover]:opacity-20 hover:!opacity-100 py-2 lg:py-3"

              if (c.href) {
                return (
                  <a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={baseClasses}
                  >
                    {content}
                  </a>
                )
              }

              return (
                <div key={c.name} className={baseClasses}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
