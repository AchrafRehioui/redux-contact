const initialState = {
    contacts: [
        {
          id: 1,
          name: 'Achraf1',
          email: 'test1@test.fr',
          phone: '1234'
        },
        {
          id: 2,
          name: 'Achraf2',
          email: 'test2@test.fr',
          phone: '2234'
        },
        {
          id: 3,
          name: 'Achraf3',
          email: 'test3@test.fr',
          phone: '3234'
        },
        {
          id: 4,
          name: 'Achraf4',
          email: 'test4@test.fr',
          phone: '4234'
        }
      ]
};

export default function(state= initialState, action){
    switch(action.type) {
        case 'GET_CONTACTS': 
        return {
          ...state
        }
        case 'DELETE_CONTACT':
        return {
          ...state,
          contacts: state.contacts.filter(contact => contact.id !== action.payload )
        }
        case 'ADD_CONTACT':
        return {
          ...state,
          contacts: [action.payload, ...state.contacts]
        }  
        default: {
            return state;
        }
            
    }
}