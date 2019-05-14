/**
 * @fileoverview A singleton Class used to represent a music collection. Includes methods for adding to, removing from, and filtering the collection.
 * @author kylegk@gmail.com (Kyle Keller)
 */

const Album = require('./album.js')

class MusicCollection {

  constructor() {

    if (!!MusicCollection.instance) {
      return MusicCollection.instance
    }

    MusicCollection.instance = this
    this.albums = []

    return this
  }

  /**
   * Add an album to the collection
   * @param {string} title
   * @param {string} artist
   */
  addAlbum(title, artist) {

    if ( !title || title === "" ) {
      throw "Invalid title"
    }

    if ( !artist || artist === "" ) {
      throw "Invalid artist"
    }

    // If no albums exist in the collection, or the title is unique, add it to the collection
    if ( this.albums.length === 0 || this.findReferenceToAlbumByTitle(title) === undefined ) {
      let album = new Album(title, artist)
      this.albums.push(album)

      return { title, artist }
    }
    else {
      throw `Could not add album; "${title}" already exists in this collection.`
    }
  }

  /**
   * Remove an album from the collection
   * @param {string} title
   * @returns {boolean}
   */  
  removeAlbum(title) {

    // Verify that the collection contains albums before setting about trying to find an album to remove
    if ( this.albums.length > 0 && this.findReferenceToAlbumByTitle(title) !== undefined ) {
      const index = this.albums.findIndex(album => album.title === title)
      this.albums.splice(index,1)

      return true
    }
    else {
      throw `Could not remove album; "${title}" does not exist in this collection.`
    }
    
  }

  /**
   * Play an album from the collection
   * @param {string} title
   */
  playAlbum(title) {
    let album = this.findReferenceToAlbumByTitle(title)
    if ( album ) {
      album.setPlayed()
    }
    else {
      throw `Could not play album; "${title}" does not exist in this collection.`
    }
  }

  /**
   * Return a reference to a title in the collection (if it exists)
   * @param {string} title
   * @returns {object}
   */  
  findReferenceToAlbumByTitle(title) {
    return this.albums.find(album => {
      return album.title.toLowerCase() === title.toLowerCase()
    })    
  }

  /**
   * Return a list of albums in the collection (all or by a single artist)
   * @param {string} artist
   * @returns {array}
   */  
  getAllAlbums(artist) {
    let collection = []
    if (!artist || artist.toLowerCase() === 'all') {
      collection = this.getAllAlbumsInCollection()
    }
    else {
      collection = this.getAllAlbumsByArtist(artist)
    }

    return collection
  }

  /**
   * Return a list of all albums in the collection
   * @return {array} 
   */  
  getAllAlbumsInCollection() {
    return this.albums
  }

  /**
   * Return a list of albums in the collection filtered by artist
   * @param {string} artist
   * @return {array}
   */  
  getAllAlbumsByArtist(artist) {
    return this.albums.filter(album => {
        return album.artist.toLowerCase() === artist.toLowerCase()
      })
  }

  /**
   * Return a list of albums in the collection that have not yet been played
   * @return null
   */  
  getAllUnplayed() {
    return this.albums.filter(album => {
        return album.played == false
      })
  }

  /**
   * Return a list of albums in the collection that have not yet been played, filtered by artist
   * @param {string} artist
   * @return null
   */    
  getAllUnplayedByArtist(artist) {
      return this.albums.filter(album => {
        return album.artist.toLowerCase() === artist.toLowerCase() && album.played === false
      })    
  }
}

module.exports = MusicCollection