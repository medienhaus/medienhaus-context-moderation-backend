import { LookUpEntry } from './types';
import {
  lookupEmailAddress,
  getRoomIdsByModEmailAddress,
  findFirstLookupEntryForEmail,
  getModEmailAddressesByRoom,
} from './utils';

const lookupData: LookUpEntry[] = [
  {
    id: 'room-1',
    name: 'Room 1',
    persons: [],
  },

  {
    id: 'room-2',
    name: 'Room 2',
    persons: [{ name: 'Mod A', mail: 'mod-a@domain.com' }],
  },

  {
    id: 'room-3',
    name: 'Room 3',
    persons: [
      { name: 'Mod A', mail: 'mod-a@domain.com' },
      { name: 'Mod B', mail: 'mod-b@domain.com' },
    ],
  },
];

describe('lookupEmailAddress()', () => {
  it('should return the matching email address and undefined otherwise', () => {
    const username1 = 'mod-b';
    const result1 = lookupEmailAddress(username1, lookupData);
    expect(result1).toEqual('mod-b@domain.com');

    const username2 = 'z.zzz';
    const result2 = lookupEmailAddress(username2, lookupData);
    expect(result2).toEqual(undefined);
  });
});

describe('getModEmailAddressesByRoom()', () => {
  it('should return a list of email addresses by room id', () => {
    const result = getModEmailAddressesByRoom(lookupData);
    expect(result).toEqual({
      // 'room-1': undefined,
      'room-2': ['mod-a@domain.com'],
      'room-3': ['mod-a@domain.com', 'mod-b@domain.com'],
    });
  });
});

describe('getRoomIdsByModEmailAddress()', () => {
  it('should return a list of room ids by email address', () => {
    const result = getRoomIdsByModEmailAddress(lookupData);
    expect(result).toEqual({
      'mod-a@domain.com': ['room-2', 'room-3'],
      'mod-b@domain.com': ['room-3'],
    });
  });
});

describe('findFirstLookupEntryForEmail()', () => {
  it('should return a list of room ids by mod email', () => {
    const result = findFirstLookupEntryForEmail(lookupData, 'mod-b@domain.com');
    expect(result).toEqual({
      name: 'Mod B',
      mail: 'mod-b@domain.com',
    });
  });
});
