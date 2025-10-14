import { Link } from "react-router-dom";
import heroImg from "../../assets/rabbit-hero.webp";
const Hero = () => {
  return (
    <section className="relative">
      <img 
        src={heroImg} 
        alt="rabbit hero" 
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover" 
      />
      <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm md:text-lg tracking-tighter mb-6">
            Explore our vaction-ready outfits with fast worldwide shipping.
          </p>
          <Link to="/collections/all" className="bg-white text-black px-6 py-2 rounded-sm text-lg hover:text-white hover:bg-black hover:border hover:shadow-md hover:border-black transition">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
