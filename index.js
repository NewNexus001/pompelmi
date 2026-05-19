const { Transform } = require('stream');

/**
 * Pompelmi: In-Process Malware Scanner Middleware
 * Intercepts data buffers to scan for malicious signatures (e.g., PHP tags).
 */
class MalwareScanner extends Transform {
  constructor(options = {}) {
    super(options);
    this.maliciousSignature = Buffer.from('<?php');
  }

  _transform(chunk, encoding, callback) {
    if (chunk.includes(this.maliciousSignature)) {
      this.emit('error', new Error('Malicious content detected in upload stream!'));
      return;
    }
    this.push(chunk);
    callback();
  }
}

// Example simulation of an upload stream
const { Readable } = require('stream');
const uploadStream = Readable.from(['User file data...', '<?php system("rm -rf /"); ?>']);
const scanner = new MalwareScanner();

uploadStream.pipe(scanner)
  .on('data', (data) => console.log('Processing chunk...'))
  .on('error', (err) => console.error('Blocked:', err.message))
  .on('finish', () => console.log('Upload scan complete.'));