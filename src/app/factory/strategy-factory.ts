import { DISCOUNTS } from '@/app/entities/discounts';
import { DefaultStrategy } from '@/app/strategy/default-strategy';
import { Strategy } from '@/app/strategy/strategy';

export abstract class StrategyFactory {
    protected strategy: Strategy = new DefaultStrategy();

    public getStrategy(): Strategy {
        return this.strategy;
    }

    abstract create(type: DISCOUNTS): void;
}
