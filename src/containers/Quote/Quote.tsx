import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axiosAPI from '../../axiosAPI';

import Spinner from '../../components/Spinner/Spinner';
import {ApiQuote} from '../../types';


const Quote: React.FC = () => {
  const params = useParams();

  const [quote, setQuote] = useState<ApiQuote | null>();
  const [isLoading, setIsLoading] = useState(false);

  const getQuote = useCallback(async () => {
    setIsLoading(true);
    const response = await axiosAPI.get<ApiQuote | null>(`/quotes/${params.id}.json`);
    setQuote(response.data);
    setIsLoading(false);
  }, [params.id]);

  useEffect(() => {
    void getQuote();
  }, [getQuote]);

  // const deletePost = async () => {
  //   await axiosAPI.delete('/quotes/' + params.id + '.json');
  //   navigate('/');
  // };

  return (
    <>
      {isLoading ? <Spinner/> :
        quote && !isLoading ?
          <>
            <div>BLYAAAAAT</div>
            {/*<Add edit={true}/>*/}

            {/*<div className="card mt-3 text-center">*/}
            {/*  <div className="card-body">*/}
            {/*    <span className="text-secondary fs-6">Created at: {format(quote.date, "dd.MM.yy HH.mm")}</span>*/}
            {/*    <h1>{quote.title}</h1>*/}
            {/*    <h4>{quote.description}</h4>*/}
            {/*    <Link className="btn btn-success me-2" to={`/posts/${params.id}/edit`}>Edit</Link>*/}
            {/*    <button*/}
            {/*      className={"btn btn-danger"}*/}
            {/*      onClick={deletePost}*/}
            {/*    >*/}
            {/*      Delete*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<Outlet/>*/}
          </>
          : <h1>No such quote!</h1>
      }
    </>
  );
};

export default Quote;