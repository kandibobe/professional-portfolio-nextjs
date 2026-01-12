'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';

export default function PhotoUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload an image first');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      });

      if (response.ok) {
        setTitle('');
        setDescription('');
        setImageUrl('');
        router.refresh();
        alert('Photo uploaded successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Upload New Photo</h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md bg-background"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Image</label>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={(result) => {
            if (typeof result.info !== 'string' && result.event === 'success') {
              setImageUrl(result.info?.secure_url || '');
            }
          }}
        >
          {({ open }) => (
            <Button type="button" variant="outline" onClick={() => open()} className="w-full">
              {imageUrl ? 'Change Image' : 'Upload Image'}
            </Button>
          )}
        </CldUploadWidget>

        {imageUrl && (
          <div className="mt-2 relative w-full h-40">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting || !imageUrl}>
        {isSubmitting ? 'Saving...' : 'Save Photo'}
      </Button>
    </form>
  );
}
