import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ToolTipCompProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
  handleLike?: () => void;
};

const ToolTipComp = ({ trigger, content, handleLike }: ToolTipCompProps) => {
  return (
    <Tooltip>
      <TooltipTrigger onClick={handleLike}>{trigger}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default ToolTipComp;
