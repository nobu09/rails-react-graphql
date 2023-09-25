import React, { useState } from 'react';
import './App.css';
import { useBooksQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation } from './graphql/generated';

function App() {
  const { data: { books = [] } = {} } = useBooksQuery();
  const [createBook] = useCreateBookMutation({refetchQueries: ['books']})
  const [title, setTitle] = useState('');
  const [deleteBook] = useDeleteBookMutation({refetchQueries: ['books']})
  const [updateBook] = useUpdateBookMutation({refetchQueries: ['books']})

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <button
        onClick={() => {
          createBook({ variables: { params: { title: title }}});
          setTitle('');
        }}>
        保存
      </button>

      <div>
        {books.map((book) => (
          <div key={book.id}>
            <div>{book.title}</div>
            <input value={book.title || ""} onChange={(e) => updateBook({ variables: { id: book.id, params: { title: e.target.value } } })} />
            <button onClick={() => deleteBook({ variables: { id : book.id }})}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
