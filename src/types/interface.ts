export interface BookInformation {
  id: number;
  isbn_number: number;
  title: string;
  author: string;
  published_date: Date;
  description: string;
  image_path: string;
}

export interface Book {
  id: number;
  user_id: string;
  book_information: BookInformation;
  donation_date: Date;
}

export interface BookRequest {
  id: string;
  book: Book;
  requester_id: string;
  holder_id: string;
  request_date: Date;
  status: "requested" | "sending" | "arrived";
}

export interface PaginationData {
  totalCount: number;
  currentPage: number;
  perPage: number;
  bookRequests: BookRequest[];
}

// 下記検索機能で追加
export interface Book {
  latest_book_loan: BookLoan | null;
  latest_book_request: BookRequest | null;
}

export interface BookLoan {
  id: string;
  user_id: string;
  book_id: number;
  rent_date: Date;
  due_date: Date;
  return_date: Date | null;
  is_held: boolean;
}

export interface SearchPaginationData {
  totalCount: number;
  currentPage: number;
  perPage: number;
  books: Book[];
}
