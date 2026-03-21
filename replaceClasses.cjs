const fs = require('fs');
const file = 'src/pages/Analytics.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  'bg-neutral-950': 'bg-neutral-50 dark:bg-neutral-950',
  'bg-neutral-900/50': 'bg-white/50 dark:bg-neutral-900/50',
  'bg-neutral-900': 'bg-white dark:bg-neutral-900',
  'bg-neutral-800': 'bg-neutral-100 dark:bg-neutral-800',
  'text-white': 'text-neutral-900 dark:text-white',
  'text-neutral-100': 'text-neutral-800 dark:text-neutral-100',
  'text-neutral-300': 'text-neutral-600 dark:text-neutral-300',
  'text-neutral-400': 'text-neutral-500 dark:text-neutral-400',
  'text-neutral-500': 'text-neutral-400 dark:text-neutral-500',
  'text-neutral-600': 'text-neutral-400 dark:text-neutral-600',
  'border-white/5': 'border-neutral-200 dark:border-white/5',
  'border-white/10': 'border-neutral-300 dark:border-white/10',
  'hover:bg-neutral-800': 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
  'hover:text-white': 'hover:text-neutral-900 dark:hover:text-white',
  'group-hover:bg-neutral-800': 'group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800',
  'group-hover:text-white': 'group-hover:text-neutral-900 dark:group-hover:text-white',
  'placeholder-neutral-500': 'placeholder-neutral-400 dark:placeholder-neutral-500',
  'divide-white/3': 'divide-neutral-200 dark:divide-white/3',
  'bg-white/1': 'bg-neutral-100/50 dark:bg-white/1',
};

for (const [key, value] of Object.entries(replacements)) {
  // Use regex to match only full class names to avoid partial matches
  // Space or quote before, space or quote after
  const regex = new RegExp(`(?<=[\\s"'\`])(${key})(?=[\\s"'\`])`, 'g');
  content = content.replace(regex, value);
}

fs.writeFileSync(file, content);
console.log("Classes replaced.");
