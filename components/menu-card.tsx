"use client";

interface MenuCardProps {
  name: string;
  description: string;
  price: string;
  index: number;
}

export function MenuCard({ name, description, price, index }: MenuCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:bg-secondary/50 animate-card-appear"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <span className="font-serif text-xl md:text-2xl text-primary">
            {price}
          </span>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
