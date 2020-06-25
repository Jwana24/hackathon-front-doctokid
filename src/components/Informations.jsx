import React, {useState, useEffect} from 'react';
import Axios from 'axios';

import './Informations.css';

const Informations = () => {
  const [ deseases, setDeseases ] = useState([]);
  const [ mail, setMail ] = useState({});

  // get deseases by name in the database
  useEffect(() => {
    Axios({
      method: 'GET',
      url: 'http://localhost:3000/api/deseases?name=La+varicelle+enfantine', // `http://localhost:3000/api/deseases?name=${name}`
      data: deseases
    })
    .then(res => res.data)
    .then(data => setDeseases(data))
  }, []);

  // handle form
  const handleChange = (e) => {
    setMail({
      ...mail,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: 'POST',
      url: 'http://localhost:3000/api/send',
      data: deseases
    })
    .then(res => {
      if (res.data.status === 'success'){
        alert("Message Sent.");
      }else if(res.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })
    .catch(err => console.log(err));
  };

  return(
    <div className="Info">
      <div className="ContainerInfoTitle">
        <h1 className="InfoTitle">Informations</h1>
      </div>
      <div className="DeseaseContainer">
        <div className="InfoBody">
          {deseases.map((desease, id) => (
            <>
              <div key={id} className="ContainerDesease">
                <section className="ContainerText">
                  <h2 className="InfoNameDesease">{desease.name}</h2>
                  <div className="ContainerContentText">
                    <article className="ContainerTextElement">{desease.text}</article>
                  </div>
                </section>
                <section  className="InfoMedia">
                  <iframe className="InfoMediaBody" type="text/html" src={desease.video} allowFullScreen />
                </section>
              </div>
            </>
          ))}
          <div>
            <h2 className="InfoMail">Je voudrais recevoir ce contenu par mail :</h2>
            <form className="ContainerForm" onSubmit={handleSubmit}>
              <input className="FormEmailElement" name="email" value={mail.email} onChange={handleChange} />
              <input className="FormSubmitElement" name="submit" value="Recevoir" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informations;