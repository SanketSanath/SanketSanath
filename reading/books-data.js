/**
 * books-data.js — Reading list
 *
 * Each entry:
 *   title    {string}    Book title
 *   author   {string}    Author name
 *   rating   {number}    0-5  (0 = not rated; supports decimals e.g. 4.5)
 *   dateRead {string}    "YYYY/MM/DD" or "" if unknown
 *   genre    {string[]}  One or more genres, e.g. ["Mystery", "Thriller"]
 *   language {string}    e.g. "English", "Hindi", "Japanese"
 *
 * Add a new book at the very top of the BOOKS array (before the first entry).
 */

const BOOKS = [

  // -- 2026 --
  { title: "Ret ki Machhli",                                              author: "Kanta Bharti",             rating: 4, dateRead: "2026/08/10", genre: ["Classic"],                          language: "Hindi"},
  { title: "The Silent Patient",                                           author: "Alex Michaelides",          rating: 3, dateRead: "2026/07/20", genre: ["Mystery", "Thriller"],                          language: "English"},
  { title: "The Housemaid",                                           author: "Freida McFadden",          rating: 3, dateRead: "2026/06/18", genre: ["Mystery", "Thriller"],                          language: "English"},
  { title: "Ibnebatuti । इब्नेबतूती",                                           author: "Divya Prakash Dubey",          rating: 4, dateRead: "2026/06/07", genre: ["Contemporary Hindi"],                          language: "Hindi"},
  { title: "Nirmala",                                              author: "Munshi Premchand",             rating: 5, dateRead: "2026/05/10", genre: ["Classic"],                          language: "Hindi"},
  { title: "Murder on the Orient Express (Hercule Poirot, #10)",           author: "Agatha Christie",              rating: 5, dateRead: "2026/05/02", genre: ["Mystery"],                           language: "English"},
  { title: "The Murder of Roger Ackroyd (Hercule Poirot, #4)",             author: "Agatha Christie",              rating: 5, dateRead: "2026/04/19", genre: ["Mystery"],                           language: "English"},
  { title: "Siddhartha",                                                    author: "Hermann Hesse",                rating: 5, dateRead: "2026/04/12", genre: ["Literary Fiction", "Philosophy"],    language: "English"},
  { title: "Suraj Ka Satvan Ghoda",                                         author: "Dharamvir Bharati",            rating: 5, dateRead: "2026/04/04", genre: ["Literary Fiction"],                  language: "Hindi"},
  { title: "And Then There Were None",                                      author: "Agatha Christie",              rating: 5, dateRead: "2026/03/28", genre: ["Mystery", "Thriller"],               language: "English"},
  { title: "White Nights",                                                  author: "Fyodor Dostoevsky",            rating: 3, dateRead: "2026/03/14", genre: ["Literary Fiction", "Romance"],       language: "English"},
  { title: "Musafir Cafe",                                                  author: "Divya Prakash Dubey",          rating: 4, dateRead: "2026/03/02", genre: ["Contemporary Hindi"],                     language: "Hindi"},
  { title: "The Stranger",                                                  author: "Albert Camus",                 rating: 3, dateRead: "2026/02/21", genre: ["Literary Fiction", "Philosophy"],    language: "English"},
  { title: "October Junction",                                              author: "Divya Prakash Dubey",          rating: 2, dateRead: "2026/02/28", genre: ["Contemporary Hindi"],                     language: "Hindi"},
  { title: "The Girl with the Dragon Tattoo (Millennium, #1)",              author: "Stieg Larsson",                rating: 5, dateRead: "2026/02/10", genre: ["Thriller", "Mystery"],               language: "English"},

  // -- 2025 --
  { title: "A Thousand Splendid Suns",                                      author: "Khaled Hosseini",              rating: 5, dateRead: "2025/08/14", genre: ["Literary Fiction"],                  language: "English"},
  { title: "Gunahon Ka Devta",                                              author: "Dharamvir Bharati",            rating: 5, dateRead: "2025/08/11", genre: ["Romance", "Literary Fiction"],       language: "Hindi"},

  // -- 2022 --
  { title: "Jujutsu Kaisen 0",                                              author: "Gege Akutami",                 rating: 5, dateRead: "2022/01/01", genre: ["Manga"],                             language: "Japanese"},

  // -- 2021 --
  { title: "The Richest Man in Babylon: Six Laws of Wealth",                author: "Charles Conrad",               rating: 4, dateRead: "2021/11/27", genre: ["Self Help"],                         language: "English"},
  { title: "Chaurasi / 84",                                                 author: "Satya Vyas",                   rating: 4, dateRead: "2021/07/11", genre: ["Contemporary Hindi"],                     language: "Hindi"},

  // -- 2020 --
  { title: "Anand Math",                                                    author: "Bankim Chandra Chattopadhyay", rating: 4, dateRead: "2020/04/29", genre: ["Classic"],                           language: "Hindi"},
  { title: "Flowers for Algernon",                                          author: "Daniel Keyes",                 rating: 5, dateRead: "2020/04/22", genre: ["Sci-Fi", "Literary Fiction"],        language: "English"},
  { title: "Konark",                                                        author: "Nimmy Chacko",                 rating: 3, dateRead: "2020/08/08", genre: ["Mythology"],                         language: "English"},
  { title: "Vaishno Devi",                                                  author: "Aruna Balakrishna Singh",      rating: 3, dateRead: "2020/08/08", genre: ["Mythology"],                         language: "English"},
  { title: "The Da Vinci Code (Robert Langdon, #2)",                        author: "Dan Brown",                    rating: 4, dateRead: "2020/02/15", genre: ["Thriller", "Mystery"],               language: "English"},
  { title: "Rangila Rasul",                                                 author: "M.A. Chamupati",               rating: 5, dateRead: "2020/01/07", genre: ["Non-fiction"],                       language: "Hindi"},

  // -- 2019 --
  { title: "The Bourne Identity (Jason Bourne, #1)",                        author: "Robert Ludlum",                rating: 4, dateRead: "2019/12/21", genre: ["Thriller"],                          language: "English"},
  { title: "True Blue",                                                     author: "David Baldacci",               rating: 3, dateRead: "2019/12/16", genre: ["Thriller", "Mystery"],               language: "English"},

  // -- 2017 --
  { title: "Life is What You Make It",                                      author: "Preeti Shenoy",                rating: 2, dateRead: "2017/03/09", genre: ["Romance"],                           language: "English"},

  // -- 2015 --
  { title: "Lolita",                                                        author: "Vladimir Nabokov",             rating: 4, dateRead: "2015/10/01", genre: ["Literary Fiction", "Classic"],       language: "English"},

  // -- Date Unknown --
  { title: "Steve Jobs",                                                    author: "Walter Isaacson",              rating: 5, dateRead: "", genre: ["Biography"],                         language: "English"},
  { title: "War and Peace",                                                 author: "Leo Tolstoy",                  rating: 5, dateRead: "", genre: ["Classic"],                           language: "English"},
  { title: "Our Moon Has Blood Clots",                                      author: "Rahul Pandita",                rating: 5, dateRead: "", genre: ["Non-fiction"],                       language: "English"},
  { title: "Kafka on the Shore",                                            author: "Haruki Murakami",              rating: 4, dateRead: "", genre: ["Literary Fiction"],                  language: "English"},
  { title: "Who Will Cry When You Die?",                                    author: "Robin Sharma",                 rating: 4, dateRead: "", genre: ["Self Help"],                         language: "English"},
  { title: "One Night at the Call Center",                                  author: "Chetan Bhagat",                rating: 3, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Jaag Uthi Nari Shakti",                                         author: "Kiran Bedi",                   rating: 5, dateRead: "", genre: ["Non-fiction", "Biography"],         language: "Hindi"},
  { title: "Great Russian Short Stories",                                   author: "Paul Negri",                   rating: 4, dateRead: "", genre: ["Classic", "Short Stories"],          language: "English"},
  { title: "Gandhi: His Life and Message for the World",                    author: "Louis Fischer",                rating: 0, dateRead: "", genre: ["Biography"],                         language: "English"},
  { title: "Chanakya Niti",                                                 author: "Chanakya",                     rating: 4, dateRead: "", genre: ["Philosophy"],                        language: "Hindi"},
  { title: "Beware of Socialism",                                           author: "Osho",                         rating: 0, dateRead: "", genre: ["Philosophy"],                        language: "English"},
  { title: "Gulliver's Travels",                                            author: "Jonathan Swift",               rating: 3, dateRead: "", genre: ["Classic"],                           language: "English"},
  { title: "The Last Leaf",                                                 author: "O. Henry",                     rating: 5, dateRead: "", genre: ["Classic", "Short Stories"],          language: "English"},
  { title: "I Too Had a Love Story",                                        author: "Ravinder Singh",               rating: 2, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Swaraj",                                                        author: "Arvind Kejriwal",              rating: 3, dateRead: "", genre: ["Non-fiction"],                       language: "Hindi"},
  { title: "Ek Gadhe Ki Atmakatha",                                         author: "Krishan Chander",              rating: 5, dateRead: "", genre: ["Hindi Fiction", "Classic"],         language: "Hindi"},
  { title: "Ek Gadhe Ki Wapsi",                                             author: "Krishan Chandar",              rating: 5, dateRead: "", genre: ["Hindi Fiction", "Classic"],         language: "Hindi"},
  { title: "Brida",                                                         author: "Paulo Coelho",                 rating: 2, dateRead: "", genre: ["Literary Fiction"],                  language: "English"},
  { title: "Eleven Minutes",                                                author: "Paulo Coelho",                 rating: 2, dateRead: "", genre: ["Literary Fiction", "Romance"],       language: "English"},
  { title: "Hunkar",                                                        author: "Ramdhari Singh Dinkar",        rating: 3, dateRead: "", genre: ["Poetry"],                            language: "Hindi"},
  { title: "Rashmirathi",                                                   author: "Ramdhari Singh Dinkar",        rating: 5, dateRead: "", genre: ["Poetry"],                            language: "Hindi"},
  { title: "Fifty Shades of Grey",                                          author: "E.L. James",                   rating: 3, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Fifty Shades Darker",                                           author: "E.L. James",                   rating: 3, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Fifty Shades Freed",                                            author: "E.L. James",                   rating: 3, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Oliver Twist",                                                  author: "Charles Dickens",              rating: 3, dateRead: "", genre: ["Classic"],                           language: "English"},
  { title: "The Prophet",                                                   author: "Kahlil Gibran",                rating: 5, dateRead: "", genre: ["Poetry", "Philosophy"],              language: "English"},
  { title: "Animal Farm",                                                   author: "George Orwell",                rating: 5, dateRead: "", genre: ["Classic"],                           language: "English"},
  { title: "1984",                                                          author: "George Orwell",                rating: 5, dateRead: "", genre: ["Classic", "Dystopian"],              language: "English"},
  { title: "Harry Potter and the Sorcerer's Stone",                         author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Harry Potter and the Chamber of Secrets",                       author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Harry Potter and the Prisoner of Azkaban",                      author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Harry Potter and the Goblet of Fire",                           author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Harry Potter and the Order of the Phoenix",                     author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Harry Potter and the Half-Blood Prince",                        author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Harry Potter and the Deathly Hallows",                          author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English"},
  { title: "Twilight (Twilight Saga, #1)",                                  author: "Stephenie Meyer",              rating: 5, dateRead: "", genre: ["Fantasy", "Romance", "Young Adult"], language: "English"},
  { title: "Wings of Fire: An Autobiography",                               author: "A.P.J. Abdul Kalam",           rating: 5, dateRead: "", genre: ["Biography"],                         language: "English"},
  { title: "The Alchemist",                                                 author: "Paulo Coelho",                 rating: 3, dateRead: "", genre: ["Literary Fiction", "Philosophy"],    language: "English"},
  { title: "The Fault in Our Stars",                                        author: "John Green",                   rating: 3, dateRead: "", genre: ["Young Adult", "Romance"],            language: "English"},
  { title: "The Immortals of Meluha (Shiva Trilogy, #1)",                   author: "Amish Tripathi",               rating: 3, dateRead: "", genre: ["Mythology", "Fantasy"],              language: "English"},
  { title: "The Secret of the Nagas (Shiva Trilogy, #2)",                   author: "Amish Tripathi",               rating: 3, dateRead: "", genre: ["Mythology", "Fantasy"],              language: "English"},
  { title: "The Oath of the Vayuputras (Shiva Trilogy, #3)",                author: "Amish Tripathi",               rating: 3, dateRead: "", genre: ["Mythology", "Fantasy"],              language: "English"},
  { title: "2 States: The Story of My Marriage",                            author: "Chetan Bhagat",                rating: 3, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Revolution 2020: Love, Corruption, Ambition",                   author: "Chetan Bhagat",                rating: 3, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "The 3 Mistakes of My Life",                                     author: "Chetan Bhagat",                rating: 2, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Half Girlfriend",                                               author: "Chetan Bhagat",                rating: 2, dateRead: "", genre: ["Romance"],                           language: "English"},
  { title: "Can Love Happen Twice?",                                        author: "Ravinder Singh",               rating: 1, dateRead: "", genre: ["Romance"],                           language: "English"},

];
