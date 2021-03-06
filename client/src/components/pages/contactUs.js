import React from 'react';
import {FormErrors} from './eventComp';
import fbLogo from '../../../public/images/facebook-logo.svg';
import twitterLogo from '../../../public/images/twitter-logo.svg';
import emailSymbol from '../../../public/images/email-symbol.svg';

class ContactUs extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
    description: '',
    cntWithCommunityAdviser: false,
    trainCommunityAdviser: false,
    formErrors: {name:'', email: '', description: ''},
    nameValid: false,
    emailValid: false,
    descriptionValid: false,
    formValid: false
  }
  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // if(target.type === 'checkbox'){
    // const value = (target.checked)? 'Yes': 'No';
    // }
    // else {
    //   const value =  target.value;
    // }
   
    this.setState({ [target.name]: value }, () => {this.validateField(target.name, value)});
 
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let descriptionValid = this.state.descriptionValid;
console.log('BEFORE SWITCH', this.state.nameValid);
    switch(fieldName) {
      case 'name':
      nameValid = (value.length >=2 ) 
      fieldValidationErrors.name = nameValid ? '' : ' is too short' ;
      break;
      case 'email':
      //negated emailValid twice as (value.match(..)) gives null or some other value, we need to turn that to boolean, true or false for readability
      emailValid = !(!(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ) );
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
      
      case 'description':
      // descriptionValid = (value != '');
      descriptionValid = (value.length >= 5);
      fieldValidationErrors.description = descriptionValid ? '' : ' is too short' ;
      break;

      default:
      break;
    }
    console.log('NAME', name);
    this.setState( {formErrors: fieldValidationErrors,
                    nameValid : nameValid,
                    emailValid : emailValid,
                    descriptionValid: descriptionValid
                  }, this.validateForm );
                  
  }

  validateForm() {
    this.setState( {formValid: this.state.nameValid && this.state.descriptionValid && this.state.emailValid });
  }


  handleSubmit = event => {
    event.preventDefault();
    const data = JSON.stringify({
      startSocialAction: this.state
    });
    console.log('data', data)
    fetch('/api/contactUs', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: data,
    })
      .then(res => console.log(res))
      .catch(err => {
        console.log('ERROR IS', err);
        this.props.history.push('/500error');
      });
      
    this.setState({ name: '', email: '', phone: '', description: '', cntWithCommunityAdviser: false,
    trainCommunityAdviser: false, formErrors: {name:'', email: '', description: ''}, nameValid: false,emailValid: false, descriptionValid: false, formValid: false });
    alert('Thank you, we will get back to you soon');
  }

  render() {
    return (
    <div className='wrapper'>
    <h1>Contact Us</h1>

   <div id='sidebar'>
        <div id='logo-container'>
          <a href='https://www.facebook.com/hanleycrouch/' target='_blank'><img src={fbLogo} id='fb-logo-img' alt='Facebook logo' />
          </a>
          <a href='https://twitter.com/HanleyCrouch' target='_blank'>
          <img src={twitterLogo} id='twitter-logo-img' alt='Twitter logo' />
          </a>
          <a href='mailto:brickworks.web.app@gmail.com'  target='_blank'>
          <img src={emailSymbol} id='email-symbol-img' alt='Email symbol' />
          </a>
        </div>
    </div>

    <main>
      <br/>
    <p className='strong-txt-M'>Please note that <span className='italicised'>Name</span>, <span className='italicised'>Email</span> and <span className='italicised'>Description</span> are required fields</p>
      <form className='main-form' onSubmit={this.handleSubmit}>
        <label className='form-label' htmlFor="name">Name  <span className='red-asterisk'>*</span></label>
        <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
        
        <label className='form-label' htmlFor="email">Email  <span className='red-asterisk'>*</span></label>
        <input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
        
        <label className='form-label' htmlFor="phone">Telephone Number</label>
        <input type="text" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
        
        <label className='form-label' htmlFor="description">Description of Social Action  <span className='red-asterisk'>*</span></label>
        <textarea name="description" id="description" cols="40" rows="10" value={this.state.description} onChange={this.handleChange}></textarea>
       
        <div className='container-M'>
          <p className='strong-txt-M'>Please click on the options that apply</p>

          <div className='checkbox-choices'>
            <span className='running-txt'>&#8226; I want to connect with a local Community Organiser</span>
              <label className="label-checkbox" htmlFor="cntWithCommunityAdviser">
                <input className='checkbox'
                  type="checkbox"
                  id="cntWithCommunityAdviser"
                  name="cntWithCommunityAdviser"
                  checked={this.state.cntWithCommunityAdviser}
                  onChange={this.handleChange}
                />
                </label>
          </div>
            <br/>
          <div className="checkbox-choices">
            <span className='running-txt'>&#8226; I want to train as a Community Organiser
            </span>
              <label className="label-checkbox" htmlFor="trainCommunityAdviser">
                <input className='checkbox'
                  type="checkbox"
                  id="trainCommunityAdviser"
                  name="trainCommunityAdviser"
                  checked={this.state.trainCommunityAdviser}
                  onChange={this.handleChange}
                />
              </label>
          </div>
        </div>
        </form>
        
        <button className="form-button" className="button-large" disabled= { !this.state.formValid} type="submit">Submit</button>
      
    </main>
    <div className='form-errors-container'>
      <FormErrors formErrors={this.state.formErrors} />
    </div>

    </div>
    );
  }
}

export default ContactUs;
