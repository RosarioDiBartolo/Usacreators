import { creatorsQueryOptions } from '@/lib/creators/get-creators';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

function CatalogPreview() {

    const { data: creators } = useSuspenseQuery(
      creatorsQueryOptions({
        cleaned: false,
      })
    );

    
    
  return (
    <div>CatalogPreview</div>
  )
}

export default CatalogPreview