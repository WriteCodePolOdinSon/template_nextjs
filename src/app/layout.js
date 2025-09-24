import '../styles/globals.css'
import PropTypes from 'prop-types'
import { Prompt } from 'next/font/google'
import Footer from '@/components/Footer';
const prompt = Prompt({
  subsets: ['thai'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-thai',
})

export const metadata = {
  title: 'PS',
  description: '',
}


export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${prompt.variable} dark`}>
      <body className="font-thai">{children}</body>
    </html>
  )
} 



RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

