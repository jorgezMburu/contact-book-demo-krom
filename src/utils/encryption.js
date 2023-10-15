const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const _key = Buffer.from(
  '65db0aa32a80c39915629ed082be5994238bc0ffb0f45eaedb92d26c040726dfe',
  'hex'
)
const iv = Buffer.from('eac47d46ceacad65cca3aa7b90589b51', 'hex')
module.exports = {
  encrypt(text) {
    try {
      const cipher = crypto.createCipheriv(algorithm, Buffer.from(_key), iv)
      let encrypted = cipher.update(text)
      encrypted = Buffer.concat([encrypted, cipher.final()])
      return encrypted.toString('hex')
    } catch (error) {}
    return null
  },
  decrypt(text) {
    try {
      const encryptedText = Buffer.from(text, 'hex')
      const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(_key),
        iv
      )
      let decrypted = decipher.update(encryptedText)
      decrypted = Buffer.concat([decrypted, decipher.final()])
      return decrypted.toString()
    } catch (error) {}
    return null
  }
}