
import styles from "../styles/Contact.module.css";
import { useState } from "react";



const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
 
    async function postJSON(data) {
      try {
        const response = await fetch("http://localhost:3000/api/postcontact/", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result = await response.json();
    
        alert("Thanks for Contacting Us")
        setName('')
        setEmail('')
        setPhone('')
        setDesc('')
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
    const data = { name,email,phone,desc };
    postJSON(data);
    
  };
  
  const handleChange=(e)=>{
    if(e.target.name==='name'){
      setName(e.target.value)
    }
    else 
    if(e.target.name==='email'){
      setEmail(e.target.value)
    }
    else if(e.target.name==='phone'){
      setPhone(e.target.value)
    }
    else if(e.target.name==='desc'){
      setDesc(e.target.value)
    }
    }
  
  return (
    <>
    <div className={styles.main}> 
    <div className={styles.container}>
        <h1>Contact US</h1>
        <form className={styles.formCont} onSubmit={handleSubmit}>
          <div className={styles.mb3}>
            <label htmlFor="name" className={styles.formlabel}>
              Enter Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleChange}
              value={name}
              aria-describedby="emailHelp"
            />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="email" className={styles.formlabel}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              value={email}
              name="email"
              aria-describedby="emailHelp"
            />
         
          </div>
          <div className={styles.mb3}>
            <label htmlFor="phone" className={styles.formlabel}>
              Phone
            </label>
            <input
              type="phone"
              name="phone"
              onChange={handleChange}
              value={phone}
              className="form-control"
              id="phone"
            />
          </div>
          <div className={styles.mb3}>
            <label htmlFor="floatingTextarea">Elaborate Your Concern</label>
            <textarea
              className="form-control"
              placeholder="Leave a Review here...."
              id="desc"
              onChange={handleChange}
              name="desc"
              value={desc}
            ></textarea>
          </div>
          <button type="submit" className={styles.btnprimary}>
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Contact;
