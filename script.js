const axios = require("axios");
const fs = require("fs");
const csv = require("csv-parser");
const { ethers } = require("hardhat");

// Función para obtener las direcciones que poseen un token específico
async function getTokenHolders() {
  try {
    const token = await ethers.getContractAt("AtomicBeer", "");
    const csvFilePath = "tokenholders.csv"; // Reemplaza 'archivo.csv' con la ruta de tu archivo CSV
    const output = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv({ separator: ";" }))
      .on("data", (data) => {
        const wallet = data.HolderAddress;
        const balance = data.Balance;
        output.push({ wallet, balance });
      })
      .on("end", () => {
        console.log(output);
      });
    for (let holder of output) {
    }
  } catch (e) {
    console.error("Error al obtener los titulares del token:", e);
  }
}

// Dirección del contrato del token en Binance Smart Chain
const tokenAddress = "0x7a45d24aFfE81e98a03eE68D10cB2Dc1f857676b"; // Reemplaza '0x...' con la dirección del contrato del token

// Llamar a la función para obtener los titulares del token
getTokenHolders();
