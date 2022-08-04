function Instrument(instrument) {
  this.instrument = instrument;
  this.status = "Incomplete";
}

function parseArrangement(song) {
  let songStatus = [];
  let songArrangement = [];

  song.arrangement.forEach((inst) => {
    let newInstrument = new Instrument(inst.instrument);
    songStatus.push(newInstrument);
    songArrangement.push(inst.instrument);
  });
  return [songArrangement, songStatus];
}

export function NewSong(song) {
  const [songArrangement, songStatus] = parseArrangement(song);
  this.songTitle = song.songTitle;
  this.songReferences = song.references;
  this.songArrangements = songArrangement;
  this.songStatus = songStatus;
}
