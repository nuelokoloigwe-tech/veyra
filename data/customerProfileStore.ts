import AsyncStorage from '@react-native-async-storage/async-storage';

export type CustomerProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  address: string;
};

const PROFILE_KEY = '@veyra_customer_profile';

const defaultProfile: CustomerProfile = {
  firstName: 'Nuel',
  lastName: 'Okoloigwe',
  email: 'nuel@example.com',
  phone: '+44 7000 000000',
  dateOfBirth: '',
  nationality: 'Nigerian',
  countryOfResidence: 'United Kingdom',
  address: '',
};

let customerProfile: CustomerProfile = {
  ...defaultProfile,
};

const profileFields: (keyof CustomerProfile)[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'dateOfBirth',
  'nationality',
  'countryOfResidence',
  'address',
];

function normalizeProfile(value: unknown): CustomerProfile | null {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return null;
  }

  const storedProfile = value as Record<string, unknown>;
  const normalized: Record<string, unknown> = {
    ...defaultProfile,
    ...storedProfile,
  };

  for (const field of profileFields) {
    if (typeof storedProfile[field] !== 'string') {
      normalized[field] = defaultProfile[field];
    }
  }

  return normalized as CustomerProfile;
}

export function getCustomerProfile(): CustomerProfile {
  return { ...customerProfile };
}

export async function loadCustomerProfile(): Promise<CustomerProfile> {
  try {
    const storedProfile = await AsyncStorage.getItem(PROFILE_KEY);

    if (!storedProfile) {
      customerProfile = { ...defaultProfile };
      return { ...customerProfile };
    }

    const normalizedProfile = normalizeProfile(
      JSON.parse(storedProfile) as unknown,
    );

    if (!normalizedProfile) {
      console.error('Stored customer profile is not a valid object.');
      return { ...customerProfile };
    }

    customerProfile = normalizedProfile;

    return { ...customerProfile };
  } catch (error) {
    console.error('Failed to load customer profile:', error);
    return { ...customerProfile };
  }
}

export async function saveCustomerProfile(
  profile: CustomerProfile,
): Promise<CustomerProfile> {
  const nextProfile = normalizeProfile({
    ...customerProfile,
    ...profile,
  });

  if (!nextProfile) {
    throw new Error('Customer profile must be an object.');
  }

  try {
    await AsyncStorage.setItem(
      PROFILE_KEY,
      JSON.stringify(nextProfile),
    );
    customerProfile = nextProfile;
  } catch (error) {
    console.error('Failed to save customer profile:', error);
    throw error;
  }

  return { ...customerProfile };
}
