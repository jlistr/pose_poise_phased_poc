import { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 4h-3a4 4 0 00-4 4v12M6 12h8" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12a4 4 0 104 4V2a5 5 0 005 5v3a8 8 0 01-5-3v9" />
  </svg>
);

const XIconSocial = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4l6 8m6-8l-12 16m16 0l-6-8" />
  </svg>
);

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    professionalName: '',
    overline: '',
    bio: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    twitter: '',
    hourlyRate: '',
    dayRate: '',
    services: '',
    height: '',
    bust: '',
    waist: '',
    hips: '',
    shoeSize: '',
    hairColor: '',
    eyeColor: '',
    images: []
  });

  const steps = [
    { id: 0, name: 'Identity', required: true },
    { id: 1, name: 'Rates & Services', required: false },
    { id: 2, name: 'Measurements', required: false },
    { id: 3, name: 'Asset Library', required: true }
  ];

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return formData.professionalName.trim().length > 0;
    }
    if (currentStep === 3) {
      return formData.images.length >= 4;
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipStep = () => {
    if (!steps[currentStep].required && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    updateField('images', [...formData.images, ...newImages]);
  };

  const removeImage = (id) => {
    updateField('images', formData.images.filter(img => img.id !== id));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    updateField('images', [...formData.images, ...newImages]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAF9F7',
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      color: '#1A1A1A',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .onboarding-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(26, 26, 26, 0.2);
          padding: 18px 0;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          width: 100%;
          outline: none;
          transition: border-color 0.3s ease;
          color: #1A1A1A;
        }
        
        .onboarding-input:focus {
          border-bottom-color: #C4A484;
        }
        
        .onboarding-input::placeholder {
          color: rgba(26, 26, 26, 0.4);
        }
        
        .onboarding-textarea {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(26, 26, 26, 0.1);
          padding: 18px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          width: 100%;
          outline: none;
          transition: border-color 0.3s ease;
          resize: vertical;
          min-height: 120px;
          color: #1A1A1A;
        }
        
        .onboarding-textarea:focus {
          border-color: #C4A484;
        }
        
        .onboarding-button {
          background: #1A1A1A;
          color: #FAF9F7;
          border: none;
          padding: 18px 48px;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .onboarding-button:hover:not(:disabled) {
          background: #C4A484;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(196, 164, 132, 0.3);
        }
        
        .onboarding-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .onboarding-button-secondary {
          background: transparent;
          color: #1A1A1A;
          border: 1px solid rgba(26, 26, 26, 0.2);
        }
        
        .onboarding-button-secondary:hover {
          background: rgba(26, 26, 26, 0.05);
          border-color: #C4A484;
          color: #C4A484;
        }
        
        .upload-zone {
          border: 2px dashed rgba(26, 26, 26, 0.2);
          background: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }
        
        .upload-zone:hover {
          border-color: #C4A484;
          background: rgba(196, 164, 132, 0.05);
        }
        
        .upload-zone.drag-over {
          border-color: #C4A484;
          background: rgba(196, 164, 132, 0.1);
        }
        
        .image-preview {
          position: relative;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(26, 26, 26, 0.05);
        }
        
        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .image-preview:hover .remove-image {
          opacity: 1;
        }
        
        .remove-image {
          position: absolute;
          top: 8px;
          right: 8px;
          background: #1A1A1A;
          color: #FAF9F7;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .social-preview-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(26, 26, 26, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(26, 26, 26, 0.4);
          transition: all 0.3s ease;
        }
        
        .social-preview-icon.active {
          border-color: #C4A484;
          color: #C4A484;
          background: rgba(196, 164, 132, 0.05);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease;
        }
      `}</style>

      <header style={{
        padding: '48px',
        borderBottom: '1px solid rgba(26, 26, 26, 0.1)',
      }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#C4A484',
          marginBottom: '16px',
        }}>
          Welcome to
        </p>
        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 300,
          letterSpacing: '-1px',
        }}>
          Pose & Poise
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          color: 'rgba(26, 26, 26, 0.6)',
          marginTop: '16px',
        }}>
          Let's set up your professional portfolio
        </p>
      </header>

      <div style={{ padding: '0 48px', marginTop: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {steps.map((step, index) => (
            <div key={step.id} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px',
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: index <= currentStep ? '#C4A484' : 'rgba(26, 26, 26, 0.1)',
                    color: index <= currentStep ? '#FAF9F7' : 'rgba(26, 26, 26, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}>
                    {index < currentStep ? <Check size={16} /> : index + 1}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '12px',
                      fontWeight: 500,
                      color: index <= currentStep ? '#1A1A1A' : 'rgba(26, 26, 26, 0.4)',
                    }}>
                      {step.name}
                    </p>
                    {!step.required && (
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '10px',
                        color: 'rgba(26, 26, 26, 0.4)',
                      }}>Optional</p>
                    )}
                  </div>
                </div>
                <div style={{
                  height: '2px',
                  background: index < currentStep ? '#C4A484' : 'rgba(26, 26, 26, 0.1)',
                  transition: 'background 0.3s ease',
                }} />
              </div>
              {index < steps.length - 1 && (
                <div style={{
                  width: '24px',
                  height: '2px',
                  background: 'rgba(26, 26, 26, 0.1)',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <main style={{
        padding: '80px 48px',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '500px',
      }}>
        
        {currentStep === 0 && (
          <div className="fade-in">
            <div style={{ marginBottom: '48px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C4A484',
              }}>01</span>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 300,
                marginTop: '8px',
              }}>Your Professional Identity</h2>
              <div style={{ width: '40px', height: '1px', background: '#C4A484', marginTop: '16px' }} />
            </div>

            <div style={{ display: 'grid', gap: '32px' }}>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Professional Name *
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="Enter your professional name"
                  value={formData.professionalName}
                  onChange={(e) => updateField('professionalName', e.target.value)}
                  style={{ fontSize: '24px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span>Overline</span>
                  <span>{formData.overline.length}/50</span>
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="e.g., Premiere Runway Model"
                  value={formData.overline}
                  onChange={(e) => e.target.value.length <= 50 && updateField('overline', e.target.value)}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Short Bio
                </label>
                <textarea
                  className="onboarding-textarea"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                />
              </div>

              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '24px',
                  display: 'block',
                }}>
                  Social Media Handles
                </label>
                
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '32px',
                  padding: '24px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(26, 26, 26, 0.05)',
                }}>
                  <div className={`social-preview-icon ${formData.instagram ? 'active' : ''}`}>
                    <InstagramIcon />
                  </div>
                  <div className={`social-preview-icon ${formData.facebook ? 'active' : ''}`}>
                    <FacebookIcon />
                  </div>
                  <div className={`social-preview-icon ${formData.tiktok ? 'active' : ''}`}>
                    <TikTokIcon />
                  </div>
                  <div className={`social-preview-icon ${formData.twitter ? 'active' : ''}`}>
                    <XIconSocial />
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr' }}>
                  <input
                    type="text"
                    className="onboarding-input"
                    placeholder="@instagram"
                    value={formData.instagram}
                    onChange={(e) => updateField('instagram', e.target.value)}
                  />
                  <input
                    type="text"
                    className="onboarding-input"
                    placeholder="/facebook"
                    value={formData.facebook}
                    onChange={(e) => updateField('facebook', e.target.value)}
                  />
                  <input
                    type="text"
                    className="onboarding-input"
                    placeholder="@tiktok"
                    value={formData.tiktok}
                    onChange={(e) => updateField('tiktok', e.target.value)}
                  />
                  <input
                    type="text"
                    className="onboarding-input"
                    placeholder="@twitter"
                    value={formData.twitter}
                    onChange={(e) => updateField('twitter', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="fade-in">
            <div style={{ marginBottom: '48px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C4A484',
              }}>02</span>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 300,
                marginTop: '8px',
              }}>Rates & Services</h2>
              <div style={{ width: '40px', height: '1px', background: '#C4A484', marginTop: '16px' }} />
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                color: 'rgba(26, 26, 26, 0.6)',
                marginTop: '16px',
              }}>
                Optional — This will populate "The Terms" section on your portfolio
              </p>
            </div>

            <div style={{ display: 'grid', gap: '32px' }}>
              <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr' }}>
                <div>
                  <label style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(26, 26, 26, 0.6)',
                    marginBottom: '12px',
                    display: 'block',
                  }}>
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    className="onboarding-input"
                    placeholder="$000"
                    value={formData.hourlyRate}
                    onChange={(e) => updateField('hourlyRate', e.target.value)}
                  />
                </div>
                <div>
                  <label style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(26, 26, 26, 0.6)',
                    marginBottom: '12px',
                    display: 'block',
                  }}>
                    Day Rate
                  </label>
                  <input
                    type="text"
                    className="onboarding-input"
                    placeholder="$000"
                    value={formData.dayRate}
                    onChange={(e) => updateField('dayRate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Services Offered
                </label>
                <textarea
                  className="onboarding-textarea"
                  placeholder="List the services you offer..."
                  value={formData.services}
                  onChange={(e) => updateField('services', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="fade-in">
            <div style={{ marginBottom: '48px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C4A484',
              }}>03</span>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 300,
                marginTop: '8px',
              }}>Measurements & Stats</h2>
              <div style={{ width: '40px', height: '1px', background: '#C4A484', marginTop: '16px' }} />
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                color: 'rgba(26, 26, 26, 0.6)',
                marginTop: '16px',
              }}>
                Optional — You can complete this later in the Composite Card Wizard
              </p>
            </div>

            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Height
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="5'10&quot;"
                  value={formData.height}
                  onChange={(e) => updateField('height', e.target.value)}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Bust
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="34&quot;"
                  value={formData.bust}
                  onChange={(e) => updateField('bust', e.target.value)}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Waist
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="24&quot;"
                  value={formData.waist}
                  onChange={(e) => updateField('waist', e.target.value)}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Hips
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="34&quot;"
                  value={formData.hips}
                  onChange={(e) => updateField('hips', e.target.value)}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Shoe Size
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="8"
                  value={formData.shoeSize}
                  onChange={(e) => updateField('shoeSize', e.target.value)}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '12px',
                  display: 'block',
                }}>
                  Hair Color
                </label>
                <input
                  type="text"
                  className="onboarding-input"
                  placeholder="Brunette"
                  value={formData.hairColor}
                  onChange={(e) => updateField('hairColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="fade-in">
            <div style={{ marginBottom: '48px' }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#C4A484',
              }}>04</span>
              <h2 style={{
                fontSize: '32px',
                fontWeight: 300,
                marginTop: '8px',
              }}>Asset Library</h2>
              <div style={{ width: '40px', height: '1px', background: '#C4A484', marginTop: '16px' }} />
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '14px',
                color: 'rgba(26, 26, 26, 0.6)',
                marginTop: '16px',
              }}>
                Upload at least 4 images to get started
              </p>
            </div>

            <div>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              
              <label
                htmlFor="image-upload"
                className="upload-zone"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.currentTarget.classList.add('drag-over')}
                onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '64px',
                  cursor: 'pointer',
                  marginBottom: '32px',
                }}
              >
                <Upload size={48} style={{ color: 'rgba(26, 26, 26, 0.3)', marginBottom: '16px' }} />
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(26, 26, 26, 0.6)',
                  marginBottom: '8px',
                }}>
                  Drag & drop images here or click to browse
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '12px',
                  color: 'rgba(26, 26, 26, 0.4)',
                }}>
                  Supports JPG, PNG, WEBP
                </p>
              </label>

              {formData.images.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'rgba(26, 26, 26, 0.6)',
                    marginBottom: '16px',
                  }}>
                    {formData.images.length} Image{formData.images.length !== 1 ? 's' : ''} Uploaded
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '16px',
                  }}>
                    {formData.images.map(image => (
                      <div key={image.id} className="image-preview" style={{ aspectRatio: '1/1' }}>
                        <img src={image.preview} alt={image.name} />
                        <button
                          className="remove-image"
                          onClick={() => removeImage(image.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <footer style={{
        padding: '48px',
        borderTop: '1px solid rgba(26, 26, 26, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        bottom: 0,
        background: '#FAF9F7',
      }}>
        <button
          className="onboarding-button onboarding-button-secondary"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Back
        </button>

        <div style={{ display: 'flex', gap: '16px' }}>
          {!steps[currentStep].required && currentStep < steps.length - 1 && (
            <button
              className="onboarding-button onboarding-button-secondary"
              onClick={skipStep}
            >
              Skip
            </button>
          )}
          
          <button
            className="onboarding-button"
            onClick={nextStep}
            disabled={!canProceed()}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  );
}