import {
  DECOR_COMPLIANCE_WITH_RIVE,
  INVENTORY_COMPLIANCE_WITH_RIVE
} from './constants';

export type RiveInventoryCompliance = typeof INVENTORY_COMPLIANCE_WITH_RIVE;
export type RiveInventoryAppKey = keyof typeof INVENTORY_COMPLIANCE_WITH_RIVE;
export type RiveInventoryRiveKey = RiveInventoryCompliance[RiveInventoryAppKey];

export type RiveDecorCompliance = typeof DECOR_COMPLIANCE_WITH_RIVE;
export type RiveDecorAppKey = RiveDecorCompliance[number];
