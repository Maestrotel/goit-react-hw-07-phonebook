import { ContactItem } from './ContactItem/ContactItem';
import css from '../ContactList/ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/contacts/selectors';
import { getContactsThunk } from 'redux/thunks/contactsThunk';
import { useEffect } from 'react';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.namesList}>
      {filteredContacts.map(({ id, name, number }) => (
        <ContactItem id={id} key={id} name={name} number={number} />
      ))}
    </ul>
  );
};
