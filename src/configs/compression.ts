import type { CompressionOptions } from 'compression'
import compression from 'compression'
const compressionOptions: CompressionOptions = {
  threshold: 1024,
  filter: (req, res) => {
    const accept = req.headers.accept || ''
    if (accept.includes('text/event-stream')) {
      return false
    }
    return compression.filter(req, res)
  }
}

export default compressionOptions
