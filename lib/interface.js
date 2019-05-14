/**
 * @fileoverview A singleton Class used to represent an interface for a music collection.
 * @author kylegk@gmail.com (Kyle Keller)
 */

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const MusicCollection = require('./collection.js')

class MusicCollectionInterface {
  constructor() {

    if (!!MusicCollectionInterface.instance) {
      return MusicCollectionInterface.instance
    }

    this.mc = new MusicCollection()
    this.displayMessage('Welcome to your music collection!')

    MusicCollectionInterface.instance = this
  
    return this
  }

  /**
   * Display a message for the user
   * @param {string} message
   */
  displayMessage(message) {
    console.log(`${message}\n`)
  }

  /**
   * Display an error message for the user
   * @param {string} error
   */
  displayError(error) {
    this.displayMessage(`Error: ${error}`)
  }

  displayHelp() {
    let helpStr = `
add "$title" "$artist": adds an album to the collection with the given title and artist. All albums are unplayed by default.
play "$title": marks a given album as played.
show all: displays all of the albums in the collection
show unplayed: display all of the albums that are unplayed
show all by "$artist": shows all of the albums in the collection by the given artist
show unplayed by "$artist": shows the unplayed albums in the collection by the given artist
quit: quits the program`

    this.displayMessage(helpStr)
  }

  /**
   * Add an album to the music collection
   * @param {string} title
   * @param {string} artist
   */
  addAlbum(title, artist) {
    try {
      this.mc.addAlbum(title, artist)
      this.displayMessage(`Added "${title}" by ${artist}`)
    }
    catch (error) {
      this.displayError(`${error}`)
    }
  }

  /**
   * Play an album from the music collection
   * @param {string} title
   */
  playAlbum(title) {
    try {
      this.mc.playAlbum(title)
      this.displayMessage(`You're listening to "${title}"`)
    }
    catch (error) {
      this.displayError(error)
    }
  }

  /**
   * Get all the albums in the collection
   * @params {string} artist
   */
  getAllAlbums(artist) {
    let albums = []

    try {
      albums = this.mc.getAllAlbums(artist)
    }
    catch (error) {
      this.displayError(error)
    }

    return albums
  }

  /**
   * Get all umnplayed albums in the collection
   */
  getUnplayedAlbums(artist) {
    let albums = []

    try {
      if ( artist ) {
        albums = this.mc.getAllUnplayedByArtist(artist)
      }
      else {
        albums = this.mc.getAllUnplayed()
      }
    }
    catch (error) {
      this.displayError(error)
    }

    return albums
  }

  /**
   * Display albums to the user
   */
  showAlbums(albums, includePlayedFlag = false) {
    let outputStr = ""

    if ( albums.length === 0 ) {
      outputStr = "No albums to display"
    }
    else if ( includePlayedFlag ) {
      albums.map( (a) => {
        outputStr += `"${a.title}" by ${a.artist} (${a.played ? 'played' : 'unplayed'})\n`
      })
    }
    else {
      albums.map( (a) => {
        outputStr += `"${a.title}" by ${a.artist}\n`
      })
    }

    this.displayMessage(outputStr)

  }

  /**
   * Get the albums in the music collection (filtered or not), and display them to the user
   * @param {array} input
   */
  getAlbums(input) {
    let what = input.shift()
    let albums = []
    let artist = input[1]

    switch ( what ) {
      case 'all':
        albums = this.getAllAlbums(artist)
        this.showAlbums(albums, true)
        break

      case 'unplayed':
        albums = this.getUnplayedAlbums(artist)
        this.showAlbums(albums)
        break

      default:
        albums = this.getAllAlbums()
        this.showAlbums(albums, true)
        break
    }
  }

  /**
   * Display an interactive user interface
   */
  promptUser() {
    readline.question(`> `, (input) => {
      let inputVals = input.match(/\w+\s?|"([^"]*)"/g)
      if ( inputVals === null ) {
        return this.promptUser()
      }

      inputVals = inputVals.map( (i) => { return i.replace(/"/g, '').trim() } )

      switch ( inputVals[0].trim().toLowerCase() ) {
        case 'add':
          this.addAlbum(inputVals[1], inputVals[2])
          break
        case 'show':
          this.getAlbums(inputVals.slice(1, inputVals.length))
          break
        case 'play':
          this.playAlbum(inputVals[1])
          break
        case 'help':
          this.displayHelp()
          break
        case 'quit':
          this.displayMessage("Bye!")
          process.exit(0)
          break
        default:
          this.displayMessage("Invalid command. Type 'help' for a list of commands.")
          break
      }

      this.promptUser()
    })
  }
}

module.exports = MusicCollectionInterface
