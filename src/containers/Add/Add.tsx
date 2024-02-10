import React, {useCallback, useEffect, useState} from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axiosAPI from '../../axiosAPI';
import {useNavigate, useParams} from 'react-router-dom';
import {ApiQuote} from '../../types';

interface Props {
  edit: boolean
}

const Add: React.FC<Props> = ({edit}) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<ApiQuote>({
    category: '',
    author: '',
    text: ''
  });

  const selectOptions = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Motivational', id: 'motivational'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humor', id: 'humor'},
    {title: 'Famous people', id: 'famous-people'},
  ];

  const quoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    console.log(name, value);

    setQuote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (edit) {
    const setCurrentQuote = useCallback(async  () => {
        const currentQuote = await axiosAPI.get<ApiQuote | null>(`/posts/${params.id}.json`);
        if (currentQuote.data) {
          setQuote(currentQuote.data);
        }
      }, [params.id]);

    useEffect(() => {
      void setCurrentQuote();
    }, [setCurrentQuote]);
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!edit) {
        await axiosAPI.post('/quotes.json', quote);
      } else if (edit) {
        await axiosAPI.put('/quotes/' + params.id + '.json', quote);
      }
    } catch {
      alert ('Please check URL.');
    } finally {
      setLoading(false);
    }
    setQuote(prevState => ({...prevState, post: '', date: ''}));
    navigate('/');
  };

  return (<>
    {
      loading ? <Spinner/> :
        <form className="mt-2" onSubmit={onFormSubmit}>
          <h1>Submit new quote</h1>

          <label htmlFor='select'>Category:</label>
          <select
            className="form-select mb-3"
            id='select'
            name='category'
            value={quote.category}
            onChange={quoteChange}
            required
          >
            <option value=''>--Select category--</option>
            {selectOptions.map((option) => <option key={Math.random()}>{option.title}</option>)}
          </select>

          <label htmlFor="title">Author: </label>
          <input
            type="text"
            className="form-control mb-3"
            id="title"
            name="author"
            value={quote.author}
            onChange={quoteChange}
            required
          />

          <label htmlFor="text">Quote text:</label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            value={quote.text}
            onChange={quoteChange}
            required
          />
          <button type="submit" className="btn btn-primary mt-3">Save</button>
        </form>
    }
  </>);
};

export default Add;