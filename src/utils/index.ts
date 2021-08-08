function compare(
  item1: string | Object | Function,
  item2: string | Object | Function
) {
  const itemType = Object.prototype.toString.call(item1);

  // If an object or array, compare recursively
  if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
    if (!isEq(item1, item2)) return false;
  } else {
    if (itemType !== Object.prototype.toString.call(item2)) return false;

    if (itemType === '[object Function]') {
      if (item1.toString() !== item2.toString()) return false;
    } else {
      if (item1 !== item2) return false;
    }
  }

  return true;
}

export const isEq = (arr1?: any, arr2?: any) => {
  const a1 = arr1 || [];
  const a2 = arr2 || [];
  const type1: string = Object.prototype.toString.call(a1);
  const type2: string = Object.prototype.toString.call(a2);

  if (type1 !== type2) return false;
  if (['[object Array]', '[object Object]'].indexOf(type1) < 0) return false;

  const a1Len = type1 === '[object Array]' ? a1.length : Object.keys(a1).length;
  const a2Len = type1 === '[object Array]' ? a2.length : Object.keys(a2).length;
  if (a1Len !== a2Len) return false;

  if (type1 === '[object Array]') {
    for (let i = 0; i < a1Len; ++i) {
      // Compare the item
      if (!compare(a1[i], a2[i])) return false;
    }
  } else if (type1 === '[object Object]') {
    for (var key in a2) {
      if (a2.hasOwnProperty(key)) {
        // Compare the item
        if (!compare(a1[key], a2[key])) return false;
      }
    }
  }

  return true;
};

export const deepCopy = <T>(target: T): T => {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  if (target instanceof Array) {
    const cp = [] as any[];
    (target as any[]).forEach(v => {
      cp.push(v);
    });
    return cp.map((n: any) => deepCopy<any>(n)) as any;
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) } as {
      [key: string]: any;
    };
    Object.keys(cp).forEach(k => {
      cp[k] = deepCopy<any>(cp[k]);
    });
    return cp as T;
  }
  return target;
};

export default {
  isEq,
  deepCopy,
};
