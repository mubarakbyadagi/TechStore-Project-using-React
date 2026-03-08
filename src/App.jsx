import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import "./App.css";
import products from "./data";
import { useState, useEffect } from "react";


function App() {

  const allBrands =[...new Set(products.map(p => p.brand))];
  const [cartItmes, setCartItmes] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand]= useState("All");
  const [sortBy, setSortBy]= useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply theme class to body
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);


  function addToCart(product)
  {
    // check if cart item exists
    const existingitem = cartItmes.find(item =>item.id === product.id);

    if(existingitem)
    {
      // product is there in the cart
      setCartItmes(cartItmes.map(item =>
        item.id === product.id ? {...item,quantity: item.quantity+1}:item
      ))
    }
    else{
      // product not there 
      setCartItmes([...cartItmes,{...product,quantity:1}])
    }
  }

  // Increment quantity
  function incrementItem(id) {
    setCartItmes(cartItmes.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item
    ));
  }

  // Decrement quantity
  function decrementItem(id) {
    setCartItmes(cartItmes
      .map(item => item.id === id ? {...item, quantity: item.quantity - 1} : item)
      .filter(item => item.quantity > 0)
    );
  }

  // Remove item from cart
  function removeItem(id) {
    setCartItmes(cartItmes.filter(item => item.id !== id));
  }


// Calculate Total number of Cart ITMES
  const cartCount = cartItmes.reduce((total,item)=> total+item.quantity,0);


// Calculate Total Price
const cartTotal = cartItmes.reduce((total,item)=>total+(item.price) * (item.quantity),0);


 // Wishlist Function
 function toggleWhislist(product)
 {
  if(wishlist.includes(product.id))
  {
    // Already Existing - Remove It
    setWishlist(wishlist.filter(id=> id!== product.id));
  }
  else{
    // Not in the Whislist - just Add it
    setWishlist([...wishlist, product.id])
  }
 }


 // Step 1 : Filter BASED ON SEARCH AND BRAND
 let filteredProducts = products.filter(product =>{
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;

  return matchesSearch && matchesBrand;
 });

 // Step 2: SORT BASED ON FILTERED PRODUCTS
 if(sortBy === "price-low") {
   filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
 } else if(sortBy === "price-high") {
   filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
 } else if(sortBy === "rating") {
   filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
 }


  return (

    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">◆</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li>
              <a href="#" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              id="theme-toggle"
            >
              <div className="theme-toggle-track">
                <div className={`theme-toggle-thumb ${isDarkMode ? 'dark' : 'light'}`}>
                  {isDarkMode ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* Wishlist */}
            <div className="nav-icon-btn" id="wishlist-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && <span className="icon-badge wishlist-badge">{wishlist.length}</span>}
            </div>

            {/* Cart */}
            <div className="nav-icon-btn" id="cart-icon" onClick={() => setIsCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && <span className="icon-badge cart-badge">{cartCount}</span>}
            </div>

            <button className="nav-btn">Sign In</button>
            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>
     

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2025</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge smartphones, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        {/* Filter Controls */}
        <div className="filters-bar">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-input"
          />

          <select
            className="filter-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            id="brand-select"
          >
            <option value="All">All Brands</option>
            {allBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="sort-select"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((data)=>(
           <ProductCard
           key={data.id}
           id={data.id}
           image={data.image}
           name={data.name}
           price={data.price}
           originalPrice={data.originalPrice}
           discount={data.discount}
           rating={data.rating}
           isBestSeller={data.isBestSeller}
           isWishlisted={wishlist.includes(data.id)}
           onAddToCart={() => addToCart(data)}
           onToggleWishlist={() => toggleWhislist(data)}
           />
          ))
        ) : (
          <p className="no-results">No products found matching your criteria.</p>
        )}
      </div>

        
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TechStore. All rights reserved.</p>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItmes}
        cartTotal={cartTotal}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
    </div>
  );
}

export default App;