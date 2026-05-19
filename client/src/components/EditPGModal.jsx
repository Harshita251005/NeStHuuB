import { useState, useEffect } from 'react';
import { X, Building, MapPin, DollarSign, FileText, Save } from 'lucide-react';

const EditPGModal = ({ pg, isOpen, onClose, onUpdate, ownerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pg) {
      setFormData({
        name: pg.name || '',
        location: pg.location || '',
        price: pg.price || '',
        description: pg.description || ''
      });
      setImagePreview(pg.image || null);
      setImageFile(null);
    }
  }, [pg]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Only JPEG, PNG, and WebP images are allowed');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData = {
        ...formData,
        owner_id: ownerId
      };
      if (imageFile) {
        updateData.image = imagePreview;
      } else if (imagePreview === null) {
        // If image was removed explicitly
        updateData.image = null;
      }
      
      await onUpdate(pg.id, updateData);
      onClose();
    } catch (error) {
      console.error('Error updating PG:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit PG Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="h-4 w-4 inline mr-2" />
              PG Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter PG name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 inline mr-2" />
              Monthly Rent (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Enter monthly rent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PG Image
            </label>
            {!imagePreview ? (
              <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition duration-200">
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Click to upload new image</span>
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
                <img src={imagePreview} alt="PG Preview" className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg transition duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="h-4 w-4 inline mr-2" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Describe amenities, rules, and other details"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center flex-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Updating...' : 'Update PG'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPGModal;