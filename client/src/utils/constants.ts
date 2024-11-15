import { CarouselItem } from '@/types/global';
import imgOne from '@/assets/typing.png';
import imgTwo from '@/assets/community.png';
import imgThree from '@/assets/team.png';

export const carouselItems: CarouselItem[] = [
  {
    image: imgOne,
    alt: 'User is typing...',
    description:
      'Express your ideas and stories effortlessly. Narrate empowers you to create inspiring and insightful blogs.',
  },
  {
    image: imgTwo,
    alt: ' Group of people collaborating and building a connected community network',
    description:
      'Discover a world of fascinating topics tailored to your interests. From technology to lifestyle, read what inspires you.',
  },
  {
    image: imgThree,
    alt: 'People engaging in a discussion about a shared interest or topic they enjoy',
    description:
      'Connect with writers and readers from around the globe. Share experiences, exchange ideas, and grow your community on Narrate.',
  },
];
