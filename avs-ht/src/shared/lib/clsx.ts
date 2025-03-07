type Classname = string | boolean | null | undefined | Record<string, boolean>;

export const clsx = (...classnames: Classname[]) => {
  return classnames
    .flat(Infinity)
    .map(classname => {
      if (!classname) return '';
      if (typeof classname === 'string') return classname;
      if (typeof classname === 'object') {
        return Object.entries(classname)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ')
    .trim();
};
