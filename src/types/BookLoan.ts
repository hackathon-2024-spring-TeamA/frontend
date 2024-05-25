export interface BookInformation {
  title: string;
  image_path: string;
}

export interface Book {
  book_information: BookInformation;
}

export interface BookLoan {
  id: string;
  book: Book;
  rent_date: string;
  due_date: string;
}
