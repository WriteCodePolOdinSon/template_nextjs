'use client'

import PropTypes from 'prop-types'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useEffect, useState } from 'react'
import { ClipboardIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function QueryModal({ isOpen, onClose, queryText ,menu_name }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(queryText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      {/* ปุ่มปิด (ลอย) */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="text-white hover:text-red-400"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6">
        {/* หัวข้อ + ปุ่ม Copy */}
        <div className="flex justify-between items-center ">
          <h2 className="bg-[#555666] text-xl font-bold p-1.5 rounded-md transition">{menu_name}</h2>
          <button
            onClick={handleCopy}
            className="flex items-center ml-1 gap-2 px-5 py-2 text-base bg-[#444654] hover:bg-[#555666] text-white rounded-md transition"
>
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 text-green-400" />
                Copied
              </>
            ) : (
              <>
                <ClipboardIcon className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* กล่องแสดง SQL */}


        <div className="max-h-[90vh] max-w-[90vw] overflow-auto rounded-xl">
          <SyntaxHighlighter
            language="sql"
            style={materialDark}
            customStyle={{
              // background: 'transparent',
              // padding: '1rem',
              // borderRadius: '0.75rem',
              // fontFamily: '"Roboto Mono", monospace',
              // fontSize: '1em',
              // lineHeight: '1.5em',
              // color: '#eee',
            }}
          >
            {queryText}
          </SyntaxHighlighter>

          {/* <SyntaxHighlighter
            language="sql"
            style={materialDark}
            customStyle={{
              background: 'transparent',
              padding: '1rem',
              fontSize: '1em',
              lineHeight: '1.5em',
            }}
          >
            {queryText}
          </SyntaxHighlighter> */}
        </div>

      </div>
    </div>
  )
}

QueryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  queryText: PropTypes.string.isRequired,
  menu_name: PropTypes.string.isRequired,
}
