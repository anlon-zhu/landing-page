import "./contact.scss"
import React from 'react';
import { useState } from "react";
import axios from 'axios';

export default function Contact() {
    const [status, setStatus] = useState({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
    const [inputs, setInputs] = useState({
      email: '',
      name: '',
      message: '',
    });
    const handleServerResponse = (ok, msg) => {
      if (ok) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: msg },
        });
        setInputs({
          email: '',
          name: '',
          message: '',
        });
      } else {
        setStatus({
          info: { error: true, msg: msg },
        });
      }
    };
    const handleOnChange = (e) => {
      e.persist();
      setInputs((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null },
      });
    };
    const handleOnSubmit = (e) => {
      e.preventDefault();
      setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
      axios({
        method: 'POST',
        url: 'https://formspree.io/f/xknylvee',
        data: inputs,
      })
        .then((response) => {
          handleServerResponse(
            true,
            'Thank you, your message has been submitted.',
          );
        })
        .catch((error) => {
          handleServerResponse(false, error.response.data.error);
        });
    };

    return(
        <div className="contact">
            <div className="left">
            <img className="pic" src="https://cdn.dribbble.com/users/2725108/screenshots/9896278/media/530146ce12252698ba2d11de02d48151.png" alt="" />
            </div>
    
            <div className="right">
            <h2>Contact</h2>
        
            <form onSubmit={handleOnSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="name"
              name="name"
              onChange={handleOnChange}
              required
              value={inputs.name}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="_replyto"
              onChange={handleOnChange}
              required
              value={inputs.email}
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              onChange={handleOnChange}
              required
              value={inputs.message}
            />
            <button type="submit" disabled={status.submitting}>
              {!status.submitting
                ? !status.submitted
                  ? 'Submit'
                  : 'Submitted'
                : 'Submitting...'}
            </button>
          </form>
          {status.info.error && (
            <div className="error">Error: {status.info.msg}</div>
          )}
          {!status.info.error && status.info.msg && <p>{status.info.msg}</p>}
            </div>
        </div>
      );
}
