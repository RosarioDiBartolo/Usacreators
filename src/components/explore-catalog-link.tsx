import {
 
  Search,
} from "lucide-react";import { IconFirstRevealTextLink } from './icon-links'

function ExploreCatalogLink() {
  return (
   <IconFirstRevealTextLink
  to="/catalog"
  icon={
    <span className="inline-flex bg-background/80 text-primary rounded-full border p-2">
      <Search className="w-5 h-5" />
    </span>
  }
  label="Explore our Catalog"
  buttonVariant="default"
  buttonSize="lg"
/>
  )
}

export default ExploreCatalogLink