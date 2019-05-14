/**
 * @fileoverview Object used for storing album information
 * @author kylegk@gmail.com (Kyle Keller)
 */

class Album {

  constructor(title, artist) {
    this.title = title
    this.artist = artist
    this.played = false
  }

  setPlayed() {
    this.played = true
  }

}

module.exports = Album