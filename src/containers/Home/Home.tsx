import React, {useCallback, useEffect, useState} from 'react';
import axiosAPI from '../../axiosAPI';
import Spinner from '../../components/Spinner/Spinner';

import {ApiQuotes, Quote} from '../../types';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const getData = useCallback(async () => {
    try {
      const response = await axiosAPI.get<ApiQuotes | null>('/quotes.json');
      const quotesApi = response.data;

      console.log(quotesApi);

      if (!quotesApi) {
        alert("This endpoint is empty.");
      }

      if (quotesApi) {
        setQuotes(Object.keys(quotesApi).map((id) => ({
          ...quotesApi[id],
          id
        })));
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

  return (<>
    {isLoading ? <Spinner/> :
      <>
        {quotes.map(quote => {
          return (
            <div key={Math.random()} className="card mt-3">
              <div className="card-body">
                <h4>{`"${quote.text}"`} - {quote.author}</h4>
                {/*<Link className="btn btn-primary" to={`/posts/${post.id}`}>Read more &gt;&gt;</Link>*/}
              </div>
            </div>
          );
        })}
      </>
    }
  </>);
};
export default Home;