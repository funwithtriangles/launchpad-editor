const colors = {
  'black': 12,
  'green': 60,
  'orange': 63,
  'red': 15
}

export const controlLight = (midiAccess, portID, index, color) => {
  const row = Math.floor(index / 9)
  const col = index % 9
  const note = 16 * row + col
  const colorNum = colors[color]
  var noteOnMessage = [0x90, note, colorNum]
  var output = midiAccess.outputs.get(portID)

  output.send(noteOnMessage)
}

export const clear = (midiAccess, portID) => {
  var output = midiAccess.outputs.get(portID)
  output.send([176, 0, 0])
}

export const sendAll = (midiAccess, portID, cells) => {
  for (let i = 0; i < 72; i++) {
    controlLight(midiAccess, portID, i, cells[i].color)
  }
}
