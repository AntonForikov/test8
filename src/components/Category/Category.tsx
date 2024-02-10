import React, {useCallback, useEffect, useState} from 'react';
import {QuoteType, SelectOptions} from '../../types';
import axiosAPI from '../../axiosAPI';
import {NavLink, useParams} from 'react-router-dom';
import Quote from '../Quote/Quote';
import Spinner from '../Spinner/Spinner';

interface Props {
  selectOptions: SelectOptions[]
}

const Category: React.FC<Props> = ({selectOptions}) => {
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<QuoteType[]>([]);

  const getDataByCategory = useCallback(async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get(`/quotes.json?orderBy="category"&equalTo="${id}"`);
      const quotesApi = response.data;

      if (quotesApi) {
        setQuotes(Object.keys(quotesApi).map((id) => ({
          ...quotesApi[id],
          id
        })).reverse());
      } else {
        setQuotes([]);
      }
    } catch {
      alert ('Please check requested URL.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (param.categoryId) {
      void getDataByCategory(param.categoryId);
    }
  }, [param.categoryId, getDataByCategory]);

  const deleteQuote = async (id: string) => {
    await axiosAPI.delete('/quotes/' + id + '.json');
    void getDataByCategory(param.categoryId);
  };

  if (isLoading) return <Spinner />;

  if (!quotes) return <h1>Category not found</h1>;

  return (
    <div>
      <NavLink to={`/`} className="d-block">All</NavLink>
      {selectOptions.map(link => <NavLink className='d-block' to={`/quote/${link.id}`} key={Math.random()}>{link.title}</NavLink>)}
      <h1>{param.categoryId}</h1>
      {quotes.map(quote => <Quote key={Math.random()} quote={quote} onClick={() =>deleteQuote(quote.id)} />)}
    </div>
  );
};

export default Category;