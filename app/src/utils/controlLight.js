const colors = {
  'black': 12,
  'green': 60,
  'orange': 63,
  'red': 15
}

export default (midiAccess, portID, index, color) => {
  const row = Math.floor(index / 9)
  const col = index % 9
  const note = 16 * row + col
  const colorNum = colors[color]
  var noteOnMessage = [0x90, note, colorNum]
  var output = midiAccess.outputs.get(portID)

  output.send(noteOnMessage)
}
