'use strict'

/**
 * @fileoverview Music Collection Test Suite
 * @author kylegk@gmail.com (Kyle Keller)
 * 
 * The following test suite will verify core functionality of the MusicCollection class
 * 
 * This set suite uses both the Mocha (https://mochajs.org/) and Chai (https://www.chaijs.com/) frameworks
 */

const MusicCollection = require('../lib/collection.js')
const expect = require('chai').expect
let mc = new MusicCollection()

describe("Add an album to the collection", () => {

  it("Should add an album to the collection", () => {
    const albumTitle = "Licensed to Ill"
    const artistName = "Beastie Boys"
    expect(mc.addAlbum(albumTitle, artistName))
  })

  it("Should add another album to the collection by the same artist", () => {
    const artistName = "Beastie Boys"
    const albumTitle = "Pauls Boutique"
    expect(mc.addAlbum(albumTitle, artistName))
  })

  it("Should add another album to the collection by a different artist", () => {
    const artistName = "Pink Floyd"
    const albumTitle = "The Dark Side of the Moon"
    expect(mc.addAlbum(albumTitle, artistName))
  })

  it('Should throw an invalid title error', () => {
    expect( () => {
      mc.addAlbum()
    }).to.throw()
  })

  it('Should throw an invalid artist error', () => {
    expect( () => {
      mc.addAlbum("Title")
    }).to.throw()
  })

  it("Should throw a duplicate album error", () => {
    const albumTitle = "Licensed to Ill"
    const artistName = "Beastie Boys"
    expect( () => {
      mc.addAlbum(albumTitle, artistName)
    }).to.throw()
  })
})

describe("Play an album", () => {
  const title = "Pauls Boutique"
  it(`Should play "${title}"`, () => {
    expect(mc.playAlbum(title))
  })

  it("Should error trying to play an invalid title", () => {
    expect( () => {
      mc.playAlbum("Invalid Title")
    }).to.throw()
  })
})

describe("Get albums from the collection", () => {

  const artist = "Beastie Boys"

  it('Should get all the albums in the collection', () => {
    const collection = mc.getAllAlbums()
    expect(collection.length > 0)
  })

  it(`Should get all the albums in the collection by the ${artist}`, () => {
    const artistCollection = mc.getAllAlbums(artist)
    expect(artistCollection.length == 2)
  })

  it("Should get a list of unplayed albums in the collection", () => {
    const unplayed = mc.getAllUnplayed()
    expect(unplayed.length == 2)
  })

  it(`Should get all the unplayed albums in the collection by ${artist}`, () => {
    const unplayed = mc.getAllUnplayedByArtist(artist)
    expect(unplayed.length == 1)
  })

  it("Should return an empty set when getting a list by an invalid artist", () => {
    const unplayed = mc.getAllUnplayedByArtist("Invalid")
    expect(unplayed.length == 0)
  })
})

describe("Remove an album", () => {
  const albumTitle = "Pauls Boutique"

  it(`Should remove ${albumTitle}`, () => {
    expect( () => {
      mc.removeAlbum(albumTitle)
      const collection = mc.getAllAlbums()
      collection.length == 1
    })
  })
})
