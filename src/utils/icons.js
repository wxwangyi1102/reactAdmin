import up from '@/assets/icons/up.png';
import down from '@/assets/icons/down.png';
import home from '@/assets/icons/home.png';
import system from '@/assets/icons/system.png';
import evaluate from '@/assets/icons/evaluate.png';
import statistics from '@/assets/icons/statistics.png';
import selfAssessment from '@/assets/icons/self-assessment.png';
import target from '@/assets/icons/target.png';
import targetAudit from '@/assets/icons/target-audit.png';
import titleLeft from '@/assets/icons/title-left.png';

const icons = {
  up,
  down,
  evaluate,
  home,
  system,
  statistics,
  selfAssessment,
  target,
  targetAudit,
  titleLeft,
};
export const onChooseIcon = (icon) => {
  const field = Object.keys(icons).find((item) => item === icon);
  return icons[field];
};
