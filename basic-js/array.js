//A Cricket Team has 11 players. Create a list with the names of all players.
const cricketPlayers=["Rohit Sharma",
  "Virat Kohli",
  "KL Rahul",
  "Shubman Gill",
  "Hardik Pandya",
  "Ravindra Jadeja",
  "Ravichandran Ashwin",
  "Jasprit Bumrah",
  "Mohammed Shami",
  "Kuldeep Yadav",
  "Ishan Kishan"]

cricketPlayers.forEach(player=>console.log(player));
console.log("-----------------------------------");

// Unfortunately, the first player had an injury. Remove him from the list of players.
const firstPlayerRemoved=cricketPlayers.shift();
console.log("First player removed: "+firstPlayerRemoved);
cricketPlayers.forEach(player=>console.log(player));
// Now, find out the number of players
console.log("Count of players is "+cricketPlayers.length);
console.log("-----------------------------------");

// Add another player to the above list of players to make the count 11.
cricketPlayers.unshift("MS Dhoni");
cricketPlayers.forEach(player=>console.log(player));
console.log("Count of players is "+cricketPlayers.length);
console.log("-----------------------------------");

// The cricket board has decided to take photographs of all players and so they would need the players list in sorted format.
cricketPlayers.sort();
cricketPlayers.forEach(player=>console.log(player));
console.log("-----------------------------------");

// Display all the Players name and assign a random jersey number. For example. MS Dhoni-7
cricketPlayers.forEach(player => {
  const randomNumber = Math.round(Math.random() * 99 + 1);
  console.log(player + " - " + randomNumber);
});
console.log("-----------------------------------");

// The cricket board wants to print the names of all players in uppercase and store it in a different location for printing jerseys. Do not modify the existing players list
const upperCasePlayers=cricketPlayers.map(function(player){
    return player.toUpperCase();
});
console.log(upperCasePlayers);

console.log(cricketPlayers);
