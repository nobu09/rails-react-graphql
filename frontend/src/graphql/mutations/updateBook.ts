import { gql } from '@apollo/client';

export default gql`
  mutation updateBook($id: ID!, $params: BookAttrubutes!) {
    updateBook(id: $id, params: $params) {
      id
      title
    }
  }
`;