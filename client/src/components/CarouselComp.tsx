import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { carouselItems } from '@/utils/constants';

const CarouselComp = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;

    const handleScroll = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on('select', handleScroll);

    return () => {
      api.off('select', handleScroll);
    };
  }, [api]);

  return (
    <div className='mx-auto max-w-lg'>
      <Carousel
        setApi={setApi}
        className='w-full max-w-lg'
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className='w-full max-w-4xl mx-auto'>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Card className='bg-transparent border-none shadow-none overflow-hidden'>
                <div className='aspect-w-16 aspect-h-9'>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className='object-cover w-full h-full'
                  />
                </div>
                <CardContent className='p-6 md:p-8'>
                  <h2 className='text-xl text-center font-semibold mb-4'>
                    {item.description}
                  </h2>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicators */}
      <div className='flex items-center justify-center gap-2 mt-4'>
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index + 1 === current ? 'bg-black' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComp;
