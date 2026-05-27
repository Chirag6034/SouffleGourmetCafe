"use client";

import { useState, useCallback, useRef } from "react";
import { 
  Coffee, 
  UtensilsCrossed, 
  Cake, 
  Wine, 
  Pizza, 
  Beef, 
  Sandwich, 
  Salad, 
  Martini, 
  Wheat,
  LeafyGreen,
  Cookie,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { CategoryAnimation } from "@/components/category-animation";
import { MenuCard } from "@/components/menu-card";
import { CategoryButton } from "@/components/category-button";

const categories = [
  { id: "pizza", label: "Pizza", icon: Pizza },
  { id: "burger", label: "Burger", icon: Beef },
  { id: "wrap", label: "Wrap", icon: Wheat },
  { id: "sandwich", label: "Sandwich", icon: Sandwich },
  { id: "pasta", label: "Pasta", icon: UtensilsCrossed },
  { id: "drinks", label: "Sakes & Cocktails", icon: Martini },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "fries", label: "Fries", icon: Cookie },
  { id: "salads", label: "Salads", icon: Salad },
  { id: "rice", label: "Rice", icon: LeafyGreen },
  { id: "nachos", label: "Nachos", icon: Wine },
  { id: "desserts", label: "Desserts", icon: Cake },
];

const menuItems = {
  pizza: [
    { name: "Margherita", description: "San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil", price: "$16" },
    { name: "Quattro Formaggi", description: "Mozzarella, gorgonzola, fontina, and parmigiano reggiano blend", price: "$20" },
    { name: "Diavola", description: "Spicy salami, tomato sauce, mozzarella, and Calabrian chili flakes", price: "$19" },
    { name: "Prosciutto e Rucola", description: "Parma ham, wild arugula, shaved parmesan, and balsamic glaze", price: "$22" },
    { name: "Truffle Mushroom", description: "Wild mushroom medley, truffle cream, fontina, and fresh thyme", price: "$26" },
  ],
  burger: [
    { name: "Classic Noir Burger", description: "Dry-aged beef patty, aged cheddar, lettuce, tomato, secret sauce", price: "$18" },
    { name: "Truffle Burger", description: "Wagyu beef, truffle aioli, gruyère, caramelized onions, brioche bun", price: "$28" },
    { name: "Mushroom Swiss", description: "Angus beef, sautéed portobello, Swiss cheese, garlic herb mayo", price: "$20" },
    { name: "BBQ Bacon Smash", description: "Double smashed patties, crispy bacon, bourbon BBQ, American cheese", price: "$22" },
    { name: "Mediterranean Lamb", description: "Spiced lamb patty, feta, tzatziki, pickled onions, arugula", price: "$24" },
  ],
  wrap: [
    { name: "Grilled Chicken Caesar", description: "Herb-marinated chicken, romaine, parmesan, Caesar dressing, warm tortilla", price: "$14" },
    { name: "Falafel Wrap", description: "Crispy falafel, hummus, tahini, pickled vegetables, fresh herbs", price: "$13" },
    { name: "Korean BBQ Beef", description: "Bulgogi beef, kimchi slaw, gochujang mayo, sesame seeds", price: "$16" },
    { name: "Buffalo Chicken", description: "Crispy buffalo chicken, blue cheese, celery, ranch dressing", price: "$15" },
    { name: "Grilled Veggie", description: "Roasted zucchini, peppers, eggplant, goat cheese, balsamic reduction", price: "$13" },
  ],
  sandwich: [
    { name: "Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce, tomato, herb mayo", price: "$16" },
    { name: "Cubano", description: "Slow-roasted pork, ham, Swiss, pickles, mustard on pressed bread", price: "$17" },
    { name: "Caprese Panini", description: "Fresh mozzarella, vine tomatoes, basil pesto on ciabatta", price: "$14" },
    { name: "Reuben", description: "House-cured pastrami, sauerkraut, Swiss, Russian dressing on rye", price: "$18" },
    { name: "Grilled Cheese Deluxe", description: "Three-cheese blend, caramelized onions, truffle oil on sourdough", price: "$15" },
  ],
  pasta: [
    { name: "Spaghetti Carbonara", description: "Handmade spaghetti with guanciale, pecorino, egg yolk, and black pepper", price: "$22" },
    { name: "Pappardelle al Ragù", description: "Wide ribbon pasta with slow-cooked Bolognese and parmigiano", price: "$24" },
    { name: "Cacio e Pepe", description: "Tonnarelli pasta with aged pecorino romano and cracked black pepper", price: "$20" },
    { name: "Truffle Tagliatelle", description: "Fresh egg pasta with black truffle, butter, and parmigiano reggiano", price: "$32" },
    { name: "Seafood Linguine", description: "Linguine with prawns, clams, mussels in white wine and garlic", price: "$28" },
  ],
  drinks: [
    { name: "Classic Sake Flight", description: "Three premium Japanese sakes - Junmai, Ginjo, and Daiginjo", price: "$24" },
    { name: "Noir Martini", description: "Premium vodka, dry vermouth, blue cheese stuffed olives", price: "$16" },
    { name: "Old Fashioned", description: "Bourbon, angostura bitters, orange peel, luxardo cherry", price: "$15" },
    { name: "Espresso Martini", description: "Vodka, fresh espresso, coffee liqueur, vanilla syrup", price: "$17" },
    { name: "Yuzu Sake Spritz", description: "Sparkling sake, yuzu citrus, elderflower, prosecco", price: "$14" },
    { name: "Negroni", description: "Gin, Campari, sweet vermouth, orange twist", price: "$15" },
  ],
  coffee: [
    { name: "Espresso", description: "Rich, bold single shot of pure Italian espresso", price: "$4" },
    { name: "Cappuccino", description: "Silky steamed milk with espresso and delicate foam art", price: "$5" },
    { name: "Café Latte", description: "Smooth espresso with creamy steamed milk", price: "$5" },
    { name: "Affogato", description: "Vanilla gelato drowned in hot espresso", price: "$7" },
    { name: "Cold Brew", description: "18-hour steeped cold brew, smooth and refreshing", price: "$5" },
    { name: "Mocha", description: "Espresso, Belgian chocolate, steamed milk, whipped cream", price: "$6" },
  ],
  fries: [
    { name: "Classic Fries", description: "Hand-cut potatoes, sea salt, served with house aioli", price: "$6" },
    { name: "Truffle Parmesan Fries", description: "Truffle oil, grated parmigiano, fresh parsley, garlic aioli", price: "$12" },
    { name: "Loaded Bacon Fries", description: "Crispy bacon, melted cheddar, sour cream, chives", price: "$14" },
    { name: "Sweet Potato Fries", description: "Crispy sweet potato, chipotle mayo, lime zest", price: "$9" },
    { name: "Garlic Herb Fries", description: "Roasted garlic, fresh herbs, parmesan dust", price: "$10" },
  ],
  salads: [
    { name: "Classic Caesar", description: "Crisp romaine, house-made Caesar, anchovies, croutons, parmesan", price: "$14" },
    { name: "Mediterranean Bowl", description: "Mixed greens, feta, olives, cucumber, tomato, red onion, herb vinaigrette", price: "$15" },
    { name: "Grilled Salmon Salad", description: "Atlantic salmon, avocado, quinoa, citrus segments, lemon dill dressing", price: "$22" },
    { name: "Burrata Caprese", description: "Creamy burrata, heirloom tomatoes, basil, aged balsamic, olive oil", price: "$18" },
    { name: "Asian Chicken Salad", description: "Grilled chicken, cabbage, edamame, mandarin, sesame ginger dressing", price: "$17" },
  ],
  rice: [
    { name: "Mushroom Risotto", description: "Arborio rice, wild mushrooms, white wine, parmigiano, truffle oil", price: "$20" },
    { name: "Seafood Paella", description: "Saffron rice, prawns, mussels, clams, chorizo, peas", price: "$28" },
    { name: "Chicken Biryani", description: "Aromatic basmati, spiced chicken, caramelized onions, raita", price: "$19" },
    { name: "Vegetable Fried Rice", description: "Jasmine rice, seasonal vegetables, egg, soy, sesame oil", price: "$14" },
    { name: "Poke Bowl", description: "Sushi rice, fresh tuna, avocado, edamame, seaweed, ponzu", price: "$22" },
  ],
  nachos: [
    { name: "Classic Nachos", description: "Tortilla chips, melted cheese, jalapeños, sour cream, guacamole, salsa", price: "$14" },
    { name: "Loaded Beef Nachos", description: "Seasoned ground beef, black beans, cheese, pico de gallo, crema", price: "$18" },
    { name: "Pulled Pork Nachos", description: "Slow-roasted pork, BBQ sauce, pickled onions, cilantro, queso", price: "$19" },
    { name: "Chicken Tinga Nachos", description: "Chipotle chicken, refried beans, cotija, lime crema, radish", price: "$17" },
    { name: "Vegetarian Supreme", description: "Black beans, corn, peppers, vegan cheese, avocado, cashew crema", price: "$15" },
  ],
  desserts: [
    { name: "Tiramisu", description: "Classic mascarpone layered with espresso-soaked savoiardi", price: "$12" },
    { name: "Panna Cotta", description: "Silky vanilla cream with seasonal berry compote", price: "$10" },
    { name: "Chocolate Fondant", description: "Warm chocolate cake with molten center and vanilla gelato", price: "$14" },
    { name: "Cannoli Siciliani", description: "Crispy shells filled with sweet ricotta and pistachios", price: "$9" },
    { name: "Crème Brûlée", description: "Classic vanilla custard with caramelized sugar crust", price: "$11" },
    { name: "New York Cheesecake", description: "Creamy cheesecake, graham crust, fresh berry compote", price: "$12" },
  ],
};

export function CafeMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("pizza");
  const [showAnimation, setShowAnimation] = useState(false);
  const [animatingCategory, setAnimatingCategory] = useState<string | null>(null);
  const [showMenuCards, setShowMenuCards] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = useCallback((categoryId: string) => {
    if (categoryId === activeCategory) return;

    setShowMenuCards(false);
    setAnimatingCategory(categoryId);
    setShowAnimation(true);
  }, [activeCategory]);

  const handleAnimationComplete = useCallback(() => {
    setShowAnimation(false);
    if (animatingCategory) {
      setActiveCategory(animatingCategory);
    }
    setAnimatingCategory(null);
    setShowMenuCards(true);
  }, [animatingCategory]);

  const scrollCategories = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const currentItems = menuItems[activeCategory as keyof typeof menuItems] || [];
  const currentCategory = categories.find(c => c.id === activeCategory);
  const displayName = currentCategory?.label || activeCategory;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative py-12 md:py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent" />
        <div className="relative z-10">
          <p className="text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            Est. 1952
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-4">
            Noir Café
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            Authentic Italian cuisine crafted with passion
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </header>

      {/* Category Navigation */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center gap-2">
            {/* Left Arrow */}
            <button
              onClick={() => scrollCategories("left")}
              className="flex-shrink-0 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Categories Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide flex-1"
            >
              {categories.map((category) => (
                <CategoryButton
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  isActive={activeCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scrollCategories("right")}
              className="flex-shrink-0 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Items */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
            {displayName}
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" />
        </div>

        <div
          className={`grid gap-4 md:gap-6 transition-opacity duration-300 ${
            showMenuCards ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentItems.map((item, index) => (
            <MenuCard
              key={item.name}
              name={item.name}
              description={item.description}
              price={item.price}
              index={index}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 text-center">
        <p className="text-muted-foreground text-sm mb-2">
          Open Daily: 7:00 AM - 11:00 PM
        </p>
        <p className="text-muted-foreground text-sm">
          123 Via Roma, Milano • +39 02 1234 5678
        </p>
      </footer>

      {/* Category Animation Overlay */}
      <CategoryAnimation
        category={animatingCategory || activeCategory}
        isActive={showAnimation}
        onComplete={handleAnimationComplete}
      />
    </div>
  );
}
