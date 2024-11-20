import { Button } from '@/components/ui/button';

type SortButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const SortButton = ({label, isActive, onClick}: SortButtonProps) => {
  return (
    <div className={`${isActive ? 'border-b border-black' : ''} pb-2`}>
    <Button
      variant={null}
      className={`font-normal ${
        isActive ? 'text-black' : 'text-muted-foreground'
      } hover:text-black`}
      onClick={onClick}
    >
      {label}
    </Button>
  </div>
  )
}

export default SortButton