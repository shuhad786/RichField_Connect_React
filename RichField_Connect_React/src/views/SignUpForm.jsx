import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProfilePreview from '../components/ProfilePreview';

const AVAILABLE_INTERESTS = ['Programming', 'Design', 'Data Science', 'Networking', 'Cybersecurity'];
const CAMPUSES = ['Auckland Park', 'Durban', 'Pretoria', 'Cape Town'];

export default function SignUpForm() {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    studentNumber: '',
    campus: '',
    email: '',
    password: '',
    confirmPassword: '',
    interests: [],
    bio: '',
    terms: false
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = '';
    switch (name) {
      case 'fullName':
        if (!value.trim()) errorMsg = 'Full Name is required.';
        break;
      case 'studentNumber':
        if (!/^\d{6,}$/.test(value)) errorMsg = 'Must be numeric and at least 6 digits.';
        break;
      case 'campus':
        if (!value) errorMsg = 'Please select a campus.';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Enter a valid email address.';
        break;
      case 'password':
        if (value.length < 8) errorMsg = 'Password must be at least 8 characters.';
        break;
      case 'confirmPassword':
        if (value !== formData.password) errorMsg = 'Passwords do not match.';
        break;
      case 'interests':
        if (value.length === 0) errorMsg = 'Select at least one interest.';
        break;
      case 'bio':
        if (value.trim().length < 20) errorMsg = 'Bio must be at least 20 characters.';
        break;
      case 'terms':
        if (!value) errorMsg = 'You must accept the terms and conditions.';
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'interests') {
      const updatedInterests = checked
        ? [...formData.interests, value]
        : formData.interests.filter(i => i !== value);
      setFormData(prev => ({ ...prev, interests: updatedInterests }));
      validateField('interests', updatedInterests);
    } else if (type === 'checkbox' && name === 'terms') {
      setFormData(prev => ({ ...prev, terms: checked }));
      validateField('terms', checked);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'interests') validateField('interests', formData.interests);
    else if (name === 'terms') validateField('terms', formData.terms);
    else validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(formData).forEach(key => validateField(key, formData[key]));

    const hasErrors = Object.values(errors).some(err => err !== '') ||
      !formData.fullName || !formData.studentNumber || !formData.terms || formData.interests.length === 0;

    if (!hasErrors) {
      dispatch({ type: 'REGISTER_USER', payload: formData });
      navigate('/profile');
    }
  };

  return (
    <div className="signup-layout">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Student Registration</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Student Number</label>
          <input type="text" name="studentNumber" value={formData.studentNumber} onChange={handleChange} onBlur={handleBlur} />
          {errors.studentNumber && <span className="error-text">{errors.studentNumber}</span>}
        </div>

        <div className="form-group">
          <label>Campus</label>
          <select name="campus" value={formData.campus} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select Campus</option>
            {CAMPUSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.campus && <span className="error-text">{errors.campus}</span>}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={handleBlur} />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
          {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label>Academic Interests</label>
          <div className="checkbox-group">
            {AVAILABLE_INTERESTS.map(interest => (
              <label key={interest} className="checkbox-label">
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {interest}
              </label>
            ))}
          </div>
          {errors.interests && <span className="error-text">{errors.interests}</span>}
        </div>

        <div className="form-group">
          <label>Short Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} onBlur={handleBlur} />
          {errors.bio && <span className="error-text">{errors.bio}</span>}
        </div>

        <div className="form-group checkbox-label">
          <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} onBlur={handleBlur} />
          <label>I accept Terms & Conditions</label>
          {errors.terms && <span className="error-text">{errors.terms}</span>}
        </div>

        <button type="submit" className="btn-primary">Register Now</button>
      </form>

      <ProfilePreview formData={formData} />
    </div>
  );
}