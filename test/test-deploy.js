const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  // Test case to check if the contract is deployed successfully
  it("Should deploy SimpleStorage contract", async function () {
    expect(simpleStorage.address).to.not.equal(0);
  });

  // Test case to check if the favoriteNumber is initialized to zero
  it("Should initialize favouriteNumber to zero", async function () {
    const initialNumber = await simpleStorage.favouriteNumber();
    expect(initialNumber).to.equal(0);
  });

  // Test case to check if store function updates the favouriteNumber
  it("Should update favouriteNumber using store function", async function () {
    const newFavoriteNumber = 42;
    await simpleStorage.store(newFavoriteNumber);
    const updatedNumber = await simpleStorage.favouriteNumber();
    expect(updatedNumber).to.equal(newFavoriteNumber);
  });

  // Test case to check if retrieve function returns the correct favouriteNumber
  it("Should retrieve correct favouriteNumber using retrieve function", async function () {
    const expectedNumber = 123;
    await simpleStorage.store(expectedNumber);
    const retrievedNumber = await simpleStorage.retrieve();
    expect(retrievedNumber).to.equal(expectedNumber);
  });

  // Test case to check if addPerson function updates people array and mapping
  it("Should add a person using addPerson function", async function () {
    const personName = "Alice";
    const personFavoriteNumber = 777;

    await simpleStorage.addPerson(personName, personFavoriteNumber);

    const addedPerson = await simpleStorage.people(0);
    expect(addedPerson.favouriteNumber).to.equal(personFavoriteNumber);
    expect(addedPerson.name).to.equal(personName);

    const mappedFavoriteNumber =
      await simpleStorage.nameToFavouriteNumber(personName);
    expect(mappedFavoriteNumber).to.equal(personFavoriteNumber);
  });
});
