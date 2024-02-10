export interface ApiQuote {
  text: string,
  author: string,
  category: string
}

export interface Quote extends ApiQuote {
  id: string
}

export interface ApiQuotes extends ApiQuote {
  [id: string]: ApiQuote
}