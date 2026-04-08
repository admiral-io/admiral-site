import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/images/logo.svg"
            alt="Admiral"
            width={90}
            height={25}
            className="h-5 w-auto dark:hidden"
          />
          <Image
            src="/images/logo-white.svg"
            alt="Admiral"
            width={90}
            height={25}
            className="h-5 w-auto hidden dark:block"
          />
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'API Reference',
        url: '/docs/openapi',
      },
    ],
  };
}
