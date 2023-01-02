import { Constraint } from './constraint.type';

describe('Constraint Type', () => {
  it('first example  ', () => {
    type LocationType = 'city' | 'station' | 'city';

    interface OutdoorComparison {
      id: string;
      name?: string;
      type: LocationType;
    }

    type CityOutdoorComparison = Constraint<
      OutdoorComparison,
      { type: 'city' }
    >;

    const cityOutdoorComparison: CityOutdoorComparison = {
      id: 'caecaceac',
      type: 'city',
      name: 'PP',
    };

    expect(cityOutdoorComparison).toBeDefined();
  });

  it('should keep optional properties as optional', () => {
    type LocationType = 'city' | 'station' | 'city';

    interface OutdoorComparison {
      id: string;
      name?: string;
      type: LocationType;
    }

    type CityOutdoorComparison = Constraint<
      OutdoorComparison,
      { type: 'city' }
    >;

    const cityOutdoorComparisonWithoutName: CityOutdoorComparison = {
      id: 'caecaceac',
      type: 'city',
    };

    expect(cityOutdoorComparisonWithoutName).toBeDefined();
  });
});
