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
    };
  }>;
}

interface BookInfo {
  imagePath: string;
  title: string;
  authors: string[];
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
        return {
          imagePath:
            bookInfo.imageLinks?.thumbnail ||
            "https://tech-libra-images.s3.ap-northeast-1.amazonaws.com/book-open-svgrepo-com.svg",
          title: bookInfo.title,
          authors: bookInfo.authors || ["Unknown Author"],
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
export const fetchBooksByIsbn = async (isbn: string) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}`);
    const data = response.data;
    if (data.items && data.items.length > 0) {
      const bookInfo = data.items[0].volumeInfo;
      return {
        imagePath:
          bookInfo.imageLinks?.thumbnail ||
          "https://tech-libra-images.s3.ap-northeast-1.amazonaws.com/book-open-svgrepo-com.svg",
        title: bookInfo.title,
        authors: bookInfo.authors || ["Unknown Author"],
      };
    } else {
      throw new Error("Book not found");
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
};
