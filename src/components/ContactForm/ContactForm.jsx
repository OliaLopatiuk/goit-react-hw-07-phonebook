import { useState } from 'react';
import { Form, Label, Input } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/phonebookSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(selectContacts);

  const handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      default:
        console.log('Not proper name type');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const check = contacts.findIndex(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (!!~check) {
      alert(`${name} is already in contacts`);
      setName('');
      setPhone('');
      return;
    }
    dispatch(addContact({ name, phone }));
    setName('');
    setPhone('');
  };

  return (
    <div>
      <Form action="submit" onSubmit={handleSubmit}>
        <div>
          <Label>
            Name
            <Input
              onChange={handleChange}
              type="text"
              value={name}
              name="name"
              required
            />
          </Label>
        </div>
        <div>
          <Label>
            Number
            <Input
              onChange={handleChange}
              type="tel"
              value={phone}
              name="phone"
            />
          </Label>
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </div>
  );
};
