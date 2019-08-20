import hash from './hash'

var REGEX = /^LAYERS:(-?[0-9a-f]+):(.+)$/

function MessageSerializer() { }
MessageSerializer.prototype.serialize = function (message) {
  var messageString = JSON.stringify(message)
  var messageHash = hash(messageString)

  return `LAYERS:${messageHash}:${messageString}`
}

MessageSerializer.prototype.deserialize = function (string) {
  var match = REGEX.exec(string)
  if (!match) {
    throw new Error('Malformed message')
  }

  var messageHash = match[1]
  var messageString = match[2]

  if (hash(messageString) !== messageHash) {
    throw new Error('Corrupted message')
  }

  var message = JSON.parse(messageString)
  return message
}

export default (new MessageSerializer())