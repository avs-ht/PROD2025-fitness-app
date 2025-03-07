import { TARGETS_OPTION_CONTENT } from '$/shared/constants';
import { TargetType } from '$/shared/types';

type TargetCategory =
  (typeof TARGETS_OPTION_CONTENT)[keyof typeof TARGETS_OPTION_CONTENT];
interface TargetData {
  targetType: TargetType;
  targetValue: number | undefined;
  targetUnit: string | undefined;
  customTarget: string | undefined;
}
export const getTargetStr = (targetData: TargetData) => {
  const { targetType, targetValue, targetUnit, customTarget } = targetData;
  if (!targetType) return '';
  if (targetType === 'custom') {
    if (customTarget && customTarget.length > 0) return customTarget;
    else return '';
  }
  if (!targetValue) return '';
  if (targetType === 'times') return `${targetValue} раз(а)`;
  if (!targetUnit) return;

  const targetCategory = TARGETS_OPTION_CONTENT[targetType] as TargetCategory;
  if (typeof targetCategory === 'object' && targetUnit in targetCategory)
    return `${targetValue} ${targetCategory[targetUnit as keyof typeof targetCategory]}`.toLowerCase();

  return '';
};
