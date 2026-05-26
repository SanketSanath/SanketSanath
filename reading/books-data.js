/**
 * books-data.js — Reading list
 *
 * Each entry:
 *   title    {string}  Book title
 *   author   {string}  Author name
 *   rating   {number}  0–5  (0 = not rated; supports decimals e.g. 4.5)
 *   dateRead {string}  "YYYY/MM/DD" or "" if unknown
 *
 * To add a new book: copy any entry as a template and paste it at the
 * very top of the BOOKS array (inside the brackets, before the first entry).
 * ─────────────────────────────────────────────────────────────────────────
 */

const BOOKS = [

  // ── 2026 ─────────────────────────────────────────────────────────────
  { title: "Nirmala (Hindi)",                                              author: "Munshi Premchand",             rating: 5, dateRead: "2026/05/10" },
  { title: "Murder on the Orient Express (Hercule Poirot, #10)",           author: "Agatha Christie",              rating: 5, dateRead: "2026/05/02" },
  { title: "The Murder of Roger Ackroyd (Hercule Poirot, #4)",             author: "Agatha Christie",              rating: 5, dateRead: "2026/04/19" },
  { title: "Siddhartha",                                                    author: "Hermann Hesse",                rating: 5, dateRead: "2026/04/12" },
  { title: "सूरज का सातवाँ घोड़ा",                                         author: "Dharamvir Bharati",            rating: 5, dateRead: "2026/04/04" },
  { title: "And Then There Were None",                                      author: "Agatha Christie",              rating: 5, dateRead: "2026/03/28" },
  { title: "White Nights",                                                  author: "Fyodor Dostoevsky",            rating: 3, dateRead: "2026/03/14" },
  { title: "Musafir Café",                                                  author: "Divya Prakash Dubey",          rating: 4, dateRead: "2026/03/02" },
  { title: "The Stranger",                                                  author: "Albert Camus",                 rating: 3, dateRead: "2026/02/21" },
  { title: "अक्टूबर जंक्शन",                                               author: "Divya Prakash Dubey",          rating: 2, dateRead: "2026/02/28" },
  { title: "The Girl with the Dragon Tattoo (Millennium, #1)",              author: "Stieg Larsson",                rating: 5, dateRead: "2026/02/10" },

  // ── 2025 ─────────────────────────────────────────────────────────────
  { title: "A Thousand Splendid Suns",                                      author: "Khaled Hosseini",              rating: 5, dateRead: "2025/08/14" },
  { title: "गुनाहों का देवता",                                              author: "Dharamvir Bharati",            rating: 5, dateRead: "2025/08/11" },

  // ── 2022 ─────────────────────────────────────────────────────────────
  { title: "Jujutsu Kaisen 0",                                              author: "Gege Akutami",                 rating: 5, dateRead: "2022/01/01" },

  // ── 2021 ─────────────────────────────────────────────────────────────
  { title: "The Richest Man in Babylon: Six Laws of Wealth",                author: "Charles Conrad",               rating: 4, dateRead: "2021/11/27" },
  { title: "Chaurasi / चौरासी / 84",                                        author: "Satya Vyas",                   rating: 4, dateRead: "2021/07/11" },

  // ── 2020 ─────────────────────────────────────────────────────────────
  { title: "आनन्द मठ",                                                      author: "Bankim Chandra Chattopadhyay", rating: 4, dateRead: "2020/04/29" },
  { title: "Flowers for Algernon",                                          author: "Daniel Keyes",                 rating: 5, dateRead: "2020/04/22" },
  { title: "Konark",                                                        author: "Nimmy Chacko",                 rating: 3, dateRead: "2020/08/08" },
  { title: "Vaishno Devi",                                                  author: "Aruna Balakrishna Singh",      rating: 3, dateRead: "2020/08/08" },
  { title: "The Da Vinci Code (Robert Langdon, #2)",                        author: "Dan Brown",                    rating: 4, dateRead: "2020/02/15" },
  { title: "Rangila Rasul",                                                 author: "M.A. Chamupati",               rating: 5, dateRead: "2020/01/07" },

  // ── 2019 ─────────────────────────────────────────────────────────────
  { title: "The Bourne Identity (Jason Bourne, #1)",                        author: "Robert Ludlum",                rating: 4, dateRead: "2019/12/21" },
  { title: "True Blue",                                                     author: "David Baldacci",               rating: 3, dateRead: "2019/12/16" },

  // ── 2017 ─────────────────────────────────────────────────────────────
  { title: "Life is What You Make It",                                      author: "Preeti Shenoy",                rating: 2, dateRead: "2017/03/09" },

  // ── 2015 ─────────────────────────────────────────────────────────────
  { title: "Lolita",                                                        author: "Vladimir Nabokov",             rating: 4, dateRead: "2015/10/01" },

  // ── Date Unknown ─────────────────────────────────────────────────────
  { title: "Steve Jobs",                                                    author: "Walter Isaacson",              rating: 5, dateRead: "" },
  { title: "War and Peace",                                                 author: "Leo Tolstoy",                  rating: 5, dateRead: "" },
  { title: "Our Moon Has Blood Clots: The Exodus of the Kashmiri Pandits",  author: "Rahul Pandita",                rating: 5, dateRead: "" },
  { title: "Kafka on the Shore",                                            author: "Haruki Murakami",              rating: 4, dateRead: "" },
  { title: "Who Will Cry When You Die?",                                    author: "Robin Sharma",                 rating: 4, dateRead: "" },
  { title: "One Night at the Call Center",                                  author: "Chetan Bhagat",                rating: 3, dateRead: "" },
  { title: "Fifty Shades Trilogy Boxed Set (Fifty Shades, #1-3)",           author: "E.L. James",                   rating: 2, dateRead: "" },
  { title: "Jaag Uthi Nari Shakti",                                         author: "Kiran Bedi",                   rating: 5, dateRead: "" },
  { title: "Great Russian Short Stories",                                   author: "Paul Negri",                   rating: 4, dateRead: "" },
  { title: "Gandhi: His Life and Message for the World",                    author: "Louis Fischer",                rating: 0, dateRead: "" },
  { title: "Chanakya Niti",                                                 author: "Chanakya",                     rating: 4, dateRead: "" },
  { title: "Beware of Socialism",                                           author: "Osho",                         rating: 0, dateRead: "" },
  { title: "Gulliver's Travels",                                            author: "Jonathan Swift",               rating: 3, dateRead: "" },
  { title: "The Last Leaf",                                                 author: "O. Henry",                     rating: 5, dateRead: "" },
  { title: "I Too Had a Love Story",                                        author: "Ravinder Singh",               rating: 2, dateRead: "" },
  { title: "Swaraj",                                                        author: "Arvind Kejriwal",              rating: 3, dateRead: "" },
  { title: "एक गधे की वापसी",                                               author: "Krishan Chandar",              rating: 5, dateRead: "" },
  { title: "एक गधे की आत्मकथा",                                             author: "Krishan Chander",              rating: 5, dateRead: "" },
  { title: "Brida",                                                         author: "Paulo Coelho",                 rating: 2, dateRead: "" },
  { title: "Eleven Minutes",                                                author: "Paulo Coelho",                 rating: 2, dateRead: "" },
  { title: "हुंकार",                                                         author: "Ramdhari Singh 'Dinkar'",      rating: 3, dateRead: "" },
  { title: "रश्मिरथी",                                                       author: "Ramdhari Singh 'Dinkar'",      rating: 5, dateRead: "" },
  { title: "Fifty Shades of Grey (Fifty Shades, #1)",                       author: "E.L. James",                   rating: 3, dateRead: "" },
  { title: "Fifty Shades Darker (Fifty Shades, #2)",                        author: "E.L. James",                   rating: 3, dateRead: "" },
  { title: "Fifty Shades Freed (Fifty Shades, #3)",                         author: "E.L. James",                   rating: 3, dateRead: "" },
  { title: "Oliver Twist",                                                  author: "Charles Dickens",              rating: 3, dateRead: "" },
  { title: "The Prophet",                                                   author: "Kahlil Gibran",                rating: 5, dateRead: "" },
  { title: "Animal Farm",                                                   author: "George Orwell",                rating: 5, dateRead: "" },
  { title: "1984",                                                          author: "George Orwell",                rating: 5, dateRead: "" },
  { title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",      author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Harry Potter and the Chamber of Secrets (Harry Potter, #2)",    author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)",   author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Harry Potter and the Goblet of Fire (Harry Potter, #4)",        author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Harry Potter and the Order of the Phoenix (Harry Potter, #5)",  author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Harry Potter and the Half-Blood Prince (Harry Potter, #6)",     author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Harry Potter and the Deathly Hallows (Harry Potter, #7)",       author: "J.K. Rowling",                 rating: 5, dateRead: "" },
  { title: "Twilight (Twilight Saga, #1)",                                  author: "Stephenie Meyer",              rating: 5, dateRead: "" },
  { title: "Wings of Fire: An Autobiography",                               author: "A.P.J. Abdul Kalam",           rating: 5, dateRead: "" },
  { title: "The Alchemist",                                                 author: "Paulo Coelho",                 rating: 3, dateRead: "" },
  { title: "The Fault in Our Stars",                                        author: "John Green",                   rating: 3, dateRead: "" },
  { title: "The Immortals of Meluha (Shiva Trilogy, #1)",                   author: "Amish Tripathi",               rating: 3, dateRead: "" },
  { title: "The Secret of the Nagas (Shiva Trilogy, #2)",                   author: "Amish Tripathi",               rating: 3, dateRead: "" },
  { title: "The Oath of the Vayuputras (Shiva Trilogy, #3)",                author: "Amish Tripathi",               rating: 3, dateRead: "" },
  { title: "2 States: The Story of My Marriage",                            author: "Chetan Bhagat",                rating: 3, dateRead: "" },
  { title: "Revolution 2020: Love, Corruption, Ambition",                   author: "Chetan Bhagat",                rating: 3, dateRead: "" },
  { title: "The 3 Mistakes of My Life",                                     author: "Chetan Bhagat",                rating: 2, dateRead: "" },
  { title: "Half Girlfriend",                                               author: "Chetan Bhagat",                rating: 2, dateRead: "" },
  { title: "Can Love Happen Twice?",                                        author: "Ravinder Singh",               rating: 1, dateRead: "" },

];

