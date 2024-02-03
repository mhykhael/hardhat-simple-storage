// Import necessary modules from the Hardhat framework
const { ethers, run, network } = require("hardhat")

// Async function to deploy a contract
async function main() {
    // Get the contract factory for the SimpleStorage contract
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")

    // Inform the user that the contract deployment is in progress
    console.log("Deploying Contract, please wait...⌛")

    // Deploy the SimpleStorage contract
    const simpleStorage = await SimpleStorageFactory.deploy()

    // Wait for the deployment to complete
    await simpleStorage.waitForDeployment()
    console.log(`Deployed Contract to: ${simpleStorage.target}`)

    // Making sure we only run verification on a live network
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        // Wait for the deployment transaction to be mined
        await simpleStorage.deploymentTransaction().wait(6)

        // Verify the deployed contract on Etherscan
        await verify(simpleStorage.target, [])
    }

    // Retrieve and log the current value from the contract
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

// Async function to verify the contract on Etherscan
const verify = async (contractAddress, args) => {
    console.log("Verifying Contract...")
    try {
        // Use Hardhat's verification plugin to verify the contract on Etherscan
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (err) {
        // Check if the error indicates that the contract is already verified
        if (err.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(err)
        }
    }
}

// Main execution block
main()
    .then(() => process.exit(0)) // Exit with status code 0 on successful execution
    .catch((err) => {
        console.log(err) // Log any errors that occur during execution
        process.exit(1) // Exit with status code 1 in case of an error
    })
