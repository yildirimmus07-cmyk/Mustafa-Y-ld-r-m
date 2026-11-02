import React from 'react';
import { Property } from '../types/property';
import { usePropertyContext } from '../context/PropertyContext';
import { 
  Heart, 
  MapPin, 
  Maximize2, 
  Bed, 
  Bath, 
  Waves, 
  CheckCircle2 
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const { navigateTo, formatPrice, isFavorite, toggleFavorite } = usePropertyContext();
  const favorited = isFavorite(property.id);

  const mainImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg';

  const handleCardClick = () => {
    navigateTo('property-detail', property.id);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container with overlay tags */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // graceful fallback
            (e.target as HTMLImageElement).src = '/src/assets/images/listing_mahmutlar_residence_1793604907502.jpg';
          }}
        />
        
        {/* Subtle Scrim for Top / Bottom contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top bar: Listing Type tag + Favorite Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase backdrop-blur-md ${
            property.listingType === 'satilik'
              ? 'bg-amber-600/90 text-white'
              : 'bg-emerald-600/90 text-white'
          }`}>
            {property.listingType === 'satilik' ? 'Satılık' : 'Kiralık'}
          </span>

          <button
            onClick={handleFavoriteClick}
            aria-label="Favorilere ekle veya çıkar"
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              favorited 
                ? 'bg-rose-500 text-white shadow-xs' 
                : 'bg-black/30 hover:bg-black/50 text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay: Ref Code & Distance to sea */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white text-xs">
          <span className="font-mono text-[11px] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
            Ref: {property.refCode}
          </span>
          {property.location.distanceToSeaMeters > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
              <Waves className="w-3 h-3 text-cyan-300" />
              Denize {property.location.distanceToSeaMeters}m
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Location & District */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{property.location.district}, Alanya</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug text-base mb-2">
            {property.title}
          </h3>

          {/* Unboxed Metadata with typographic separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-3">
            <span className="flex items-center gap-1 font-medium">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              {property.rooms}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              {property.areaM2} m²
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1 font-medium">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              {property.bathrooms} Banyo
            </span>
          </div>

          {/* Key tags unboxed */}
          {property.citizenshipEligible && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Türk Vatandaşlığına Uygun</span>
            </div>
          )}
        </div>

        {/* Footer of Card: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <div className="text-[11px] text-slate-600 font-medium">
              {property.listingType === 'kiralik' ? 'Aylık Kira' : 'Satış Fiyatı'}
            </div>
            <div className="text-lg font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
              {formatPrice(property.priceEUR)}
            </div>
          </div>

          <span className="text-xs font-bold text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            İncele &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
