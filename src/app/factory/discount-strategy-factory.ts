import { DISCOUNTS } from '@/app/entities/discounts';
import { StrategyFactory } from './strategy-factory';
import { ProgressiveStrategy } from '@/app/strategy/progressive-strategy';
import { Strategy } from '@/app/strategy/strategy';
import { GigabyteAsusStrategy } from '@/app/strategy/gigabyte-asus-strategy';
import { KitUpgradeStrategy } from '@/app/strategy/kit-upgrade-strategy';
import { AmdStrategy } from '@/app/strategy/amd-strategy';
import { CorsairStrategy } from '@/app/strategy/corsair-strategy';

export class DiscountStrategyFactory extends StrategyFactory {
    create(type: DISCOUNTS): void {
        const strategies: Record<DISCOUNTS, Strategy> = {
            [DISCOUNTS.PROGRESSIVE]: new ProgressiveStrategy(),
            [DISCOUNTS.GIGABYTE_ASUS_15_OFF]: new GigabyteAsusStrategy(),
            [DISCOUNTS.CPU_MOTHERBOARD_RAM_10_OFF]: new KitUpgradeStrategy(),
            [DISCOUNTS.CPU_GPU_AMD_20_OFF]: new AmdStrategy(),
            [DISCOUNTS.CORSAIR_10_OFF]: new CorsairStrategy(),
        };

        const strategy = strategies[type];

        if (strategy) {
            this.strategy = strategy;
        }
    }
}
