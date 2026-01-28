import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3 p-4 border border-gray-100 rounded-lg bg-white h-full">
      <Skeleton className="aspect-square w-full rounded-md" />
      <div className="space-y-2 mt-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-2 mt-auto">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};
