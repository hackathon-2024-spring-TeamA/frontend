import axios from "axios";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

// Google Books APIのレスポンス型定義
interface GoogleBooksApiResponse {
  items: Array<{
    volumeInfo: {
      imageLinks?: {
        thumbnail?: string;
      };
      title: string;
      authors?: string[];
      industryIdentifiers?: Array<{
        type: string;
        identifier: string;
      }>;
      publishedDate?: string;
      description?: string;
    };
  }>;
}

interface BookInfo {
  imagePath: string;
  title: string;
  authors: string[];
  isbn?: string;
  publishedDate?: string;
  description?: string;
}

// タイトル検索
export const fetchBooksByTitle = async (title: string): Promise<BookInfo[]> => {
  try {
    const response = await axios.get<GoogleBooksApiResponse>(
      `${GOOGLE_BOOKS_API_URL}?q=intitle:${title}`,
    );
    const data = response.data;
    if (data.items && data.items.length > 0) {
      return data.items.map((item) => {
        const bookInfo = item.volumeInfo;
        const isbnInfo = bookInfo.industryIdentifiers?.find(
          (identifier) => identifier.type === "ISBN_13",
        );
        return {
          imagePath:
            bookInfo.imageLinks?.thumbnail ||
            "/src/assets/book-open-svgrepo-com.svg",
          title: bookInfo.title,
          authors: bookInfo.authors || ["Unknown Author"],
          isbn: isbnInfo?.identifier,
          publishedDate: bookInfo.publishedDate,
          description: bookInfo.description,
        };
      });
    } else {
      throw new Error("Books not found");
    }
  } catch (error) {
    console.error("Error fetching books data:", error);
    throw error;
  }
};

// isbn検索
export const fetchBooksByIsbn = async (isbn: string): Promise<BookInfo> => {
  try {
    const response = await axios.get<GoogleBooksApiResponse>(
      `${GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}`,
    );
    const data = response.data;
    if (data.items && data.items.length > 0) {
      const bookInfo = data.items[0].volumeInfo;
      const isbnInfo = bookInfo.industryIdentifiers?.find(
        (identifier) => identifier.type === "ISBN_13",
      );
      return {
        imagePath:
          bookInfo.imageLinks?.thumbnail ||
          "/src/assets/book-open-svgrepo-com.svg",
        title: bookInfo.title,
        authors: bookInfo.authors || ["Unknown Author"],
        isbn: isbnInfo?.identifier,
        publishedDate: bookInfo.publishedDate,
        description: bookInfo.description,
      };
    } else {
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
};
