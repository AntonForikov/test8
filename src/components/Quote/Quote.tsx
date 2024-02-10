import React from 'react';
import {Link} from 'react-router-dom';
import {QuoteType} from '../../types';
interface Props {
  quote: QuoteType
  onClick: (id: string) => void
}

const Quote: React.FC<Props> = ({quote, onClick}) => {
  return (
    <div key={Math.random()} className="card mt-3">
      <div className="card-body">
        <h4>{`"${quote.text}"`} - {quote.author}</h4>
        <Link className="btn btn-primary me-2" to={`/quote/${quote.id}/edit`}>Edit</Link>
        <button className="btn btn-danger" onClick={() => onClick(quote.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Quote;