import { RadioService } from "#/exposed_apis";
import { Radio } from "#/SharedTypes";

export class RadioServiceImpl implements RadioService {
    async GetList(): Promise<Radio[]> {
        return [];
    }
}