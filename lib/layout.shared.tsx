import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { getFirstApiReferencePageUrl } from "./source";
import { gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/images/logo.svg"
            alt="Admiral"
            width={120}
            height={32}
            className="h-7 w-auto dark:hidden"
          />
          <Image
            src="/images/logo-white.svg"
            alt="Admiral"
            width={120}
            height={32}
            className="hidden h-7 w-auto dark:block"
          />
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: "API Reference",
        url: getFirstApiReferencePageUrl(),
      },
    ],
  };
}
