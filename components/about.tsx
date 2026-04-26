"use client"

import Image from "next/image"
import { Container } from "./container"
import { Crosshair, type CrosshairProps } from "./crosshair"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"

type AboutCardProps = {
  label: string
  description: string
  image: {
    de: {
      src: string
      alt: string
    }
    en: {
      src: string
      alt: string
    }
  }
  crosshair?: CrosshairProps["position"]
  index: number
}

function AboutCard({
  label,
  description,
  image,
  crosshair,
  index,
}: AboutCardProps) {
  const locale = useLocale()
  const { theme } = useTheme()
  const num = index.toString().padStart(2, "0")

  return (
    <div className="group relative col-span-1">
      {crosshair && <Crosshair position={crosshair} />}

      <div className="flex flex-col gap-4 p-8 lg:hidden">
        <p className="font-heading text-xl font-semibold">{label}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <span className="self-end text-xl text-muted-foreground">{num}</span>
      </div>

      <div aria-hidden="true" className="relative hidden h-full lg:block">
        <span className="absolute right-3 bottom-3 z-2 text-xl text-muted-foreground transition-colors duration-300 group-hover:text-background">
          {num}
        </span>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 transition-opacity duration-300 group-hover:opacity-0">
          <Image
            src={image[locale].src}
            height={100}
            width={100}
            alt={image[locale].alt}
            className={cn(
              "h-[100px] w-auto",
              theme === "light" ? "invert" : ""
            )}
          />
          <p className="font-heading text-xl font-semibold">{label}</p>
        </div>

        <div className="absolute inset-0 overflow-hidden bg-foreground p-8 pb-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-heading text-xl font-semibold text-background">
            {label}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-background">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function About() {
  const t = useTranslations("About")
  const cards: AboutCardProps[] = [
    {
      label: t("sections.purist.title"),
      description: t("sections.purist.description"),
      image: {
        en: {
          src: "P.svg",
          alt: t("letterX", { char: "P" }),
        },
        de: {
          src: "P.svg",
          alt: t("letterX", { char: "P" }),
        },
      },

      crosshair: "top-left",
      index: 1,
    },
    {
      label: t("sections.jack.title"),
      description: t("sections.jack.description"),
      image: {
        en: {
          src: "J.svg",
          alt: t("letterX", { char: "J" }),
        },
        de: {
          src: "A.svg",
          alt: t("letterX", { char: "A" }),
        },
      },
      crosshair: "bottom-left",
      index: 2,
    },
    {
      label: t("sections.future.title"),
      description: t("sections.future.description"),
      image: {
        en: {
          src: "F.svg",
          alt: t("letterX", { char: "F" }),
        },
        de: {
          src: "Z.svg",
          alt: t("letterX", { char: "Z" }),
        },
      },
      crosshair: "top-left",
      index: 3,
    },
  ]

  return (
    <Container>
      <section
        id="about"
        aria-label={t("title")}
        className="grid grid-cols-1 divide-y border-x border-t lg:h-170 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
      >
        {cards.map((card) => (
          <AboutCard key={card.label} {...card} />
        ))}
      </section>
    </Container>
  )
}
