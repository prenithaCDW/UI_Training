async function displayFriendsList() {
	try {
		const response = await fetch("./data.json");

		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		const data = await response.json();
		const cardsContainer = document.getElementById("container-cards");

		data.forEach((friend) => {
			const article = document.createElement("article");
			article.className = "card";

			const figureContainer = document.createElement("figure");
			figureContainer.className = "card-image-container";

			const figure = document.createElement("img");
			figure.className = "card-image";
			figure.src = friend.img;
			figure.alt = "profile";
			figureContainer.appendChild(figure);
			article.appendChild(figureContainer);

			const contentDiv = document.createElement("div");
			contentDiv.className = "card-content";

			const nameSpan = document.createElement("span");
			nameSpan.className = "card-content-name";
			nameSpan.textContent = `${friend.first_name} ${friend.last_name}`;

			const emailSpan = document.createElement("a");
			emailSpan.className = "card-content-email";
			emailSpan.textContent = friend.email;
			emailSpan.href = `mailto:${friend.email}`;

			contentDiv.appendChild(nameSpan);
			contentDiv.appendChild(emailSpan);
			article.appendChild(contentDiv);
			cardsContainer.appendChild(article);
		});
	} catch (error) {
		console.error(error);
	}
}
displayFriendsList();