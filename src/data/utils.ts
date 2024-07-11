import { LookUpEntry } from './types';

export function lookupEmailAddress(
  userIdNamePart: string,
  data: Readonly<LookUpEntry[]>,
): string | undefined {
  for (const context of data) {
    for (const person of context.persons) {
      const email = person.mail.trim();
      if (email.split('@')[0] === userIdNamePart) {
        return email;
      }
    }
  }
  return undefined;
}

export function getModEmailAddressesByRoom(data: Readonly<LookUpEntry[]>) {
  const modEmailsByRoom: Record<string, string[]> = {};
  for (const entry of data) {
    for (const person of entry.persons) {
      if (modEmailsByRoom[entry.id] === undefined) {
        modEmailsByRoom[entry.id] = [];
      }
      modEmailsByRoom[entry.id].push(person.mail);
    }
  }
  return modEmailsByRoom;
}

export function getRoomIdsByModEmailAddress(data: Readonly<LookUpEntry[]>) {
  const modEmailsByRoom = getModEmailAddressesByRoom(data);
  const roomIdsByModEmail: Record<string, string[]> = {};
  for (const [roomId, emailAddresses] of Object.entries(modEmailsByRoom)) {
    for (const email of emailAddresses) {
      if (roomIdsByModEmail[email] === undefined) {
        roomIdsByModEmail[email] = [];
      }
      roomIdsByModEmail[email].push(roomId);
    }
  }
  return roomIdsByModEmail;
}

export function findFirstLookupEntryForEmail(
  data: Readonly<LookUpEntry[]>,
  email: string,
) {
  for (const entry of data) {
    for (const person of entry.persons) {
      if (person.mail === email) {
        return person;
      }
    }
  }
  return null;
}
