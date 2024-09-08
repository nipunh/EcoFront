import { useState, useMemo, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider} from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious, } from "@/components/ui/pagination"
import { getProducts } from "./helper/coreapicalls"
import ProductCard from "./ProductCard"


export default function Products() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    priceRange: [0, 100],
    rating: 0,
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);


  const loadAllProducts = () => {
    setloading(true);
      getProducts().then(
          data=> {
              console.log(data);
              if(data?.error){
                  setError(data.error)
              }else{
                  setProducts(data)
              }
          }
      );

      setloading(false);
  }
  
      useEffect(() => {
          loadAllProducts();
      }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10);

  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      })
    } else if (type === "priceRange") {
      setSelectedFilters({
        ...selectedFilters,
        priceRange: value,
      })
    } else if (type === "rating") {
      setSelectedFilters({
        ...selectedFilters,
        rating: value,
      })
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false
      }
      if (product.price < selectedFilters.priceRange[0] || product.price > selectedFilters.priceRange[1]) {
        return false
      }
      if (product.rating < selectedFilters.rating) {
        return false
      }
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }
      return true
    })
  }, [selectedFilters, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return loading  ?( <p>Loading...</p> ):
  (

    <div className="grid md:grid-cols-[280px_1fr] gap-8 p-4 md:p-8">
      <div className="bg-background border rounded-lg p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid gap-6">
          <div>
            <h3 className="text-base font-medium mb-2">Category</h3>
            <div className="grid gap-2">
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Electronics")}
                  onCheckedChange={() => handleFilterChange("category", "Electronics")}
                />
                Electronics
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Clothing")}
                  onCheckedChange={() => handleFilterChange("category", "Clothing")}
                />
                Clothing
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Outdoor")}
                  onCheckedChange={() => handleFilterChange("category", "Outdoor")}
                />
                Outdoor
              </Label>
              <Label className="flex items-center gap-2 font-normal">
                <Checkbox
                  checked={selectedFilters.category.includes("Home")}
                  onCheckedChange={() => handleFilterChange("category", "Home")}
                />
                Home
              </Label>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium mb-2">Price Range</h3>
            <Slider
              value={[selectedFilters.priceRange]}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              min={0}
              max={100}
              step={5}
              className="w-full p-2"
            >
              <div>
                <div />
              </div>
              <div />
            </Slider>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${selectedFilters.priceRange[0]}</span>
              <span>${selectedFilters.priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="text-base font-medium mb-2">Rating</h3>
            <Slider
              value={[selectedFilters.rating]}
              onValueChange={(value) => handleFilterChange("rating", value[0])}
              min={0}
              max={5}
              step={0.5}
              className="w-full p-2"
            >
              <div>
                <div />
              </div>
              <div />
            </Slider>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          >
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      </div>
    </div>
  )
}
