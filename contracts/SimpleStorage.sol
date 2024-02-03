// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// SimpleStorage is a basic smart contract to store and retrieve favorite numbers and names.
contract SimpleStorage {
    // Public variable to store a single favorite number.
    uint256 public favouriteNumber; // initialized to zero

    // Mapping to associate names with favorite numbers.
    mapping(string => uint256) public nameToFavouriteNumber;

    // Struct to represent a person with a favorite number and a name.
    struct People {
        uint256 favouriteNumber;
        string name;
    }

    // Array to store a list of people and their favorite numbers.
    //uint256[] public favouriteNumbersList;
    People[] public people;

    // My Array and Struct 😅
    // People public myPeople;

    // function setPeople(uint256 _favouriteNumber, string memory _name) public  {
    //     myPeople = People(_favouriteNumber, _name);
    // }

    //Function to store a single Favourite Number
    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    // Function to retireve the stored Favourite Number
    // view, pure - it is a view function as it does not change the state
    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    // Function to add a person with a given name and favorite number.
    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        // Create a new person and add them to the people array.
        people.push(People(_favouriteNumber, _name));

        // Update the mapping to associate the name with the favorite number.
        nameToFavouriteNumber[_name] = _favouriteNumber;
    }
}
