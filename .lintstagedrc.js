module.exports = {
  '*.{js,cjs,mjs,json,ts,tsx,css}': ['prettier --write'],
  '*.{ts,tsx}': ['bash -c tsc --noEmit', 'markuplint'],
};
