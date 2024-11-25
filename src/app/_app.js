import localFont from 'next/font/local';
import { AnimatePresence } from 'motion/react';
import { NextUIProvider } from '@nextui-org/react';

// Font files can be colocated inside of `pages`
const Gothic = localFont({ src: './Gothic.otf' })

export default function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AnimatePresence mode='wait'>
        <main className={Gothic.className}>
          <Component {...pageProps} key={router.route} />
        </main>
      </AnimatePresence>
    </NextUIProvider>
  )
}