import { Player } from '$/shared/types';

interface StrainParams {
  valueOfStrain: number;
  player: Player;
}
export const getStrain = (props: StrainParams) => {
  const { valueOfStrain, player } = props;

  return valueOfStrain * 0.5 > 100 + player.weight / 3 + player.height / 5;
};
