import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

export default function useBooks() {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    onerror: (error) => console.log('error', error),
  });

  return { loading, error, data };
}
