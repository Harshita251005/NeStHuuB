import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ownerAPI } from '../configs/api';
import { useAuth } from '../contexts/AuthContext';
import { Building, MapPin, DollarSign, FileText, CheckCircle, AlertCircle, Upload, X } from 'lucide-react';

const AddPG = () => {
  const [formData, setFormData] = useState({
    owner_id: '',
    name: '',
    location: '',
    price: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, userType } = useAuth();

  useEffect(() => {
    if (!user || userType !== 'owner') {
      navigate('/owner/login');
      return;
    }
    
    setFormData(prev => ({ ...prev, owner_id: user.id.toString() }));
  }, [user, userType, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'PG name is required';
    if (formData.name.trim().length < 3) newErrors.name = 'PG name must be at least 3 characters';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.location.trim().length < 3) newErrors.location = 'Location must be at least 3 characters';
    if (!formData.price) newErrors.price = 'Monthly rent is required';
    if (parseFloat(formData.price) < 1000) newErrors.price = 'Monthly rent must be at least ₹1000';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.trim().length < 20) newErrors.description = 'Description must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Only JPEG, PNG, and WebP images are allowed' }));
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const pgData = {
        ...formData,
        owner_id: parseInt(formData.owner_id),
        price: parseFloat(formData.price)
      };
      
      // If image is selected, convert to base64 and include in pgData
      if (imageFile) {
        pgData.image = imagePreview;
      }
      
      await ownerAPI.addPG(pgData);
      setMessageType('success');
      setMessage('PG added successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/owner/dashboard');
      }, 2000);
    } catch (error) {
      setMessageType('error');
      setMessage(error.response?.data?.error || 'Failed to add PG. Please try again.');
      console.error('Add PG error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <div className="card shadow-lg dark:bg-gray-800">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center">
              <Building className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">List Your PG</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Add your property to reach thousands of students and professionals</p>
          </div>

          {/* Message Alert */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 animate-slide-up ${
              messageType === 'success' 
                ? 'bg-purple-50 dark:bg-purple-900 dark:bg-opacity-30 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300' 
                : 'bg-red-50 dark:bg-red-900 dark:bg-opacity-30 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Owner ID - Hidden from view but in form */}
            <input
              type="hidden"
              name="owner_id"
              value={formData.owner_id}
            />

            {/* PG Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                PG Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="e.g., Sunrise PG, Comfort Homes"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`input-field pl-10 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="e.g., Sector 15, Gurgaon"
                />
              </div>
              {errors.location && <p className="text-red-500 text-xs mt-1 font-medium">{errors.location}</p>}
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Monthly Rent (₹)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`input-field pl-10 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="e.g., 8000"
                  min="1000"
                  step="500"
                />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1 font-medium">{errors.price}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                PG Image (Optional)
              </label>
              {!imagePreview ? (
                  <label className="block w-full border-2 border-dashed border-indigo-300 dark:border-indigo-600 rounded-lg p-6 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition duration-200 bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-20">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 min-h-[140px]">
                      <Upload className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG, WebP up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                <div className="relative">
                    <img src={imagePreview} alt="PG Preview" className="w-full h-48 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg transition duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
              {errors.image && <p className="text-red-500 text-xs mt-1 font-medium">{errors.image}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={`input-field resize-none pl-10 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Describe your PG: amenities (WiFi, AC, meals, etc.), house rules, contact info, and what makes it special..."
                />
              </div>
              <div className="flex justify-between mt-1">
                <p className={`text-xs font-medium ${formData.description.length < 20 ? 'text-red-500' : 'text-purple-600 dark:text-purple-400'}`}>
                  {formData.description.length}/20 characters minimum
                </p>
              </div>
              {errors.description && <p className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-success py-3 font-semibold flex items-center justify-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding PG...' : (
                <>
                  <Building className="h-5 w-5" />
                  List My PG Now
                </>
              )}
            </button>
          </form>

          {/* Tips Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Tips for a Great Listing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                '✓ Use clear, accurate location details',
                '✓ Mention all key amenities (WiFi, AC, meals)',
                '✓ Be transparent about house rules',
                '✓ Set competitive and fair pricing',
                '✓ Include photos if possible',
                '✓ Update regularly for better visibility'
              ].map((tip, idx) => (
                <p key={idx} className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPG;