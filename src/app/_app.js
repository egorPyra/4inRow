import localFont from 'next/font/local'
 
// Font files can be colocated inside of `pages`
const Gothic = localFont({ src: './Gothic.otf' })
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={Gothic.className}>
      <Component {...pageProps} />
    </main>
  )
}