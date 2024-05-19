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
  user_id: number;
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
