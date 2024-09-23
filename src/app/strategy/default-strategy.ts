import { Desktop } from '@/app/entities/desktop';
import { DesktopOrder } from '@/app/entities/desktop-order';
import { Strategy } from './strategy';

export class DefaultStrategy implements Strategy {
    calculate(order: DesktopOrder): Desktop {
        return order.getDesktop();
    }
}
