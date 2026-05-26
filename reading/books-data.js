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
 *   cover    {string}    Cover image URL, or "" to use the gradient placeholder
 *
 * Add a new book at the very top of the BOOKS array (before the first entry).
 * Cover images: Open Library  → https://covers.openlibrary.org/b/isbn/{ISBN}-M.jpg
 *               Goodreads     → https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/{hash}l/{id}._SX98_.jpg
 */

const BOOKS = [

  // -- 2026 --
  { title: "Nirmala (Hindi)",                                              author: "Munshi Premchand",             rating: 5, dateRead: "2026/05/10", genre: ["Classic"],                          language: "Hindi",    cover: "https://covers.openlibrary.org/b/isbn/9388810481-M.jpg"   },
  { title: "Murder on the Orient Express (Hercule Poirot, #10)",           author: "Agatha Christie",              rating: 5, dateRead: "2026/05/02", genre: ["Mystery"],                           language: "English",  cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1779552948l/21099828._SX98_.jpg" },
  { title: "The Murder of Roger Ackroyd (Hercule Poirot, #4)",             author: "Agatha Christie",              rating: 5, dateRead: "2026/04/19", genre: ["Mystery"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0007527527-M.jpg"   },
  { title: "Siddhartha",                                                    author: "Hermann Hesse",                rating: 5, dateRead: "2026/04/12", genre: ["Literary Fiction", "Philosophy"],    language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0141189576-M.jpg"   },
  { title: "Suraj Ka Satvan Ghoda",                                         author: "Dharamvir Bharati",            rating: 5, dateRead: "2026/04/04", genre: ["Literary Fiction"],                  language: "Hindi",    cover: "https://covers.openlibrary.org/b/isbn/9355185790-M.jpg"   },
  { title: "And Then There Were None",                                      author: "Agatha Christie",              rating: 5, dateRead: "2026/03/28", genre: ["Mystery", "Thriller"],               language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0062073563-M.jpg"   },
  { title: "White Nights",                                                  author: "Fyodor Dostoevsky",            rating: 3, dateRead: "2026/03/14", genre: ["Literary Fiction", "Romance"],       language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0241252083-M.jpg"   },
  { title: "Musafir Cafe",                                                  author: "Hind Yugm",                    rating: 4, dateRead: "2026/03/02", genre: ["Short Stories"],                     language: "Hindi",    cover: ""                                                         },
  { title: "The Stranger",                                                  author: "Albert Camus",                 rating: 3, dateRead: "2026/02/21", genre: ["Literary Fiction", "Philosophy"],    language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0679720020-M.jpg"   },
  { title: "October Junction",                                              author: "Divya Prakash Dubey",          rating: 2, dateRead: "2026/02/28", genre: ["Hindi Fiction"],                     language: "Hindi",    cover: ""                                                         },
  { title: "The Girl with the Dragon Tattoo (Millennium, #1)",              author: "Stieg Larsson",                rating: 5, dateRead: "2026/02/10", genre: ["Thriller", "Mystery"],               language: "English",  cover: "https://covers.openlibrary.org/b/isbn/1849162883-M.jpg"   },

  // -- 2025 --
  { title: "A Thousand Splendid Suns",                                      author: "Khaled Hosseini",              rating: 5, dateRead: "2025/08/14", genre: ["Literary Fiction"],                  language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0747582971-M.jpg"   },
  { title: "Gunahon Ka Devta",                                              author: "Dharamvir Bharati",            rating: 5, dateRead: "2025/08/11", genre: ["Romance", "Literary Fiction"],       language: "Hindi",    cover: "https://covers.openlibrary.org/b/isbn/8126317779-M.jpg"   },

  // -- 2022 --
  { title: "Jujutsu Kaisen 0",                                              author: "Gege Akutami",                 rating: 5, dateRead: "2022/01/01", genre: ["Manga"],                             language: "Japanese", cover: "https://covers.openlibrary.org/b/isbn/4088816722-M.jpg"   },

  // -- 2021 --
  { title: "The Richest Man in Babylon: Six Laws of Wealth",                author: "Charles Conrad",               rating: 4, dateRead: "2021/11/27", genre: ["Self Help"],                         language: "English",  cover: ""                                                         },
  { title: "Chaurasi / 84",                                                 author: "Satya Vyas",                   rating: 4, dateRead: "2021/07/11", genre: ["Hindi Fiction"],                     language: "Hindi",    cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1538676076l/42179802._SX98_.jpg" },

  // -- 2020 --
  { title: "Anand Math",                                                    author: "Bankim Chandra Chattopadhyay", rating: 4, dateRead: "2020/04/29", genre: ["Classic"],                           language: "Hindi",    cover: ""                                                         },
  { title: "Flowers for Algernon",                                          author: "Daniel Keyes",                 rating: 5, dateRead: "2020/04/22", genre: ["Sci-Fi", "Literary Fiction"],        language: "English",  cover: "https://covers.openlibrary.org/b/isbn/015603008X-M.jpg"   },
  { title: "Konark",                                                        author: "Nimmy Chacko",                 rating: 3, dateRead: "2020/08/08", genre: ["Mythology"],                         language: "English",  cover: ""                                                         },
  { title: "Vaishno Devi",                                                  author: "Aruna Balakrishna Singh",      rating: 3, dateRead: "2020/08/08", genre: ["Mythology"],                         language: "English",  cover: ""                                                         },
  { title: "The Da Vinci Code (Robert Langdon, #2)",                        author: "Dan Brown",                    rating: 4, dateRead: "2020/02/15", genre: ["Thriller", "Mystery"],               language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0552149519-M.jpg"   },
  { title: "Rangila Rasul",                                                 author: "M.A. Chamupati",               rating: 5, dateRead: "2020/01/07", genre: ["Non-fiction"],                       language: "Hindi",    cover: ""                                                         },

  // -- 2019 --
  { title: "The Bourne Identity (Jason Bourne, #1)",                        author: "Robert Ludlum",                rating: 4, dateRead: "2019/12/21", genre: ["Thriller"],                          language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0752864327-M.jpg"   },
  { title: "True Blue",                                                     author: "David Baldacci",               rating: 3, dateRead: "2019/12/16", genre: ["Thriller", "Mystery"],               language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0330456547-M.jpg"   },

  // -- 2017 --
  { title: "Life is What You Make It",                                      author: "Preeti Shenoy",                rating: 2, dateRead: "2017/03/09", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/9380349300-M.jpg"   },

  // -- 2015 --
  { title: "Lolita",                                                        author: "Vladimir Nabokov",             rating: 4, dateRead: "2015/10/01", genre: ["Literary Fiction", "Classic"],       language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0679723161-M.jpg"   },

  // -- Date Unknown --
  { title: "Steve Jobs",                                                    author: "Walter Isaacson",              rating: 5, dateRead: "", genre: ["Biography"],                         language: "English",  cover: "https://covers.openlibrary.org/b/isbn/1451648537-M.jpg"   },
  { title: "War and Peace",                                                 author: "Leo Tolstoy",                  rating: 5, dateRead: "", genre: ["Classic"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0192833987-M.jpg"   },
  { title: "Our Moon Has Blood Clots",                                      author: "Rahul Pandita",                rating: 5, dateRead: "", genre: ["Non-fiction"],                       language: "English",  cover: "https://covers.openlibrary.org/b/isbn/9351360113-M.jpg"   },
  { title: "Kafka on the Shore",                                            author: "Haruki Murakami",              rating: 4, dateRead: "", genre: ["Literary Fiction"],                  language: "English",  cover: "https://covers.openlibrary.org/b/isbn/1400079276-M.jpg"   },
  { title: "Who Will Cry When You Die?",                                    author: "Robin Sharma",                 rating: 4, dateRead: "", genre: ["Self Help"],                         language: "English",  cover: ""                                                         },
  { title: "One Night at the Call Center",                                  author: "Chetan Bhagat",                rating: 3, dateRead: "", genre: ["Romance"],                           language: "English",  cover: ""                                                         },
  { title: "Fifty Shades Trilogy Boxed Set (Fifty Shades, #1-3)",           author: "E.L. James",                   rating: 2, dateRead: "", genre: ["Romance"],                           language: "English",  cover: ""                                                         },
  { title: "Jaag Uthi Nari Shakti",                                         author: "Kiran Bedi",                   rating: 5, dateRead: "", genre: ["Non-fiction", "Biography"],         language: "Hindi",    cover: ""                                                         },
  { title: "Great Russian Short Stories",                                   author: "Paul Negri",                   rating: 4, dateRead: "", genre: ["Classic", "Short Stories"],          language: "English",  cover: ""                                                         },
  { title: "Gandhi: His Life and Message for the World",                    author: "Louis Fischer",                rating: 0, dateRead: "", genre: ["Biography"],                         language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0451627970-M.jpg"   },
  { title: "Chanakya Niti",                                                 author: "Chanakya",                     rating: 4, dateRead: "", genre: ["Philosophy"],                        language: "Hindi",    cover: ""                                                         },
  { title: "Beware of Socialism",                                           author: "Osho",                         rating: 0, dateRead: "", genre: ["Philosophy"],                        language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0880507063-M.jpg"   },
  { title: "Gulliver's Travels",                                            author: "Jonathan Swift",               rating: 3, dateRead: "", genre: ["Classic"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0141439491-M.jpg"   },
  { title: "The Last Leaf",                                                 author: "O. Henry",                     rating: 5, dateRead: "", genre: ["Classic", "Short Stories"],          language: "English",  cover: ""                                                         },
  { title: "I Too Had a Love Story",                                        author: "Ravinder Singh",               rating: 2, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0143418769-M.jpg"   },
  { title: "Swaraj",                                                        author: "Arvind Kejriwal",              rating: 3, dateRead: "", genre: ["Non-fiction"],                       language: "Hindi",    cover: ""                                                         },
  { title: "Ek Gadhe Ki Wapsi",                                             author: "Krishan Chandar",              rating: 5, dateRead: "", genre: ["Hindi Fiction", "Classic"],         language: "Hindi",    cover: ""                                                         },
  { title: "Ek Gadhe Ki Atmakatha",                                         author: "Krishan Chander",              rating: 5, dateRead: "", genre: ["Hindi Fiction", "Classic"],         language: "Hindi",    cover: ""                                                         },
  { title: "Brida",                                                         author: "Paulo Coelho",                 rating: 2, dateRead: "", genre: ["Literary Fiction"],                  language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0061715085-M.jpg"   },
  { title: "Eleven Minutes",                                                author: "Paulo Coelho",                 rating: 2, dateRead: "", genre: ["Literary Fiction", "Romance"],       language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0007156065-M.jpg"   },
  { title: "Hunkar",                                                        author: "Ramdhari Singh Dinkar",        rating: 3, dateRead: "", genre: ["Poetry"],                            language: "Hindi",    cover: ""                                                         },
  { title: "Rashmirathi",                                                   author: "Ramdhari Singh Dinkar",        rating: 5, dateRead: "", genre: ["Poetry"],                            language: "Hindi",    cover: "https://covers.openlibrary.org/b/isbn/818031362X-M.jpg"   },
  { title: "Fifty Shades of Grey (Fifty Shades, #1)",                       author: "E.L. James",                   rating: 3, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/1612130291-M.jpg"   },
  { title: "Fifty Shades Darker (Fifty Shades, #2)",                        author: "E.L. James",                   rating: 3, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/1612130585-M.jpg"   },
  { title: "Fifty Shades Freed (Fifty Shades, #3)",                         author: "E.L. James",                   rating: 3, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0345803507-M.jpg"   },
  { title: "Oliver Twist",                                                  author: "Charles Dickens",              rating: 3, dateRead: "", genre: ["Classic"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0141439696-M.jpg"   },
  { title: "The Prophet",                                                   author: "Kahlil Gibran",                rating: 5, dateRead: "", genre: ["Poetry", "Philosophy"],              language: "English",  cover: "https://covers.openlibrary.org/b/isbn/000100039X-M.jpg"   },
  { title: "Animal Farm",                                                   author: "George Orwell",                rating: 5, dateRead: "", genre: ["Classic"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0451526341-M.jpg"   },
  { title: "1984",                                                          author: "George Orwell",                rating: 5, dateRead: "", genre: ["Classic", "Dystopian"],              language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0451524934-M.jpg"   },
  { title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",      author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0439554934-M.jpg"   },
  { title: "Harry Potter and the Chamber of Secrets (Harry Potter, #2)",    author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0439064872-M.jpg"   },
  { title: "Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)",   author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/043965548X-M.jpg"   },
  { title: "Harry Potter and the Goblet of Fire (Harry Potter, #4)",        author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0439139597-M.jpg"   },
  { title: "Harry Potter and the Order of the Phoenix (Harry Potter, #5)",  author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0439686520-M.jpg"   },
  { title: "Harry Potter and the Half-Blood Prince (Harry Potter, #6)",     author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0439785960-M.jpg"   },
  { title: "Harry Potter and the Deathly Hallows (Harry Potter, #7)",       author: "J.K. Rowling",                 rating: 5, dateRead: "", genre: ["Fantasy", "Young Adult"],           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0545010225-M.jpg"   },
  { title: "Twilight (Twilight Saga, #1)",                                  author: "Stephenie Meyer",              rating: 5, dateRead: "", genre: ["Fantasy", "Romance", "Young Adult"], language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0316015849-M.jpg"   },
  { title: "Wings of Fire: An Autobiography",                               author: "A.P.J. Abdul Kalam",           rating: 5, dateRead: "", genre: ["Biography"],                         language: "English",  cover: "https://covers.openlibrary.org/b/isbn/8173711461-M.jpg"   },
  { title: "The Alchemist",                                                 author: "Paulo Coelho",                 rating: 3, dateRead: "", genre: ["Literary Fiction", "Philosophy"],    language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0062315005-M.jpg"   },
  { title: "The Fault in Our Stars",                                        author: "John Green",                   rating: 3, dateRead: "", genre: ["Young Adult", "Romance"],            language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0525478817-M.jpg"   },
  { title: "The Immortals of Meluha (Shiva Trilogy, #1)",                   author: "Amish Tripathi",               rating: 3, dateRead: "", genre: ["Mythology", "Fantasy"],              language: "English",  cover: "https://covers.openlibrary.org/b/isbn/9380658747-M.jpg"   },
  { title: "The Secret of the Nagas (Shiva Trilogy, #2)",                   author: "Amish Tripathi",               rating: 3, dateRead: "", genre: ["Mythology", "Fantasy"],              language: "English",  cover: "https://covers.openlibrary.org/b/isbn/9380658745-M.jpg"   },
  { title: "The Oath of the Vayuputras (Shiva Trilogy, #3)",                author: "Amish Tripathi",               rating: 3, dateRead: "", genre: ["Mythology", "Fantasy"],              language: "English",  cover: "https://covers.openlibrary.org/b/isbn/9382618341-M.jpg"   },
  { title: "2 States: The Story of My Marriage",                            author: "Chetan Bhagat",                rating: 3, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/8129115301-M.jpg"   },
  { title: "Revolution 2020: Love, Corruption, Ambition",                   author: "Chetan Bhagat",                rating: 3, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/8129118807-M.jpg"   },
  { title: "The 3 Mistakes of My Life",                                     author: "Chetan Bhagat",                rating: 2, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/8129113724-M.jpg"   },
  { title: "Half Girlfriend",                                               author: "Chetan Bhagat",                rating: 2, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/8129135728-M.jpg"   },
  { title: "Can Love Happen Twice?",                                        author: "Ravinder Singh",               rating: 1, dateRead: "", genre: ["Romance"],                           language: "English",  cover: "https://covers.openlibrary.org/b/isbn/0143417231-M.jpg"   },

];