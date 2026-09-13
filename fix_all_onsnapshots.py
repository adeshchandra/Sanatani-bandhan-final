import os
import re
import glob

files = glob.glob('src/**/*.tsx', recursive=True) + glob.glob('src/**/*.ts', recursive=True)

# A more robust regex: find `onSnapshot(something, (snapshot) => { ... })` and append `, (err) => { console.warn('Firebase sync error in onSnapshot:', err.message); }`
# Because brackets can be nested, we should just search for `});` at the end of the `onSnapshot` block.
# Actually, since it's hard to parse AST with regex, we can just replace `, (snapshot) => {` 
# Wait, this is error prone. We can use a Node script with Babel? We don't have Babel installed easily.

# Alternative: we can use a simpler approach. If there is an `onSnapshot` without error handler, we can just patch it by catching global unhandled rejections or error events?
