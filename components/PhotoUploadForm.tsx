'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { useProjectStore } from '@/lib/store';
import Image from 'next/image';

export default function PhotoUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { fetchProjects } = useProjectStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

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
        // Force refresh for ProjectManager
        fetchProjects();
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
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <Upload size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Work</h2>
          <p className="text-sm text-muted-foreground">Upload a photo to your portfolio gallery.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-xs font-black uppercase tracking-widest text-foreground/60"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Summer in Bologna"
              className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-xs font-black uppercase tracking-widest text-foreground/60"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details about the shoot..."
              className="w-full px-4 py-3 bg-secondary/50 border border-border/50 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium min-h-[120px] resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-foreground/60 block mb-2">
              Media Upload
            </label>

            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result) => {
                if (typeof result.info !== 'string' && result.event === 'success') {
                  setImageUrl(result.info?.secure_url || '');
                }
              }}
            >
              {({ open }) => (
                <div
                  onClick={() => open()}
                  className={`relative group cursor-pointer aspect-video rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden
                    ${imageUrl ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}`}
                >
                  {imageUrl ? (
                    <>
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        className="absolute inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button type="button" variant="secondary" className="rounded-full">
                          Change Image
                        </Button>
                      </div>
                      <div className="absolute top-4 right-4 p-2 bg-primary text-primary-foreground rounded-full z-10">
                        <CheckCircle2 size={16} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-secondary rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                        <ImageIcon size={32} />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-sm tracking-tight">Click to upload image</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                          JPG, PNG or WEBP up to 10MB
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CldUploadWidget>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]"
            disabled={isSubmitting || !imageUrl}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Work'}
          </Button>
        </div>
      </form>
    </div>
  );
}
