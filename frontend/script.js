document.addEventListener("DOMContentLoaded", () => {
	// Fetch cryptocurrency data
	async function loadCryptoData() {
		try {
			const response = await fetch("http://localhost:3000/cryptos"); // Update this URL as per your backend
			const cryptos = await response.json();

			const tableBody = document.getElementById("crypto-data");
			tableBody.innerHTML = ""; // Clear the table before populating

			cryptos.forEach((crypto, index) => {
				const row = document.createElement("tr");
				row.innerHTML = `
            <td>${index + 1}</td>
            <td>${crypto.name}</td>
            <td>₹ ${crypto.last}</td>
            <td>₹ ${crypto.buy} / ₹ ${crypto.sell}</td>
            <td>${crypto.difference || "-"}%</td>
            <td>₹ ${crypto.savings || "-"}</td>
            `;
				tableBody.appendChild(row);
			});
		} catch (error) {
			console.error("Error fetching crypto data:", error);
		}
	}

	loadCryptoData();
});
