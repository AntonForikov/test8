import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';

import {ApiQuotes, QuoteType, SelectOptions} from '../../types';
import Category from '../../components/Category/Category';
import Quote from '../../components/Quote/Quote';

interface Props {
  selectOptions: SelectOptions[]
}
const Home: React.FC<Props> = ({selectOptions}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<QuoteType[]>([]);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get<ApiQuotes | null>('/quotes.json');
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
    void getData();
  }, [getData]);

  const deleteQuote = async (id: string) => {
    await axiosAPI.delete('/quotes/' + id + '.json');
    void getData();
  };

  return (<div className='d-flex'>
    <Category selectOptions={selectOptions} />

    {isLoading ? <Spinner/> : quotes.length > 0 ?
      <div>
        <h1>All</h1>
        {quotes.map(quote => <Quote key={Math.random()} quote={quote} onClick={() => deleteQuote(quote.id)}/>)}
      </div>
      : <h1>There is no quotes</h1>
    }
  </div>);
};
export default Home;