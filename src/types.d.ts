export interface ApiQuote {
  text: string,
  author: string,
  category: string
}

export interface QuoteType extends ApiQuote {
  id: string
}

export interface ApiQuotes extends ApiQuote {
  [id: string]: ApiQuote
}

export interface SelectOptions {
  id: string,
  title: string
}