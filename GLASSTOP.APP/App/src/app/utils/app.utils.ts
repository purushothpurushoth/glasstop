import { ISaveUserReqBody, IUser } from '../app.interface';

export function getSaveUserReqBody(user: IUser) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    mail: user.email,
    profilePhoto: user.photoUrl,
    companyName: user.companyName,
    roleId: user.roleId,
    transactedDate: new Date()[Symbol.toPrimitive]('string'),
  } as ISaveUserReqBody;
}

export function pick(object: any, keys: any) {
  return keys.reduce((picked: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      picked[key] = object[key];
    }
    return picked;
  }, {});
}

export function mergeObjects(target: any, sources: any): any {
  if(!sources) return {};
  if (sources && !sources.length) return target;
  
  
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeObjects(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeObjects(target, sources);
}

export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}
