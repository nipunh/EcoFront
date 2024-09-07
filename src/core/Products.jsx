import { useState, useMemo, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider} from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious, } from "@/components/ui/pagination"
import { Link, withRouter } from 'react-router-dom'
import { getProducts } from "./helper/coreapicalls"
import ImageHelper from "./helper/ImageHelper"
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
  const [productsPerPage] = useState(10)
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
  // const products = [
  //   {
  //     id: 1,
  //     name: "Wireless Headphones",
  //     price: 79.99,
  //     image: "/placeholder.svg",
  //     category: "Electronics",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 2,
  //     name: "Cotton T-Shirt",
  //     price: 24.99,
  //     image: "/placeholder.svg",
  //     category: "Clothing",
  //     rating: 4.2,
  //   },
  //   {
  //     id: 3,
  //     name: "Hiking Backpack",
  //     price: 59.99,
  //     image: "/placeholder.svg",
  //     category: "Outdoor",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 4,
  //     name: "Ceramic Mug",
  //     price: 12.99,
  //     image: "/placeholder.svg",
  //     category: "Home",
  //     rating: 4.1,
  //   },
  //   {
  //     id: 5,
  //     name: "Fitness Tracker",
  //     price: 49.99,
  //     image: "/placeholder.svg",
  //     category: "Electronics",
  //     rating: 4.4,
  //   },
  //   {
  //     id: 6,
  //     name: "Denim Jeans",
  //     price: 39.99,
  //     image: "/placeholder.svg",
  //     category: "Clothing",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 7,
  //     name: "Camping Tent",
  //     price: 89.99,
  //     image: "/placeholder.svg",
  //     category: "Outdoor",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 8,
  //     name: "Decorative Vase",
  //     price: 19.99,
  //     image: "/placeholder.svg",
  //     category: "Home",
  //     rating: 4.3,
  //   },
  //   {
  //     id: 9,
  //     name: "Wireless Earbuds",
  //     price: 59.99,
  //     image: "/placeholder.svg",
  //     category: "Electronics",
  //     rating: 4.6,
  //   },
  //   {
  //     id: 10,
  //     name: "Leather Jacket",
  //     price: 99.99,
  //     image: "/placeholder.svg",
  //     category: "Clothing",
  //     rating: 4.8,
  //   },
  //   {
  //     id: 11,
  //     name: "Camping Chair",
  //     price: 39.99,
  //     image: "/placeholder.svg",
  //     category: "Outdoor",
  //     rating: 4.5,
  //   },
  //   {
  //     id: 12,
  //     name: "Throw Pillow",
  //     price: 24.99,
  //     image: "/placeholder.svg",
  //     category: "Home",
  //     rating: 4.2,
  //   },
  //   {
  //     id: 13,
  //     name: "Smartwatch",
  //     price: 99.99,
  //     image: "/placeholder.svg",
  //     category: "Electronics",
  //     rating: 4.7,
  //   },
  //   {
  //     id: 14,
  //     name: "Flannel Shirt",
  //     price: 34.99,
  //     image: "/placeholder.svg",
  //     category: "Clothing",
  //     rating: 4.4,
  //   },
  //   {
  //     id: 15,
  //     name: "Hiking Boots",
  //     price: 79.99,
  //     image: "/placeholder.svg",
  //     category: "Outdoor",
  //     rating: 4.9,
  //   },
  //   {
  //     id: 16,
  //     name: "Desk Lamp",
  //     price: 29.99,
  //     image: "/placeholder.svg",
  //     category: "Home",
  //     rating: 4.3,
  //   },
  // ]
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
  
  console.log(filteredProducts);
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  console.log(currentProducts);

  
  

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

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}