import { gql } from '@apollo/client';

export const FETCHPRODUCTS = gql`
  query Category($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
      }
    }
  }
`;

export const getProduct = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      brand
      name
      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      inStock
    }
  }
`;
