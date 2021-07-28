import gql from 'graphql-tag'


export const categories = gql`
    query {
        categories {
            id
            name
            slug
            icon
            img 
        }
    }
`

export const category = gql`
    query($id:ID!){
        category(id:$id){
        name
        id
        descripcion
    }
  }
`