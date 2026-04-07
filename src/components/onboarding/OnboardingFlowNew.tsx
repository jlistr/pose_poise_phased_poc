import { useState } from 'react';
import { Upload, X, Check } from 'lucide-react';
import './OnboardingFlowNew.css';

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
    <div className="onboarding-container">
      <header className="onboarding-header">
        <p className="header-welcome">
          Welcome to
        </p>
        <h1 className="header-title">
          Pose & Poise
        </h1>
        <p className="header-subtitle">
          Let's set up your professional portfolio
        </p>
      </header>

      <div className="steps-container">
        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <div key={step.id} className="step-item">
              <div className="step-content-flex">
                <div className="step-header">
                  <div className={`step-indicator ${index <= currentStep ? (index < currentStep ? 'completed' : 'active') : 'inactive'}`}>
                    {index < currentStep ? <Check size={16} /> : index + 1}
                  </div>
                  <div>
                    <p className={`step-title ${index <= currentStep ? (index < currentStep ? 'completed' : 'active') : 'inactive'}`}>
                      {step.name}
                    </p>
                    {!step.required && (
                      <p className="step-optional">Optional</p>
                    )}
                  </div>
                </div>
                <div className={`step-progress-line ${index < currentStep ? 'completed' : (index === currentStep ? 'active' : 'inactive')}`} />
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector" />
              )}
            </div>
          ))}
        </div>
      </div>

      <main className="main-content">
        
        {currentStep === 0 && (
          <div className="fade-in">
            <div className="section-header">
              <span className="step-number">01</span>
              <h2 className="section-title">Your Professional Identity</h2>
              <div className="section-divider" />
            </div>

            <div className="form-grid">
              <div>
                <label className="input-label">
                  Professional Name *
                </label>
                <input
                  type="text"
                  className="onboarding-input large-input"
                  placeholder="Enter your professional name"
                  value={formData.professionalName}
                  onChange={(e) => updateField('professionalName', e.target.value)}
                />
              </div>

              <div>
                <label className="input-label with-counter">
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
                <label className="input-label">
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
                <label className="input-label" style={{ marginBottom: '24px' }}>
                  Social Media Handles
                </label>
                
                <div className="social-preview-container">
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

                <div className="grid-2-cols">
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
            <div className="section-header">
              <span className="step-number">02</span>
              <h2 className="section-title">Rates & Services</h2>
              <div className="section-divider" />
              <p className="section-subtitle">
                Optional — This will populate "The Terms" section on your portfolio
              </p>
            </div>

            <div className="form-grid">
              <div className="grid-2-cols">
                <div>
                  <label className="input-label">
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
                  <label className="input-label">
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
                <label className="input-label">
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
            <div className="section-header">
              <span className="step-number">03</span>
              <h2 className="section-title">Measurements & Stats</h2>
              <div className="section-divider" />
              <p className="section-subtitle">
                Optional — You can complete this later in the Composite Card Wizard
              </p>
            </div>

            <div className="grid-3-cols">
              <div>
                <label className="input-label">
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
                <label className="input-label">
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
                <label className="input-label">
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
                <label className="input-label">
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
                <label className="input-label">
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
                <label className="input-label">
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
            <div className="section-header">
              <span className="step-number">04</span>
              <h2 className="section-title">Asset Library</h2>
              <div className="section-divider" />
              <p className="section-subtitle">
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
              >
                <Upload size={48} className="upload-icon" />
                <p className="upload-text-main">
                  Drag & drop images here or click to browse
                </p>
                <p className="upload-text-sub">
                  Supports JPG, PNG, WEBP
                </p>
              </label>

              {formData.images.length > 0 && (
                <div>
                  <p className="image-gallery-count">
                    {formData.images.length} Image{formData.images.length !== 1 ? 's' : ''} Uploaded
                  </p>
                  <div className="image-gallery-grid">
                    {formData.images.map(image => (
                      <div key={image.id} className="image-preview">
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

      <footer className="onboarding-footer">
        <button
          className="onboarding-button onboarding-button-secondary"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Back
        </button>

        <div className="footer-buttons">
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
