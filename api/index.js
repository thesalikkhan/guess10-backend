const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

let categories = [
  {
    name: "Top 10 video games",
    items: [
      "Mario",
      "The Legend of Zelda",
      "Minecraft",
      "Grand Theft Auto V",
      "Fortnite",
      "Red Dead Redemption 2",
      "Call of Duty: Modern Warfare",
      "Overwatch",
      "The Witcher 3: Wild Hunt",
      "Super Smash Bros. Ultimate",
    ],
  },
  {
    name: "Worst 10 artists",
    items: [
      "Justin Bieber",
      "Miley Cyrus",
      "Nicki Minaj",
      "Katy Perry",
      "Lady Gaga",
      "Iggy Azalea",
      "Rihanna",
      "Taylor Swift",
      "Beyoncé",
      "Adele",
    ],
  },
  {
    name: "Top 10 movies",
    items: [
      "The Shawshank Redemption",
      "The Godfather",
      "The Godfather: Part II",
      "The Dark Knight",
      "12 Angry Men",
      "Schindler's List",
      "The Lord of the Rings: The Return of the King",
      "Pulp Fiction",
      "The Good, the Bad and the Ugly",
      "Fight Club",
    ],
  },
  {
    name: "Top 10 Football teams",
    items: [
      "Barcelona",
      "Real Madrid",
      "Bayern Munich",
      "Manchester United",
      "Liverpool",
      "Juventus",
      "Paris Saint-Germain",
      "Chelsea",
      "Manchester City",
      "Arsenal",
    ],
  },
  {
    name: "Worst 10 movies",
    items: [
      "Gigli",
      "The Love Guru",
      "Howard the Duck",
      "Battlefield Earth",
      "The Room",
      "The Emoji Movie",
      "Birdemic: Shock and Terror",
      "The Last Airbender",
      "Superbabies: Baby Geniuses 2",
      "The Wicker Man",
    ],
  },
  {
    name: "Top 10 songs",
    items: [
      "Bohemian Rhapsody",
      "Imagine",
      "What's Going On",
      "Like a Rolling Stone",
      "I Can't Get No Satisfaction",
      "Good Vibrations",
      "My Generation",
      "A Change Is Gonna Come",
      "Respect",
      "What'd I Say",
    ],
  },
  {
    name: "Top 10 books",
    items: [
      "To Kill a Mockingbird",
      "The Lord of the Rings",
      "The Catcher in the Rye",
      "The Great Gatsby",
      "The Lion, the Witch and the Wardrobe",
      "The Hobbit",
      "Harry Potter and the Philosopher's Stone",
      "The Diary of a Young Girl",
      "The Grapes of Wrath",
      "The Alchemist",
    ],
  },
  {
    name: "Top 10 comedians",
    items: [
      "Richard Pryor",
      "George Carlin",
      "Bill Hicks",
      "Chris Rock",
      "Louis C.K.",
      "Dave Chappelle",
      "Sarah Silverman",
      "John Mulaney",
      "Patton Oswalt",
      "Amy Schumer",
    ],
  },
  {
    name: "Top 10 TV shows",
    items: [
      "The Sopranos",
      "The Wire",
      "Breaking Bad",
      "Game of Thrones",
      "The Office",
      "Friends",
      "The Simpsons",
      "The Twilight Zone",
      "Mad Men",
      "The West Wing",
    ],
  },
  {
    name: "Top 10 Cars",
    items: [
      "Lamborghini Aventador",
      "Ferrari 488 GTB",
      "Mclaren 720S",
      "Porsche 911 GT3",
      "Mercedes-Benz AMG GT R",
      "Chevrolet Corvette ZR1",
      "Ford GT",
      "Dodge Viper ACR",
      "Audi R8 V10 Plus",
      "BMW M5",
    ],
  },
  {
    name: "Top 10 Fruits",
    items: [
      "Apple",
      "Banana",
      "Orange",
      "Mango",
      "Strawberry",
      "Pineapple",
      "Watermelon",
      "Grapes",
      "Peach",
      "Blueberries",
    ],
  },
  {
    name: "Top 10 Cities",
    items: [
      "New York City",
      "London",
      "Paris",
      "Tokyo",
      "Dubai",
      "Singapore",
      "Seoul",
      "Shanghai",
      "Hong Kong",
      "Sydney",
    ],
  },
  {
    name: "Top 10 Actors",
    items: [
      "Meryl Streep",
      "Tom Hanks",
      "Leonardo DiCaprio",
      "Denzel Washington",
      "Tom Hanks",
      "Robert De Niro",
      "Brad Pitt",
      "Anthony Hopkins",
      "Al Pacino",
      "Daniel Day-Lewis",
    ],
  },
  {
    name: "Top 10 Actresses",
    items: [
      "Meryl Streep",
      "Saoirse Ronan",
      "Scarlett Johansson",
      "Charlize Theron",
      "Cate Blanchett",
      "Kate Winslet",
      "Helen Mirren",
      "Emma Thompson",
      "Maggie Smith",
      "Judi Dench",
    ],
  },
  {
    name: "Top 10 Athletes",
    items: [
      "Michael Jordan",
      "Lionel Messi",
      "Muhammad Ali",
      "Peyton Manning",
      "LeBron James",
      "Roger Federer",
      "Usain Bolt",
      "Michael Phelps",
      "Wayne Gretzky",
      "Pete Sampras",
    ],
  },
  {
    name: "Top 10 Scientists",
    items: [
      "Albert Einstein",
      "Isaac Newton",
      "Galileo Galilei",
      "Stephen Hawking",
      "Marie Curie",
      "Charles Darwin",
      "Muhammad ibn Musa al-Khwarizmi",
      "Nikola Tesla",
      "Hasan Ibn al-Haytham",
      "Mikhail Lomonosov",
    ],
  },
  {
    name: "Top 10 Animations",
    items: [
      "The Lion King",
      "Toy Story",
      "Up",
      "Inside Out",
      "Beauty and the Beast",
      "Finding Nemo",
      "The Incredibles",
      "Coco",
      "Spirited Away",
      "Your Name.",
    ],
  },
  {
    name: "Top 10 Festivals (US)",
    items: [
      "Carnival",
      "Coachella",
      "Burning Man",
      "Tomorrowland",
      "Glastonbury",
      "Rock am Ring",
      "Ultra Music Festival",
      "Summerfest",
      "Sziget Festival",
      "Reading and Leeds Festival",
    ],
  },
  {
    name: "Top 10 Fast Food Chains",
    items: [
      "McDonald's",
      "Burger King",
      "Wendy's",
      "Taco Bell",
      "KFC",
      "Subway",
      "Domino's",
      "Pizza Hut",
      "Starbucks",
      "Dunkin' Donuts",
    ],
  },
  {
    name: "Top 10 Soft Drinks",
    items: [
      "Coca-Cola",
      "Pepsi",
      "Sprite",
      "Fanta",
      "Dr. Pepper",
      "Mountain Dew",
      "7UP",
      "Coke Zero",
      "Diet Pepsi",
      "Minute Maid",
    ],
  },
  {
    name: "Top 10 Websites",
    items: [
      "Google",
      "YouTube",
      "Facebook",
      "Twitter",
      "Instagram",
      "LinkedIn",
      "Reddit",
      "Wikipedia",
      "Amazon",
      "Netflix",
    ],
  },
  {
    name: "Top 10 Travel Destinations",
    items: [
      "Paris",
      "Rome",
      "Santorini",
      "Bali",
      "Cancun",
      "Amsterdam",
      "Barcelona",
      "Sydney",
      "Maldives",
      "Maui",
    ],
  },
  {
    name: "Top 10 Video Game Franchises",
    items: [
      "Super Mario",
      "The Legend of Zelda",
      "Pokemon",
      "Call of Duty",
      "Grand Theft Auto",
      "Final Fantasy",
      "Halo",
      "Minecraft",
      "Red Dead Redemption",
      "Fallout",
    ],
  },
];

app.get("/api/guess10", (req, res) => {
  const category = categories[Math.floor(Math.random() * categories.length)];
  res.json({
    category: category.name,
    items: category.items,
  });
});
app.listen(port, () => {
  console.log(`Guess10 API listening at http://localhost:${port}`);
});
