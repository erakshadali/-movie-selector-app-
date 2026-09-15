// src/Movies.js

const allMovies = [
  {
    title: "Damaged",
    genre: ["horror", "kids"],
    rating: 5.8,
    age: 18,
    about: "Detective hunts a killer hiding dark secrets",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    title: "Megalopolis",
    genre: ["horror", "action"],
    rating: 5.1,
    age: 19,
    about: "Architect fights fear while rebuilding a city",
    image:
      "https://i.guim.co.uk/img/media/ff615e74d99951188e625705de9443c1870665cf/0_0_2583_1550/master/2583.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=2693685bd9ab77d551d6242903a92efa",
  },
  {
    title: "The Nun",
    genre: ["horror", "action"],
    rating: 6.0,
    age: 17,
    about: "A demon haunts an old European convent",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMM4NyNrQX9wopTq8NUzA1UsPwSjwJGtNjvR6l79CInA&s=10",
  },
  {
    title: "Smile",
    genre: ["horror", "action"],
    rating: 6.5,
    age: 23,
    about: "A curse spreads through terrifying smiling faces",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXoj4Plcr3QzsWVyWILmKxAPz9hpaS-kfge06AWtLVjw&s=10",
  },
  {
    title: "Buffalo Kids",
    genre: ["kids", "horror"],
    rating: 6.2,
    age: 38,
    about: "Three kids survive alone in the wild west",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflgboSqGZRS6nQUnj30i9LjgTR_UIGP3G5Ys4wl7FSA&s=10",
  },
  {
    title: "Mufasa",
    genre: ["kids", "action"],
    rating: 6.6,
    age: 10,
    about: "Young lion cub becomes the future king",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpr687IDamybQdOKwbHeZBKYyXxrh14mNSHxahj2QIwQ&s=10",
  },
  {
    title: "Back in Action",
    genre: ["action", "kids"],
    rating: 6.7,
    age: 48,
    about: "Retired spies return for one last mission",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MkT8TAjXPmuShUt6YTPnfkXsupvhgmz0mthMTY2R4g&s=10",
  },
  {
    title: "Kill",
    genre: ["action", "kids"],
    rating: 7.6,
    age: 32,
    about: "Soldier fights gang aboard a hijacked train",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLG61qbQOIMtNiEl2Q4UibAfsKZL6jzEgUCpF85ltSvA&s=10",
  },
  {
    title: "Dune Part Two",
    genre: ["scifi", "horror"],
    rating: 8.5,
    age: 12,
    about: "Hero unites tribes to fight an empire",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCEF38R_xKrKXTG4hQEVmqLj0w2-WV8mnBBqG0pidFA&s=10",
  },
  {
    title: "Interstellar",
    genre: ["scifi", "action"],
    rating: 8.6,
    age: 40,
    about: "Astronauts search space for a new home",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXaZpllwTb13YC-ODLTNpKLvbchQyuMSiIKLxUtdTUXg&s=10",
  },
  {
    title: "Iron Man",
    genre: ["action", "kids"],
    rating: 8.6,
    age: 19,
    about: "A genius billionaire becomes an armored hero",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgqZ684DxG_02V5SScyutuI-_fAC_nGdZIsQqUA0Lpug&s=10",
  },
  {
    title: "Mogali",
    genre: ["kids", "action"],
    rating: 6.7,
    age: 11,
    about: "Retired spies return for one last mission",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7SezKYIngRt16H1dCDNHP27XB_DsY87jzplcPld8wWg&s=10",
  },
  {
    title: "KGF",
    genre: ["action", "horror", "scifi"],
    rating: 7.6,
    age: 16,
    about: "Soldier fights gang aboard a hijacked train",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR50lziqmPDLcSaiWl6k_2-9-5oRi5hjfq9AfSGoqMHOA&s=10",
  },
  {
    title: "War",
    genre: ["action", "kids"],
    rating: 8.5,
    age: 58,
    about: "Hero unites tribes to fight an empire",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl9P7YEzGm8QO2yEUVQpogmVkgsEL-v__awWRAK0-v5Q&s=10",
  },
  {
    title: "Weapons",
    genre: ["horror", "action", "scifi"],
    rating: 8.6,
    age: 7,
    about: "Astronauts search space for a new home",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ5sTqTbx5AestViWaoERWs7diHPWSfdsjoF93EzTZAQ&s",
  },
  {
    title: "Jhon wick",
    genre: ["action", "scifi"],
    rating: 9.5,
    age: 18,
    about:
      "A man which killed 3 people with fucking a pencil its name is baba yaga",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5Mq4mMOZwN7iOF2H5D0RMy6JO36YXXzdZWrBLQSPvg&s=10",
  },
];

export default allMovies;
