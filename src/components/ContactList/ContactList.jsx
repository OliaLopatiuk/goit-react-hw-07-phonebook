import { Contact, Button, ListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/phonebookSlice';
import { selectFilter } from '../../redux/phonebookSlice';
import { deleteContact } from '../../redux/operations';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  // const handleDelete = () => dispatch(deleteTask(task.id));

  return (
    <div>
      <ul>
        {filteredContacts.map(contact => (
          <ListItem key={contact.id}>
            <Contact>
              <span>{contact.name}:</span>
              <span>{contact.phone}</span>
              <Button
                type="button"
                onClick={() => dispatch(deleteContact(contact.id))}
                // onClick={() => dispatch(deleteContact(contact.id))}
              >
                ×
              </Button>
            </Contact>
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
