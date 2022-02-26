import React from 'react';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with ?</h1>
        <p>Please select an option from the list below</p>
      </section>
      <Link to='/new-ticket'>
        <button className='btn btn-reverse btn-block'>
          <FaQuestionCircle /> New Ticket
        </button>
      </Link>
      <Link to='/tickets'>
        <button className='btn btn-block'>
          <FaTicketAlt /> View My Tickets
        </button>
      </Link>
    </>
  );
}

export default Home;
