import { creatorsQueryOptions } from '@/lib/creators/get-creators';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react'

function CatalogPreview() {

   const { data: creators } = useSuspenseQuery(
    creatorsQueryOptions({
     })
  );
  return (
    <div>
      <h2>Our Catalog</h2>
    </div>
  )
}

export default CatalogPreview