import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CVHeaderProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  profileImage: string;
}

export function CVHeader({
  name,
  title,
  email,
  phone,
  location,
  linkedin,
  github,
  website,
  profileImage,
}: CVHeaderProps) {
  return (
    <div className="relative pb-10 mb-8">
      {/* Gradient background accent */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 -mx-12 -mt-12 rounded-t-lg -z-10" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start pt-8">
        <div className="w-44 h-44 rounded-full overflow-hidden shadow-xl ring-4 ring-white flex-shrink-0">
          <ImageWithFallback
            src={profileImage}
            alt={name}
            width={176}
            height={176}
            className="w-full h-full object-cover print:rounded-full"
          />
        </div>
        
        <div className="flex-1 pt-2">
          <h1 className="text-gray-900 mb-4 text-5xl md:text-6xl">{name}</h1>
          <p className="text-gray-600 mb-6 text-xl md:text-2xl">{title}</p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-600 mb-4">
            <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{email}</span>
            </a>
            <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{phone}</span>
            </a>
            <div className="flex items-center gap-2">
              <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{location}</span>
              </a>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {linkedin && (
              <a href={linkedin} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {github && (
              <a href={github} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Github className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
            {website && (
              <a href={website} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
