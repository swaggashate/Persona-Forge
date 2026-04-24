const STORAGE_KEY = 'personaforge_profiles';

export function loadProfiles() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveProfiles(profiles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

export function exportProfile(profile) {
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${profile.username || 'profile'}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProfile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const profile = JSON.parse(e.target.result);
        profile.id = crypto.randomUUID();
        resolve(profile);
      } catch {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.readAsText(file);
  });
}