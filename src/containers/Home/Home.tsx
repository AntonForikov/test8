import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';

import {ApiQuotes, Quote} from '../../types';
import {Link} from 'react-router-dom';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.get<ApiQuotes | null>('/quotes.json');
      const quotesApi = response.data;

      if (!quotesApi) {
        alert("This endpoint is empty.");
      }

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

  return (<>
    {isLoading ? <Spinner/> :
      <>
        <h1>All</h1>
        {quotes.map(quote => {
          return (
            <div key={Math.random()} className="card mt-3">
              <div className="card-body">
                <h4>{`"${quote.text}"`} - {quote.author}</h4>
                <Link className="btn btn-primary me-2" to={`/quote/${quote.id}/edit`}>Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteQuote(quote.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </>
    }
  </>);
};
export default Home;