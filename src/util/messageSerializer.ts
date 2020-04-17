import hash from './hash'

const REGEX = /^LAYERS:(-?[0-9a-f]+):(.+)$/

class MessageSerializer {
  serialize(message: any) {
    const messageString = JSON.stringify(message)
    const messageHash = hash(messageString)

    return `LAYERS:${messageHash}:${messageString}`
  }

  deserialize(string: string) {
    const match = REGEX.exec(string)
    if (!match) {
      throw new Error('Malformed message')
    }

    const messageHash = match[1]
    const messageString = match[2]

    if (hash(messageString) !== messageHash) {
      throw new Error('Corrupted message')
    }

    const message = JSON.parse(messageString)
    return message
  }
}

export default new MessageSerializer()